import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantService } from '../../core/service/constant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../core/service/helper.service';
import { ReconciledDepositMoreDetailComponent } from '../reconciled-deposit-more-detail/reconciled-deposit-more-detail.component';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-deposit-reconciled',
  templateUrl: './deposit-reconciled.component.html',
  styleUrls: ['./deposit-reconciled.component.scss']
})
export class DepositReconciledComponent implements OnInit {

  deposit_reconciled:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  length:any;

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private helperSvc: HelperService,
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
    this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.ALL_DEPOSIT_RECONILED_DB).subscribe(
      respons => {
        console.log(respons)
        this.deposit_reconciled = respons['data_val'];
        this.length = respons['data_val'].length;
				this.dtTrigger.next();
  
    });
  }

  show_more_details(data,note){
    const modalRef = this.modalService.open(ReconciledDepositMoreDetailComponent, { size: 'lg' });
		modalRef.componentInstance.data = data;   
		modalRef.componentInstance.note = note;   
  }

}
