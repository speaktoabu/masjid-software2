import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { MemberEditComponent } from './member-edit.component';

@Injectable()
export class MemberDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id: string = route.url[1].path;
        if (id == null || id.length < 1) {
            alert('Invalid member Id');
            // start a new navigation to redirect to list page
            this.router.navigate(['/members']);
            // abort current navigation
            return false;
        };
        return true;
    }
}

@Injectable()
export class MemberEditGuard implements CanDeactivate<MemberEditComponent> {

    canDeactivate(component: MemberEditComponent): boolean {
        if (component.memberForm.dirty) {
            let memberName = component.memberForm.get('name').value || 'New Member';
            return confirm(`Navigate away and lose all changes to ${memberName}?`);
        }
        return true;
    }
}
