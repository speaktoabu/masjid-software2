import { Component, OnInit, ViewChild } from '@angular/core';

import { IMember } from './member';
import { MemberService } from './member.service';
import { PagerService } from '../_services';
import { ConfirmDialog } from '../shared';
import * as _ from 'lodash';
import {
    MatDialog,
    MatSnackBar,
    MatPaginator,
    MatTableDataSource,
    MatSort
} from "@angular/material";



@Component({
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.css'],
    providers: [ConfirmDialog]
})
export class MemberListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    pageTitle: string = 'Members';
    imageWidth: number = 30;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: any = {};
    errorMessage: string;

    members: IMember[];
    memberList: IMember[]; //
    displayedColumns = ["id", "name", "mobileNumber", "gender", "area", "age"];
    dataSource: any = null;
    pager: any = {};
    pagedItems: any[];
    searchFilter: any = {
        firstName: "",
        lastName: "",
        email: ""
    };
    selectedOption: string;


    constructor(
        private memberService: MemberService,
        private pagerService: PagerService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar) {
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    freshDataList(members: IMember[]) {
        this.members = members;

        this.dataSource = new MatTableDataSource(this.members);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnInit(): void {
        this.memberService.getMembers()
            .subscribe(members => {
                this.freshDataList(members);
            },
            error => this.errorMessage = <any>error);

        this.searchFilter = {};
        this.listFilter = {};
    }

    getMembers(pageNum?: number) {
        this.memberService.getMembers()
            .subscribe(members => {
                this.freshDataList(members);
            },
            error => this.errorMessage = <any>error);
    }

    searchMembers(filters: any) {
        if (filters) {
            this.memberService.getMembers()
                .subscribe(members => {
                    this.members = members;
                    console.log(this.members.length)
                    this.members = this.members.filter((member: IMember) => {
                        let match = true;

                        Object.keys(filters).forEach((k) => {
                            match = match && filters[k] ?
                                member[k].toLocaleLowerCase().indexOf(filters[k].toLocaleLowerCase()) > -1 : match;
                        })
                        return match;
                    });
                    this.freshDataList(members);
                },
                error => this.errorMessage = <any>error);
        }

    }

    resetListFilter() {
        this.listFilter = {};
        this.getMembers();
    }

    reset() {
        this.listFilter = {};
        this.searchFilter = {};
        this.getMembers();

    }

    resetSearchFilter(searchPanel: any) {
        searchPanel.toggle();
        this.searchFilter = {};
        this.getMembers();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 1500,
        });
    }

    openDialog(id: string) {
        let dialogRef = this.dialog.open(ConfirmDialog,
            { data: { title: 'Dialog', message: 'Are you sure to delete this item?' } });
        dialogRef.disableClose = true;


        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;

            if (this.selectedOption === dialogRef.componentInstance.ACTION_CONFIRM) {
                this.memberService.deleteMember(id).subscribe(
                    () => {
                        this.memberService.getMembers()
                            .subscribe(members => {
                                this.freshDataList(members);
                            },
                            error => this.errorMessage = <any>error);
                        this.openSnackBar("The item has been deleted successfully. ", "Close");
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        console.log(this.errorMessage);
                        this.openSnackBar("This item has not been deleted successfully. Please try again.", "Close");
                    }
                );
            }
        });
    }



}
