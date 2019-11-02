import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../core/service/helper.service';
import { AuthService } from '../../core/service/auth.service';
import { ConstantService } from '../../core/service/constant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlagMoreDetailComponent } from '../flag-more-detail/flag-more-detail.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-flag-open',
  templateUrl: './flag-open.component.html',
  styleUrls: ['./flag-open.component.scss']
})
export class FlagOpenComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  length:any;
  dtOptions1: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject<any>();
  length1:any;
  
  incoming_open:any;
  outgoing_open:any;
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
    this.authSvc.flagged_bank_data('open',"Chase").subscribe(
      res => {

        console.log("res11111")
        console.log(res)

            this.incoming_open = res.data;; 
            console.log('incoming opennnnnnnnnnn')
            console.log(this.incoming_open)
            
            this.length = this.incoming_open.length;
				    this.dtTrigger.next();

          });

          this.outgoing_open_flag();
          this.helperSvc.loaderStop();
  }

  outgoing_open_flag(){
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
    this.authSvc.flagged_bank_data('open',"Plain State Bank").subscribe(
      res => {

        console.log("res11111")
        console.log(res)

            this.outgoing_open = res.data;; 
            console.log('outgoing opennnnnnnnnnn')
            console.log(this.outgoing_open)
            
            this.length1 = this.outgoing_open.length;
				    this.dtTrigger1.next();
            
          });
  }
  flag_more_detail(note){
    const modalRef = this.modalService.open(FlagMoreDetailComponent, { size: 'lg' });
    modalRef.componentInstance.note = note;
  }

}




