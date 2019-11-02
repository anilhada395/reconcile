import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../core/service/helper.service';
import { AuthService } from '../../core/service/auth.service';
import { ConstantService } from '../../core/service/constant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlagMoreDetailComponent } from '../flag-more-detail/flag-more-detail.component';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-flag-close',
  templateUrl: './flag-close.component.html',
  styleUrls: ['./flag-close.component.scss']
})
export class FlagCloseComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  length:any;
  dtOptions1: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject<any>();
  length1:any;
  
  incoming_close:any;
  outgoing_close:any;
  private loading: boolean = false;
  user_role;

  constructor(
    private http: HttpClient,
    private helperSvc: HelperService,
    private authSvc: AuthService,
    private modalService: NgbModal,
    private constantSvc: ConstantService
  ) {
   
   }

  ngOnInit() {

    this.dtOptions = {
			paging: false,
			pagingType: 'full_numbers',
			pageLength: 10000
    };

    this.helperSvc.loaderStart();
    var role = atob(this.helperSvc.lsGetItem('USER-ROLE'));
    if(role != '1'){
      this.user_role = "disabled";
    }

    this.loading = true;
    this.authSvc.flagged_bank_data('close',"Chase").subscribe(
      res => {

            this.incoming_close = res.data;; 
            console.log('incoming closeeeeeeeeeeeeeee')
            console.log(this.incoming_close)
            
            this.length = this.incoming_close.length;
				    this.dtTrigger.next();

          });

          this.outgoing_close_flag();
          this.helperSvc.loaderStop();
  }

  outgoing_close_flag(){
    this.dtOptions1 = {
			paging: false,
			pagingType: 'full_numbers',
			pageLength: 10000
    };

    this.helperSvc.loaderStart();
    var role = atob(this.helperSvc.lsGetItem('USER-ROLE'));
    if(role != '1'){
      this.user_role = "disabled";
    }
    this.loading = true;
    this.authSvc.flagged_bank_data('close',"Plain State Bank").subscribe(
      res => {

            this.outgoing_close = res.data;; 
            console.log('outgoing closeeeeeeeeeeeee')
            console.log(this.outgoing_close)
            
            this.length1 = this.outgoing_close.length;
				    this.dtTrigger1.next();

          });
  }

  flag_more_detail(note){
    const modalRef = this.modalService.open(FlagMoreDetailComponent, { size: 'lg' });
    modalRef.componentInstance.note = note;
  }

}