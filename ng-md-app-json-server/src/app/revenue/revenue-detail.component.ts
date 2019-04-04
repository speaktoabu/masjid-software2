import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IRevenue } from './revenue';
import { RevenueService } from './revenue.service';
import {
    MatDialog,
    MatSnackBar,
    MatPaginator,
    MatTableDataSource,
    MatSort
} from "@angular/material";
import { MemberService, IMember } from '../member/index';

@Component({
    templateUrl: './revenue-detail.component.html',
    styles: ['./revenue-detail.component.css']
})
export class RevenueDetailComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    pageTitle: string = 'Revenue Detail';
    revenue: IRevenue;
    errorMessage: string;
    private sub: Subscription;
    imageWidth: number = 80;
    imageMargin: number = 2;
    member: IMember;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private revenueService: RevenueService,
        private memberService: MemberService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = params['id'];
                this.getRevenue(id);
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getRevenue(id: string) {
        this.revenueService.getRevenue(id).subscribe(
            revenue => this.onRevenueRetrieved(revenue),
            error => this.errorMessage = <any>error);
    }

    onRevenueRetrieved(revenue: IRevenue): void {
        this.revenue = revenue;
        this.pageTitle = `Revenue Detail: ${this.revenue.id}`;
        if (this.revenue.memberId != null && this.revenue.memberId != '')
            this.setMember(this.revenue.memberId);


    }

    setMember(id: string) {
        let mem = this.memberService.getMember(id).subscribe(member => {
            this.member = member;
        });
    }

    onBack(): void {
        this.router.navigate(['/revenues']);
    }

}
