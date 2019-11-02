import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from '../core/service/helper.service';
import { AuthService } from '../core/service/auth.service';
import { ConstantService } from '../core/service/constant.service';
import { MustMatch } from '../must-match.validator';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  email:any;
  emailtime:any;
  item:any;
  today:any;
  diffMs:any;
  diffMins:any;

  changePassForm: FormGroup;
  submitted = false;
  
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, 
  	private router: Router, 
  	private helperSvc: HelperService,
  	private authSvc: AuthService,
  	private constantSvc: ConstantService,
    ) { }

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.emailtime = this.route.snapshot.queryParamMap.get('token');
    this.item = this.route.snapshot.queryParamMap.get('item');


    this.today = new Date();
    this.diffMs = (Date.parse(this.today) - this.emailtime);
    this.diffMins = this.diffMs/60000; // minutes

    if (this.diffMins > 15 || this.diffMins < 0) {
      this.helperSvc.notifyError('Password reset link expired. please try again.');
     this.router.navigate(['/home']);
    }else{
      this.changePassForm = this.formBuilder.group({
        email: [''],
        item: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
		    cpassword: ['', Validators.required],
      }, {
        validator: MustMatch('password', 'cpassword')
      });

    }

  }

  get f() { return this.changePassForm.controls; }

  onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.changePassForm.invalid) {
		  return;
		}else{
			//alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.changePassForm.value));
			var userdata = this.changePassForm.value;
			this.authSvc.changePassword(this.constantSvc.APIConfig.CHANGEPASS, userdata).subscribe(
				res => {
					if (res.Status === 200) {					  
					  this.helperSvc.notifySuccess('Password changed.');
					  this.router.navigate(['/home']);
					} else {
					  console.log('there are something wrong.');
					}
				}, err => console.log('error in change password function ', err)
			);
		}
	}

}
