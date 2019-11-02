import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UsersComponent } from '../../users/users.component';
import { DataTablesModule } from 'angular-datatables';
import { LogoutComponent } from '../../logout/logout.component';
import { IncomingComponent } from '../../reconcile/incoming/incoming.component';
import { OutgoingComponent } from '../../reconcile/outgoing/outgoing.component';
import { DepositsComponent } from '../../reconcile/deposits/deposits.component';
import { DepositReconciledComponent } from '../../reconcile/deposit-reconciled/deposit-reconciled.component';
import { ReconciledComponent } from '../../reconcile/reconciled/reconciled.component';
import { TransfersComponent } from '../../reconcile/transfers/transfers.component';
import { SettingComponent } from '../../reconcile/setting/setting.component';
import { VendorComponent } from '../../reconcile/vendor/vendor.component';
import { BankComponent } from '../../reconcile/bank/bank.component';
import { FlaggedComponent } from '../../reconcile/flagged/flagged.component';
import { DepositLogComponent } from '../../reconcile/deposit-log/deposit-log.component';
import { FlagOpenComponent } from '../../reconcile/flag-open/flag-open.component';
import { FlagCloseComponent } from '../../reconcile/flag-close/flag-close.component';

import {
  MatButtonModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
// import {MatDatepickerModule, MatInputModule,MatNativeDateModule} from '@angular/material';

import { polyfill as keyboardEventKeyPolyfill } from 'keyboardevent-key-polyfill';
import { TextInputAutocompleteModule } from 'angular-text-input-autocomplete';
 
keyboardEventKeyPolyfill();


@NgModule({
  imports: [
    CommonModule,
    TextInputAutocompleteModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  DataTablesModule,
  MatDatepickerModule,
  MatNativeDateModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    UsersComponent,
    LogoutComponent,
    IncomingComponent,
    OutgoingComponent,
    DepositsComponent,
    DepositReconciledComponent,
    ReconciledComponent,
    TransfersComponent,
    SettingComponent,
    VendorComponent,
    BankComponent,
    FlaggedComponent,
    DepositLogComponent,
    FlagOpenComponent,
    FlagCloseComponent
    
  ]
})

export class AdminLayoutModule {}
