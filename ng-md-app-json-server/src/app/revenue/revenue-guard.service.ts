import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { RevenueEditComponent } from './revenue-edit.component';

@Injectable()
export class RevenueDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id: string = route.url[1].path;
        if (id == null || id.length < 1) {
            alert('Invalid revenue Id');
            // start a new navigation to redirect to list page
            this.router.navigate(['/revenues']);
            // abort current navigation
            return false;
        };
        return true;
    }
}

@Injectable()
export class RevenueEditGuard implements CanDeactivate<RevenueEditComponent> {

    canDeactivate(component: RevenueEditComponent): boolean {
        if (component.revenueForm.dirty) {
            let revenueName = '';
            if (component.revenueForm.get('id') != null)
                revenueName = component.revenueForm.get('id').value;
            else
                revenueName = 'New Revenue';
            return confirm(`Navigate away and lose all changes to ${revenueName}?`);
        }
        return true;
    }
}
