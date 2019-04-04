import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IMember } from './member';
import { MemberService } from './member.service';
import { IFamilyMember } from './index';
import {
    MatDialog,
    MatSnackBar,
    MatPaginator,
    MatTableDataSource,
    MatSort
} from "@angular/material";

@Component({
    templateUrl: './member-detail.component.html',
    styles: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    pageTitle: string = 'Member Detail';
    member: IMember;
    dataSource: any = null;
    familyMembersDisplayedColumns = ['famName', 'relation', 'famAge', 'famMarried', 'famEmployed', 'famEducation'];
    errorMessage: string;
    private sub: Subscription;
    imageWidth: number = 80;
    imageMargin: number = 2;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private memberService: MemberService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = params['id'];
                this.getMember(id);
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getMember(id: string) {
        this.memberService.getMember(id).subscribe(
            member => this.onMemberRetrieved(member),
            error => this.errorMessage = <any>error);
    }

    onMemberRetrieved(member: IMember): void {
        this.member = member;
        this.dataSource = new MatTableDataSource(this.member.familyMemDetails);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.pageTitle = `Member Detail: ${this.member.name}`;


    }


    onBack(): void {
        this.router.navigate(['/members']);
    }

}
