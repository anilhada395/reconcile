import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/service/auth.service';
import { HelperService } from '../core/service/helper.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { ConstantService } from '../core/service/constant.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit  {
	usersRole: any;
	dtTrigger: Subject<any> = new Subject<any>();
	
	registerForm: FormGroup;
	submitted = false;
	
	// City Names
	Country: any = ['India', 'Russia', 'USA', 'japan'];

	constructor(
		public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder, 
		private helperSvc: HelperService,
		private router: Router, 
		private authSvc: AuthService,
		private http: Http,
		private constantSvc: ConstantService
	) {}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			address: ['', Validators.required],
			gender: ['', Validators.required],
			country: ['', [Validators.required]],
			role: ['', [Validators.required]],
			phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]]
		});
		
		this.authSvc.userRole().subscribe(
			res => {
				this.usersRole = res.data;
			}, err => console.log('error in user role function ', err)
			);
	}
	
	// convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }
	
	onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.registerForm.invalid) {
		  return;
		}else{
			//alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
			var userdata = this.registerForm.value;
			this.authSvc.register(this.constantSvc.APIConfig.REGISTER, userdata).subscribe(
				res => {
					if (res.Status === 201) {
						this.helperSvc.notifySuccess('User registerd successfully');
						$( "#re_close" ).trigger( "click" );
						this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["users"])); 
						
					} else if(res.Status ===  404) {
						if(res.data[0].message ===  'This Email is Taken, Try Another') {
							this.helperSvc.notifyWarnig('Email already exists');
						}else{
							console.log('there are something wrong.');
						}
					}else{
						console.log('there are something wrong.');
					}
				}, err => console.log('error in register function ', err)
			);
		}
	}
	
	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}

	private extractData(res: Response) {
		const body = res.json();
		return body.data || {};
	}

}
