import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../core/service/helper.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    child:any
}

declare interface RouteInfoChild {
  path: string;
  title: string;
  icon: string;
  class: string;
}


export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', child:'' },    
    { path: '/incoming', title: 'Incoming Reconcile',  icon: 'arrow_forward', class: '' , child:''},
    { path: '/outgoing', title: 'Outgoing Reconcile',  icon:'arrow_back', class: '' , child:''},
    { path: '/deposits', title: 'Deposits',  icon:'attach_money', class: '' , child:''},
    { path: '/deposits-reconciled', title: 'Deposits Reconciled',  icon:'repeat', class: '', child:'' },
    { path: '/reconciled', title: 'Reconciled',  icon:'library_books', class: '' , child:''},
    { path: '/transfers', title: 'Transfers',  icon:'done', class: '' , child:''},
    { path: '/deposit-log', title: 'Deposit Log',  icon: 'create', class: '' , child:''},
    { path: '/users', title: 'Users',  icon: 'person', class: '' , child:''},
    { path: '/bank', title: 'Bank',  icon: 'account_balance_wallet', class: '', child:'' },
    { path: '/vendor', title: 'Vendor',  icon: 'assignment_ind', class: '' , child:''},

    { path: '#', title: 'Flagged',  icon: 'flag', class: '', child : [{ path: '/flag_open', title: 'Open Flag',  icon: 'flag', class: '' },{ path: '/flag_close', title: 'Close Flag',  icon: 'flag', class: '' }]},

    { path: '/setting', title: 'Setting',  icon: 'build', class: '' , child:''},
    { path: '/logout', title: 'Logout',  icon:'exit_to_app', class: '' , child:''}, 

];

export const USERROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', child:'' },
  { path: '/incoming', title: 'Incoming Reconcile',  icon: 'arrow_forward', class: '', child:'' },
  { path: '/outgoing', title: 'Outgoing Reconcile',  icon:'arrow_back', class: '' , child:''},
  { path: '/deposits', title: 'Deposits',  icon:'attach_money', class: '' , child:''},
  { path: '/deposits-reconciled', title: 'Deposits Reconciled',  icon:'repeat', class: '', child:'' },
  { path: '/reconciled', title: 'Reconciled',  icon:'library_books', class: '' , child:''},
  { path: '/transfers', title: 'Transfers',  icon:'done', class: '' , child:''},
  { path: '/deposit-log', title: 'Deposit Log',  icon: 'create', class: '' , child:''},
  { path: '/bank', title: 'Bank',  icon: 'account_balance_wallet', class: '', child:'' },
  { path: '/vendor', title: 'Vendor',  icon: 'assignment_ind', class: '' , child:''},

  { path: '#', title: 'Flagged',  icon: 'flag', class: '', child : [{ path: '/flag_open', title: 'Open Flag',  icon: 'flag', class: '' },{ path: '/flag_close', title: 'Close Flag',  icon: 'flag', class: '' }]},
  //{ path: '/users', title: 'Users',  icon: 'person', class: '', child:'' },
  // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '', child:'' },
  // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' , child:''},
  // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' , child:''},
  // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' , child:''},
  // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' , child:''},
  // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' , child:''},
  { path: '/logout', title: 'Logout',  icon:'exit_to_app', class: '', child:'' }, 
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  open: string;
  close: string;
  role: any;
  constructor(private helperSvc: HelperService,) { }

  ngOnInit() {

      if (this.helperSvc.lsGetItem('USER-INFO')) {
        this.role = atob(this.helperSvc.lsGetItem('USER-ROLE'));
        if(this.role == '1'){
          this.menuItems = ROUTES.filter(menuItem => menuItem);
        }else{
          this.menuItems = USERROUTES.filter(menuItem => menuItem);
        }
      }

        $(document).ready(function() {
          $(".fbtn").click(function () {
            $(".tflag").toggleClass("collapse");
          });
        });
    }


  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}