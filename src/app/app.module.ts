import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './core/interceptors';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { UsersComponent } from './users/users.component';
import { LogoutComponent } from './logout/logout.component';
import { IncomingComponent } from './reconcile/incoming/incoming.component';
import { OutgoingComponent } from './reconcile/outgoing/outgoing.component';
import { DepositsComponent } from './reconcile/deposits/deposits.component';
import { DepositReconciledComponent } from './reconcile/deposit-reconciled/deposit-reconciled.component';
import { ReconciledComponent } from './reconcile/reconciled/reconciled.component';
import { TransfersComponent } from './reconcile/transfers/transfers.component';
import { SettingComponent } from './reconcile/setting/setting.component';
import { VendorComponent } from './reconcile/vendor/vendor.component';
import { BankComponent } from './reconcile/bank/bank.component';
import { FlaggedComponent } from './reconcile/flagged/flagged.component';
import { DepositLogComponent } from './reconcile/deposit-log/deposit-log.component';

import { ToastrModule } from 'ng6-toastr-notifications';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule, MatInputModule,MatNativeDateModule} from '@angular/material';
// import {MatDatepickerModule} from '@angular/material/datepicker';


import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { EditComponent } from './edit/edit.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { PendingDepositPopupComponent } from './reconcile/pending-deposit-popup/pending-deposit-popup.component';
import { DepositMoreDetailComponent } from './reconcile/deposit-more-detail/deposit-more-detail.component';
import { ReconciledDepositMoreDetailComponent } from './reconcile/reconciled-deposit-more-detail/reconciled-deposit-more-detail.component';
import { AddBankComponent } from './reconcile/add-bank/add-bank.component';
import { AddVendorComponent } from './reconcile/add-vendor/add-vendor.component';
import { EditVendorComponent } from './reconcile/edit-vendor/edit-vendor.component';
import { EditBankComponent } from './reconcile/edit-bank/edit-bank.component';
import { AddFlagComponent } from './reconcile/add-flag/add-flag.component';
import { EditFlagComponent } from './reconcile/edit-flag/edit-flag.component';
import { ShowFlagComponent } from './reconcile/show-flag/show-flag.component';

import { OutgoingBillComponent } from './reconcile/outgoing-bill/outgoing-bill.component';
import { ShowOutgoingFlagComponent } from './reconcile/show-outgoing-flag/show-outgoing-flag.component';
import { FlagMoreDetailComponent } from './reconcile/flag-more-detail/flag-more-detail.component';
import { ReconciledPopupComponent } from './reconcile/reconciled-popup/reconciled-popup.component';
import { TransferPopupComponent } from './reconcile/transfer-popup/transfer-popup.component';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
	  HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
	  DataTablesModule,
    NgbModule,
    MatDatepickerModule,
     MatInputModule,MatNativeDateModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HomeComponent,
    HeaderComponent,
    UserRegistrationComponent,
    EditComponent,
    ResetpasswordComponent,
    ChangepasswordComponent,
    PendingDepositPopupComponent,
    DepositMoreDetailComponent,
    ReconciledDepositMoreDetailComponent,
    AddBankComponent,
    AddVendorComponent,
    EditVendorComponent,
    EditBankComponent,
    AddFlagComponent,
    EditFlagComponent,
    ShowFlagComponent,
    OutgoingBillComponent,
    ShowOutgoingFlagComponent,
    FlagMoreDetailComponent,
    ReconciledPopupComponent,
    TransferPopupComponent

  ],
  exports: [
    MatDatepickerModule, 
    MatNativeDateModule 
],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [UserRegistrationComponent,EditComponent,PendingDepositPopupComponent,DepositMoreDetailComponent,ReconciledDepositMoreDetailComponent,AddBankComponent,AddVendorComponent,EditVendorComponent,EditBankComponent,AddFlagComponent,EditFlagComponent,ShowFlagComponent,OutgoingBillComponent,ShowOutgoingFlagComponent,FlagMoreDetailComponent,ReconciledPopupComponent,TransferPopupComponent]
})
export class AppModule { }
