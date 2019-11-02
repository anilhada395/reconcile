import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantService } from '../../core/service/constant.service';
import { HelperService } from '../../core/service/helper.service';
import { AuthService } from '../../core/service/auth.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransferPopupComponent } from '../../reconcile/transfer-popup/transfer-popup.component';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  length:any;
  transfer_deposit_log;

  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject<any>();
  length1:any;
  transfer_psb_cc;
  in_trans_totle;
  out_trans_totle;

  constructor(
    private http: HttpClient,
    private helperSvc: HelperService,
    private authSvc: AuthService,
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

    this.authSvc.get_transfer_deposit_log().subscribe(
      res => {
        console.log(res);
        this.transfer_deposit_log = res['data_val'];
        this.length = res['data_val'].length;
        this.dtTrigger.next();

        // Totle incoming amount
        var in_trans_numbers = res['data_val'].map(i => {
          if(i.amount == undefined || i.amount == ""){
            return parseFloat('0');
          }else{
            return parseFloat(i.amount)
          }
        });
        var in_trans_sum = in_trans_numbers.reduce((a, b) => a + b, 0);
        this.in_trans_totle = in_trans_sum.toFixed(2);
    });

    this.outgonig_transfer();
    
  }

  outgonig_transfer(){
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

    this.authSvc.get_transfer_psb_cc().subscribe(
      res => {
        console.log(res);
        this.transfer_psb_cc = res['data_val'];
        this.length1 = res['data_val'].length;
        this.dtTrigger1.next();

        // totle out going amount
        var out_trans_numbers = res['data_val'].map(i => {
          if(i.amount == undefined || i.amount == ""){
            return parseFloat('0');
          }else{
            return parseFloat(i.amount)
          }
        });
        var out_trans_sum = out_trans_numbers.reduce((a, b) => a + b, 0);
        this.out_trans_totle = out_trans_sum.toFixed(2);
    });
  }

  transfer_popup(note){
    const modalRef = this.modalService.open(TransferPopupComponent, { size: 'lg' });
    modalRef.componentInstance.note = note;
  }

}
