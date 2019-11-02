import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantService } from '../../core/service/constant.service';
import { HelperService } from '../../core/service/helper.service';
import { ReconciledPopupComponent } from '../../reconcile/reconciled-popup/reconciled-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-reconciled',
  templateUrl: './reconciled.component.html',
  styleUrls: ['./reconciled.component.scss']
})
export class ReconciledComponent implements OnInit {
  pending_deposit:any;
  pe_deposit_totle;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  length:any;

  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject<any>();
  length1:any;

  dtOptions2: DataTables.Settings = {};
  dtTrigger2: Subject<any> = new Subject<any>();
  length2:any;

  outgoing_deposit;
  outgoing_totle;
  incoming_reconciled_varified;
  incoming_recon_verified_totle;

  constructor(
    private http: HttpClient,
    private helperSvc: HelperService,
    private modalService: NgbModal,
    private constantSvc: ConstantService
  ) { }

  ngOnInit() {
    this.dtOptions = {
			paging: true,
			pagingType: 'full_numbers',
      pageLength: 50,
      order: [],
      columnDefs: [ {
        targets  : 'no-sort',
        orderable: false,
      }],
      scrollY: "500px",
      scrollCollapse: true
    };

    this.dtOptions1 = {
			paging: true,
			pagingType: 'full_numbers',
      pageLength: 50,
      order: [],
      columnDefs: [ {
        targets  : 'no-sort',
        orderable: false,
      }],
      scrollY: "500px",
      scrollCollapse: true
    };

    this.dtOptions2 = {
			paging: true,
			pagingType: 'full_numbers',
      pageLength: 50,
      order: [],
      columnDefs: [ {
        targets  : 'no-sort',
        orderable: false,
      }],
      scrollY: "500px",
      scrollCollapse: true
    };

    this.helperSvc.loaderStart();
    this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_INTACCT_DATA).subscribe(
      respo => {
        console.log(respo);
        this.outgoing_deposit = respo['data_val'];
        this.length1 = respo['data_val'].length;
				this.dtTrigger1.next();

        // // totle deposit log amount
        var outgoing_numbers = respo['data_val'].map(i => {
          if(i.amount == undefined || i.amount == ""){
            return parseFloat('0');
          }else{
            return parseFloat(i.amount)
          }
        });
        var outgoing_sum = outgoing_numbers.reduce((a, b) => a + b, 0);
        this.outgoing_totle = outgoing_sum.toFixed(2);
    });

    this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_INCOMEING_RECONCILED_DATA).subscribe(
      res => {
        console.log("res 111");
        console.log(res);
        this.pending_deposit = res['data_val'];
        this.length = res['data_val'].length;
				this.dtTrigger.next();

        // // totle deposit log amount
        var pe_deposit_numbers = res['data_val'].map(i => {
          if(i.amount == undefined || i.amount == ""){
            return parseFloat('0');
          }else{
            return parseFloat(i.amount)
          }
        });
        var pe_deposit_sum = pe_deposit_numbers.reduce((a, b) => a + b, 0);
        this.pe_deposit_totle = pe_deposit_sum.toFixed(2);

        $(".ref_loding").removeClass("loading");
        this.helperSvc.loaderStop();
    });

    this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_INCOMING_RECONCILED_VERIFIED).subscribe(
      respo => {
        this.incoming_reconciled_varified = respo['data_val'];
        this.length2 = respo['data_val'].length;
				this.dtTrigger2.next();

        // // totle deposit log amount
        var pe_deposit_numbers1 = respo['data_val'].map(i => {
          if(i.amount == undefined || i.amount == ""){
            return parseFloat('0');
          }else{
            return parseFloat(i.amount)
          }
        });
        var pe_deposit_sum1 = pe_deposit_numbers1.reduce((a, b) => a + b, 0);
        this.incoming_recon_verified_totle = pe_deposit_sum1.toFixed(2);

        $(".ref_loding").removeClass("loading");
        this.helperSvc.loaderStop();
    });
  }

  outgoing_more_details(note){
    const modalRef = this.modalService.open(ReconciledPopupComponent, { size: 'lg' });
    modalRef.componentInstance.note = note;
    modalRef.componentInstance.title = "Outgoing";
  }

  incoming_more_details(note){
    const modalRef = this.modalService.open(ReconciledPopupComponent, { size: 'lg' });
    modalRef.componentInstance.note = note;
    modalRef.componentInstance.title = "Incoming";
  }

  incoming_verified_more_details(note){
    const modalRef = this.modalService.open(ReconciledPopupComponent, { size: 'lg' });
    modalRef.componentInstance.note = note;
    modalRef.componentInstance.title = "Incoming Verified";
  }
}
