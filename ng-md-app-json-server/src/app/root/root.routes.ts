import { AboutComponent } from "../about";
import { RootComponent } from "./root.component";
// import { HomeComponent } from './home.component';
import { DashboardComponent } from "../dashboard";
import { ProductListComponent } from "../product";
import { MemberListComponent } from "../member";
import { RevenueListComponent } from "../revenue";
import { OrderListComponent } from "../order";
import { AuthGuard } from "../_guard";
import { NotFoundPageComponent } from "../notfoundpage";

export const routes = [
  {
    path: "",

    children: [
      {
        path: "",
        redicrectTo: "/dashboard",
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "about",
        component: AboutComponent
      },
      {
        path: "member",
        component: MemberListComponent
      },
      {
        path: "revenue",
        component: RevenueListComponent
      },
      {
        path: "order",
        component: OrderListComponent
      },
      {
        path: "product",
        component: ProductListComponent
      }
    ]
  }
];
