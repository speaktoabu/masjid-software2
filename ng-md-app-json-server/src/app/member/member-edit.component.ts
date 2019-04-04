import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IMember } from './member';
import { MemberService } from './member.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';


@Component({
    templateUrl: './member-edit.component.html',
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
export class MemberEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Update Member';
    errorMessage: string;
    memberForm: FormGroup;
    genderList = ['Male', 'Female'];
    yesNoList = ['Yes', 'No'];
    relationList = ['Mother', 'Father', 'Daughter', 'Son', 'Sister', 'Brother', 'Aunt', 'Uncle', 'Niece', 'Nephew', 'Cousin (female)', 'Cousin (male)', 'Grandmother', 'Grandfather', 'Granddaughter', 'Grandson', 'Stepsister', 'Stepbrother', 'Stepmother', 'Stepfather', 'Stepdaughter', 'Stepson', 'Sister-in-law', 'Brother-in-law', 'Mother-in-law', 'Father-in-law', 'Daughter-in-law', 'Son-in-law'];
    areaList = ['Avadi', 'Mappedu', 'Navallur'];

    member: IMember = <IMember>{};
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
        private memberService: MemberService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'Name is required.',
                minlength: 'Name name must be at least three characters.',
                maxlength: 'Name name cannot exceed 100 characters.'
            },
            mobileNumber: {
                required: 'Mobile Number is required.',
                pattern: 'Only numbers allowed',
                minlength: 'Mobile Number must be 10 characters.',
                maxlength: 'Mobile Number cannot exceed 10 characters.'
            },
            gender: {
                required: 'Gender is required.'
            },
            area: {
                required: 'Area is required.'
            },
            address: {
                required: 'Address is required.'
            },
            age: {
                required: 'Age is required.',
                pattern: 'Only numbers allowed',
                maxlength: 'Age cannot exceed 3 characters.'
            },
            married: {
                required: 'Marital  Status is required.'
            },
            occupation: {
                required: 'Occupation is required.'
            },
            income: {
                required: 'Income is required.'
            }
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.memberForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            mobileNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
            gender: ['', [Validators.required]],
            area: ['', [Validators.required]],
            address: ['', [Validators.required]],
            age: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(3)]],
            // age: ['', [Validators.required]],
            married: ['', [Validators.required]],
            occupation: ['', [Validators.required]],
            income: ['', [Validators.required]],
            familyMemDetails: this.fb.array([])
        });

        // Read the member Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = params['id'];
                this.getMember(id);
            }
        );

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
        Observable.merge(this.memberForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.memberForm);
        });
    }

    getMember(id: string): void {
        this.memberService.getMember(id)
            .subscribe(
            (member: IMember) => this.onMemberRetrieved(member),
            (error: any) => this.errorMessage = <any>error
            );
    }

    onMemberRetrieved(member: IMember): void {
        if (this.memberForm) {
            this.memberForm.reset();
        }
        this.member = member;

        if (this.member.id === '0') {
            this.pageTitle = 'Add Member';
        } else {
            this.pageTitle = `Update Member: ${this.member.name}`;
        }

        // Update the data on the form
        this.memberForm.patchValue({
            name: this.member.name,
            mobileNumber: this.member.mobileNumber,
            gender: this.member.gender,
            area: this.member.area,
            address: this.member.address,
            age: this.member.age,
            married: this.member.married,
            occupation: this.member.occupation,
            income: this.member.income,
            // familyMemDetails: this.pathFamilyMember(this.member)
        });
        this.pathFamilyMember(this.member)
    }

    pathFamilyMember(member: IMember) {
        let familyMem = (this.familyMemDetails as FormArray);

        if (member.familyMemDetails != null) {
            member.familyMemDetails.forEach(famliyMemberDet => {
                familyMem.push(
                    this.fb.group({
                        famName: [famliyMemberDet.famName, [Validators.required]],
                        relation: [famliyMemberDet.relation, [Validators.required]],
                        famAge: [famliyMemberDet.famAge, [Validators.required, Validators.pattern("^[0-9]*$")]],
                        famMarried: [famliyMemberDet.famMarried, [Validators.required]],
                        famEmployed: [famliyMemberDet.famEmployed, [Validators.required]],
                        famEducation: [famliyMemberDet.famEducation, [Validators.required]]
                    }));
            });
        }
        return familyMem;
    }

    deleteMember(): void {
        if (this.member.id === '0') {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the Member: ${this.member.name}?`)) {
                this.memberService.deleteMember(this.member.id)
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


    saveMember(): void {
        if (this.memberForm.dirty && this.memberForm.valid) {
            // Copy the form values over the member object values
            const member = Object.assign({}, this.member, this.memberForm.value);

            this.memberService.saveMember(member)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.memberForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.memberForm.reset();
        this.router.navigate(['/members']);
    }


    get familyMemDetails(): FormArray { return this.memberForm.get('familyMemDetails') as FormArray; }

    addFamilyMember() {
        (this.familyMemDetails as FormArray).push(
            this.fb.group({
                famName: ['', [Validators.required]],
                relation: ['', [Validators.required]],
                famAge: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(3)]],
                famMarried: ['', [Validators.required]],
                famEmployed: ['', [Validators.required]],
                famEducation: ['', [Validators.required]]
            }));
    }


    deleteFamilyMember(index) {
        (this.familyMemDetails as FormArray).removeAt(index);
    }

}
