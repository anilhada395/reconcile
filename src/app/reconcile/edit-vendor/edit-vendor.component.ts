import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { HelperService } from '../../core/service/helper.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantService } from '../../core/service/constant.service';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.scss']
})
export class EditVendorComponent implements OnInit {
  editData: any;
	editForm: FormGroup;
  submitted = false;
  
  id: any;
  vendor_id: any;
	vendor_name: any;

  constructor(
    public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder, 
		private helperSvc: HelperService,
		private router: Router, 
		private authSvc: AuthService,
		private http: Http,
		private constantSvc: ConstantService,
  ) { }

  ngOnInit() {
    this.id = this.editData._id;
    this.vendor_id = this.editData.vendor_id;
    this.vendor_name = this.editData.vendor_name;
    
    this.editForm = this.formBuilder.group({
			id: ['', Validators.required],
			vendor_id: ['', Validators.required],
			vendor_name: ['', [Validators.required]],
		});
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }
  
  onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.editForm.invalid) {
		  return;
		}else{
			var userdata = this.editForm.value;
			this.authSvc.vendorUpdate(this.constantSvc.APIConfig.UPDATE_VENDOR, userdata).subscribe(
				res => {
					if (res.Status === 200 || res.Status === 407) {
						this.helperSvc.notifySuccess('Vendor updated successfully');
						$( "#re_close" ).trigger( "click" );
						this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["vendor"])); 
						
					}else{
						console.log('there are something wrong.');
					}
				}, err => console.log('error in update function ', err)
			);
		}
	}



}
