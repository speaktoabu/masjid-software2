import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IRevenue } from './revenue';
import { RevenueService } from './revenue.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';
import { MemberService, IMember } from '../member/index';


@Component({
    templateUrl: './revenue-edit.component.html',
    styles: [`
    .example-section {
        display: flex;
        align-content: center;
        align-items: center;
        height: 60px;
        }

    .example-margin {
        margin: 0 10px;
        }

   
    `]
})
export class RevenueEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Update Revenue';
    errorMessage: string;
    revenueForm: FormGroup;
    revenueTypeList = ['Chanda', 'Jumma Collection', 'Donation', 'Fitra'];
    yesNoList = ['Yes', 'No'];
    memberList: IMember[] = [];

    revenue: IRevenue = <IRevenue>{};
    private sub: Subscription;
    showImage: boolean;
    imageWidth: number = 80;
    imageMargin: number = 2;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private revenueService: RevenueService,
        private memberService: MemberService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            type: {
                required: 'Revenue type is required.'
            },
            isGuest: {
                required: 'isGuest is required.'
            },
            memberId: {
                required: 'MemberId.'
            },
            guestName: {
                required: 'Guest Donor name is required.'
            },
            amount: {
                required: 'Amount is required.',
                pattern: 'Only numbers allowed'
            },
            paidDate: {
                required: 'PaidDate is required.'
            },
            fromDate: {
                required: 'FromDate  Status is required.'
            },
            toDate: {
                required: 'ToDate  Status is required.'
            }
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.revenueForm = this.fb.group({
            type: ['', [Validators.required]],
            isGuest: [''],
            memberId: [''],
            guestName: [''],
            amount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            // amount: [''],
            paidDate: ['', [Validators.required]],
            fromDate: [''],
            toDate: ['']
        });

        // Read the revenue Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = params['id'];
                this.getRevenue(id);
            }
        );
        this.memberService.getMembers().subscribe(members => {
            this.memberList = members;
        });
        this.sub.add(null);
    }

    ngOnDestroy(): void {
        if (this.sub != null)
            this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.revenueForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.revenueForm);
        });
    }

    getRevenue(id: string): void {
        this.revenueService.getRevenue(id)
            .subscribe(
            (revenue: IRevenue) => this.onRevenueRetrieved(revenue),
            (error: any) => this.errorMessage = <any>error
            );
    }

    onRevenueRetrieved(revenue: IRevenue): void {
        if (this.revenueForm) {
            this.revenueForm.reset();
        }
        this.revenue = revenue;

        if (this.revenue.id === '0') {
            this.pageTitle = 'Add Revenue';
        } else {
            this.pageTitle = `Update Revenue: ${this.revenue.id}`;
        }

        // Update the data on the form
        this.revenueForm.patchValue({
            type: this.revenue.type,
            isGuest: this.revenue.isGuest,
            memberId: this.revenue.memberId,
            guestName: this.revenue.guestName,
            amount: this.revenue.amount,
            paidDate: this.revenue.paidDate,
            fromDate: this.revenue.fromDate,
            toDate: this.revenue.toDate
        });
    }


    deleteRevenue(): void {
        if (this.revenue.id === '0') {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the Revenue: ${this.revenue.id}?`)) {
                this.revenueService.deleteRevenue(this.revenue.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    toggleImage(): void {
        event.preventDefault();
        this.showImage = !this.showImage;
    }


    saveRevenue(): void {
        if (this.revenueForm.dirty && this.revenueForm.valid) {
            // Copy the form values over the revenue object values
            const revenue = Object.assign({}, this.revenue, this.revenueForm.value);

            this.revenueService.saveRevenue(revenue)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.revenueForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.revenueForm.reset();
        this.router.navigate(['/revenues']);
    }

    resetField(fieldName: string): void {
        this.revenueForm.get(fieldName).reset();
    }



    updateValidatorsOnType(): void {

        if (this.revenueForm.get('type').value == 'Chanda') {
            this.revenueForm.get('isGuest').setValidators(null);
            this.revenueForm.get('guestName').setValidators(null);
            this.revenueForm.get('fromDate').setValidators([Validators.required]);
            this.revenueForm.get('toDate').setValidators([Validators.required]);
        }
        else {
            this.revenueForm.get('isGuest').setValidators([Validators.required]);
            this.revenueForm.get('guestName').setValidators([Validators.required]);
            this.revenueForm.get('fromDate').setValidators(null);
            this.revenueForm.get('toDate').setValidators(null);
        }

        this.revenueForm.get('isGuest').updateValueAndValidity();
        this.revenueForm.get('guestName').updateValueAndValidity();
        this.revenueForm.get('fromDate').updateValueAndValidity();
        this.revenueForm.get('toDate').updateValueAndValidity();
    }

    updateValidatorsOnGuest(): void {
        if (this.revenueForm.get('isGuest').value == 'No') {
            this.revenueForm.get('guestName').setValidators(null);
            this.revenueForm.get('memberId').setValidators([Validators.required]);
        }
        else {
            this.revenueForm.get('guestName').setValidators([Validators.required]);
            this.revenueForm.get('memberId').setValidators(null);
        }

        this.revenueForm.get('guestName').updateValueAndValidity();
        this.revenueForm.get('memberId').updateValueAndValidity();
    }



}
