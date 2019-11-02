import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/service/auth.service';
import { HelperService } from '../core/service/helper.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantService } from '../core/service/constant.service';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
	editData: any;
	editForm: FormGroup;
	submitted = false;
	usersRole: any;

	userId: any;
	userName: any;
	userEmail: any;
	userPhone: any;
	userAddress: any;
	userGender: any;
	userCountry: any;
	userRole_id: any;
	
	// City Names
	country = [
		{value: 'india', viewValue: 'India'},
		{value: 'russia', viewValue: 'Russia'},
		{value: 'USA', viewValue: 'USA'},
		{value: 'japan', viewValue: 'japan'}
	];

	// gender Names
	gender = [
		{value: 'male', viewValue: 'Male'},
		{value: 'female', viewValue: 'Female'}
	];

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
		this.userId = this.editData._id;
		this.userName = this.editData.name;
		this.userEmail = this.editData.email;
		this.userPhone = this.editData.phone;
		this.userAddress = this.editData.address;
		this.userGender = this.editData.gender;
		this.userCountry = this.editData.country;
		this.userRole_id = this.editData.role_id;


		this.editForm = this.formBuilder.group({
			id: ['', Validators.required],
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			address: ['', Validators.required],
			gender: ['', Validators.required],
			country: ['', [Validators.required]],
			role: ['', [Validators.required]],
			phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]]
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
			//alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.editForm.value));
			var userdata = this.editForm.value;
			this.authSvc.update(this.constantSvc.APIConfig.UPDATEUSER, userdata).subscribe(
				res => {
					if (res.Status === 200 || res.Status === 407) {
						this.helperSvc.notifySuccess('User updated successfully');
						$( "#re_close" ).trigger( "click" );
						this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["users"])); 
						
					}else{
						console.log('there are something wrong.');
					}
				}, err => console.log('error in update function ', err)
			);
		}
	}
}
