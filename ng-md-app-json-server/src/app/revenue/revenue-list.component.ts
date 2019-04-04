import { Component, OnInit, ViewChild } from '@angular/core';

import { IRevenue } from './revenue';
import { RevenueService } from './revenue.service';
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
    templateUrl: './revenue-list.component.html',
    styleUrls: ['./revenue-list.component.css'],
    providers: [ConfirmDialog]
})
export class RevenueListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    pageTitle: string = 'Revenue List';
    imageWidth: number = 30;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: any = {};
    errorMessage: string;

    revenues: IRevenue[];
    revenueList: IRevenue[]; //
    displayedColumns = ["id", "type", "amount", "isGuest", "memberId"];
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
        private revenueService: RevenueService,
        private pagerService: PagerService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar) {
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    freshDataList(revenues: IRevenue[]) {
        this.revenues = revenues;

        this.dataSource = new MatTableDataSource(this.revenues);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnInit(): void {
        this.revenueService.getRevenues()
            .subscribe(revenues => {
                this.freshDataList(revenues);
            },
            error => this.errorMessage = <any>error);

        this.searchFilter = {};
        this.listFilter = {};
    }

    getRevenues(pageNum?: number) {
        this.revenueService.getRevenues()
            .subscribe(revenues => {
                this.freshDataList(revenues);
            },
            error => this.errorMessage = <any>error);
    }

    searchRevenues(filters: any) {
        if (filters) {
            this.revenueService.getRevenues()
                .subscribe(revenues => {
                    this.revenues = revenues;
                    console.log(this.revenues.length)
                    this.revenues = this.revenues.filter((revenue: IRevenue) => {
                        let match = true;

                        Object.keys(filters).forEach((k) => {
                            match = match && filters[k] ?
                                revenue[k].toLocaleLowerCase().indexOf(filters[k].toLocaleLowerCase()) > -1 : match;
                        })
                        return match;
                    });
                    this.freshDataList(revenues);
                },
                error => this.errorMessage = <any>error);
        }

    }

    resetListFilter() {
        this.listFilter = {};
        this.getRevenues();
    }

    reset() {
        this.listFilter = {};
        this.searchFilter = {};
        this.getRevenues();

    }

    resetSearchFilter(searchPanel: any) {
        searchPanel.toggle();
        this.searchFilter = {};
        this.getRevenues();
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
                this.revenueService.deleteRevenue(id).subscribe(
                    () => {
                        this.revenueService.getRevenues()
                            .subscribe(revenues => {
                                this.freshDataList(revenues);
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
