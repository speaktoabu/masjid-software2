import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
// import {NgProgressModule, NgProgressBrowserXhr, NgProgressService } from 'ngx-progressbar';

import { MemberListComponent } from "./member-list.component";
import { MemberDetailComponent } from "./member-detail.component";
import {
  MemberDetailGuard,
  MemberEditGuard
} from "./member-guard.service";
import { MemberEditComponent } from "./member-edit.component";

import { MemberService } from "./member.service";
import { SharedModule } from "../shared/shared.module";

import { MaterialModule } from "../shared/material.module";
import { MatOption } from "@angular/material";

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: "members", component: MemberListComponent },
      {
        path: "member/:id",
        canActivate: [MemberDetailGuard],
        component: MemberDetailComponent
      },
      {
        path: "memberEdit/:id",
        canDeactivate: [MemberEditGuard],
        component: MemberEditComponent
      }
    ])
  ],
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    MemberListComponent,
    MemberDetailComponent,
    MemberEditComponent
  ],
  providers: [MemberService, MemberDetailGuard, MemberEditGuard],
  entryComponents: [MatOption]
})
export class MemberModule { }
