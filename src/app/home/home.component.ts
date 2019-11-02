import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from '../core/service/helper.service';
import { AuthService } from '../core/service/auth.service';
import { ConstantService } from '../core/service/constant.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit { 
	
	loginForm: FormGroup;
	submitted = false;
	username:any;
	usertoken:any;
	userrem:any;

	constructor(
	private formBuilder: FormBuilder, 
	private router: Router, 
	private helperSvc: HelperService,
	private authSvc: AuthService,
	private constantSvc: ConstantService,
	) { }

	ngOnInit() {
		if(this.helperSvc.lsGetItem('USER-REM')){
			this.username = atob(this.helperSvc.lsGetItem('USER-NAME'));
			this.usertoken = atob(this.helperSvc.lsGetItem('USER-TOKEN'));
			this.userrem = atob(this.helperSvc.lsGetItem('USER-REM'));
		}
		this.loginForm = this.formBuilder.group({
		  name: [''],
		  password: [''],
		  remember: [''],
		});
	}
	
	get f() { return this.loginForm.controls; }
	
	onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.loginForm.invalid) {
		  return;
		}else{
			//alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value));
			var userdata = this.loginForm.value;
			this.authSvc.login(this.constantSvc.APIConfig.LOGIN, userdata).subscribe(
				res => {
					if (res.Status === 200) {
					  this.helperSvc.lsSetItemSession('login', 'login');
					  const name = res.userData[0].name;
					  this.helperSvc.lsSetItem('USER-INFO', btoa(res.userData[0]));
					  this.helperSvc.lsSetItem('USER-ID', btoa(res.userData[0]._id));

					  this.helperSvc.lsSetItem('USER-ROLE', btoa(res.userData[0].role_id));
					  
					  if(String(this.loginForm.value.remember) != 'true'){
						this.helperSvc.lsRemoveItem('USER-NAME');
						this.helperSvc.lsRemoveItem('USER-TOKEN');
						this.helperSvc.lsRemoveItem('USER-REM'); 
					  }else{
						this.helperSvc.lsSetItem('USER-NAME', btoa(userdata.name));
						this.helperSvc.lsSetItem('USER-TOKEN', btoa(userdata.password));
						this.helperSvc.lsSetItem('USER-REM', btoa(this.loginForm.value.remember));
					  }
					  this.helperSvc.lsSetItem('USER-NAME', btoa(userdata.name));
					  
					  this.helperSvc.notifySuccess('Welcome ' + name);
					  this.router.navigate(['/dashboard']);
					} else {
					  this.helperSvc.notifyError('Please check username and password');
					}
				}, err => console.log('error in register function ', err)
			);
		} 
	}
 
}
