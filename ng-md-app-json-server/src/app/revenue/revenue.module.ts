import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
// import {NgProgressModule, NgProgressBrowserXhr, NgProgressService } from 'ngx-progressbar';

import { RevenueListComponent } from "./revenue-list.component";
import { RevenueDetailComponent } from "./revenue-detail.component";
import {
  RevenueDetailGuard,
  RevenueEditGuard
} from "./revenue-guard.service";
import { RevenueEditComponent } from "./revenue-edit.component";

import { RevenueService } from "./revenue.service";
import { SharedModule } from "../shared/shared.module";

import { MaterialModule } from "../shared/material.module";
import { MatOption } from "@angular/material";

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: "revenues", component: RevenueListComponent },
      {
        path: "revenue/:id",
        canActivate: [RevenueDetailGuard],
        component: RevenueDetailComponent
      },
      {
        path: "revenueEdit/:id",
        canDeactivate: [RevenueEditGuard],
        component: RevenueEditComponent
      }
    ])
  ],
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    RevenueListComponent,
    RevenueDetailComponent,
    RevenueEditComponent
  ],
  providers: [RevenueService, RevenueDetailGuard, RevenueEditGuard],
  entryComponents: [MatOption]
})
export class RevenueModule { }
