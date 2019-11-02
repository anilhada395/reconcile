import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../core/service/helper.service';
import { AuthService } from '../core/service/auth.service';
import { ConstantService } from '../core/service/constant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  resetPassForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, 
    private helperSvc: HelperService,
	private authSvc: AuthService,
	private constantSvc: ConstantService,
	private router: Router, 
  ) { }

  ngOnInit() {
    this.resetPassForm = this.formBuilder.group({
		  email: ['', [Validators.required, Validators.email]],
		});
  }

  get f() { return this.resetPassForm.controls; }

  onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.resetPassForm.invalid) {
		  return;
		}else{
			//alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.resetPassForm.value));
			var userdata = this.resetPassForm.value;
			this.authSvc.resetPassword(this.constantSvc.APIConfig.RESETPASS, userdata).subscribe(
				res => {
					if (res.Status === 200) {
					  this.helperSvc.notifySuccess('Verification link has been sent to your email account.');
					  this.router.navigate(['/home']);
					} else if (res.Status === 404){
						this.helperSvc.notifyError('Email not found in our database.');
					} else {
					  console.log('there are something wrong.');
					}
				}, err => console.log('error in reset password function ', err)
      );
		}
	}

}
