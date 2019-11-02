import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { HelperService } from '../../core/service/helper.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantService } from '../../core/service/constant.service';
import { AddVendorComponent } from '../../reconcile/add-vendor/add-vendor.component';
import { EditVendorComponent } from '../../reconcile/edit-vendor/edit-vendor.component';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();
  length:any;
  vendor_data;
  editvendorData;

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
    
    this.authSvc.get_vendor().subscribe(
      res => {
        if (res.Status === 200) {
          this.vendor_data = res['data_val'];
          this.length = res['data_val'].length;
				  this.dtTrigger.next();
        } else{
          console.log('there are something wrong.');
        }
      }, err => console.log('error in vendor function ', err)
    );
  }

  open() {
		const modalRef = this.modalService.open(AddVendorComponent, { size: 'lg' });
		modalRef.componentInstance.name = 'World';
  }
  
  edit(editId) {
    this.authSvc.userEdit(this.constantSvc.APIConfig.EDIT_VENDOR+'/', editId).subscribe(
      res => {
        this.editvendorData = res.data;
        const modalRef = this.modalService.open(EditVendorComponent, { size: 'lg' });
        modalRef.componentInstance.editData =  this.editvendorData;
      }, err => console.log('error in useredit function ', err)
    );	
  }
  
  delete(userId) {
		if (confirm("Are you sure. You want to delete Vendor.")) {
			this.authSvc.vendorDelete(this.constantSvc.APIConfig.DELETE_VENDOR+'/', userId).subscribe(
				res => {
					if (res.Status === 200) {
						this.helperSvc.notifySuccess('Vendor deleted successfully');
						$( "#re_close" ).trigger( "click" );
						this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["vendor"])); 
						
					} else {
						console.log('there are something wrong.');
					}
				}, err => console.log('error in delete function ', err)
			);
		}
		return false;
		
	}

}
