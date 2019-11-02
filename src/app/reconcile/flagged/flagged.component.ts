import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { HelperService } from '../../core/service/helper.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantService } from '../../core/service/constant.service';
import { AddFlagComponent } from '../../reconcile/add-flag/add-flag.component';
import { EditFlagComponent } from '../../reconcile/edit-flag/edit-flag.component';

import { Http } from '@angular/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-flagged',
  templateUrl: './flagged.component.html',
  styleUrls: ['./flagged.component.scss']
})
export class FlaggedComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();
  length:any;
  flag_data;
  editflagData;

  constructor(
    private modalService: NgbModal,
		private helperSvc: HelperService,
		private authSvc: AuthService,
		private router: Router, 
		private http: Http,
		private constantSvc: ConstantService,
  ) { }

  ngOnInit() {
    this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
    };

    this.authSvc.get_flag_db().subscribe(
      res => {
        if (res.Status === 200) {
          this.flag_data = res['data_val'];
          this.length = res['data_val'].length;
				  this.dtTrigger.next();
        } else{
          console.log('there are something wrong.');
        }
      }, err => console.log('error in vendor function ', err)
    );


  }

  open() {
		const modalRef = this.modalService.open(AddFlagComponent, { size: 'lg' });
		modalRef.componentInstance.name = 'World';
  }
  
  edit(editId) {
    this.authSvc.edit_flag(this.constantSvc.APIConfig.EDIT_FLAG+'/', editId).subscribe(
      res => {
        this.editflagData = res.data;
        const modalRef = this.modalService.open(EditFlagComponent, { size: 'lg' });
        modalRef.componentInstance.editData =  this.editflagData;
      }, err => console.log('error in useredit function ', err)
    );	
  }
  
  delete(flagId) {
		if (confirm("Are you sure. You want to delete Vendor.")) {
			this.authSvc.delete_flag(this.constantSvc.APIConfig.DELETE_FLAG+'/', flagId).subscribe(
				res => {
					if (res.Status === 200) {
						this.helperSvc.notifySuccess('Flag deleted successfully');
						$( "#re_close" ).trigger( "click" );
						this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["flagged"])); 
						
					} else {
						console.log('there are something wrong.');
					}
				}, err => console.log('error in delete function ', err)
			);
		}
		return false;
		
	}

}
