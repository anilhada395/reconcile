import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { HelperService } from '../../core/service/helper.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantService } from '../../core/service/constant.service';

@Component({
  selector: 'app-add-flag',
  templateUrl: './add-flag.component.html',
  styleUrls: ['./add-flag.component.scss']
})
export class AddFlagComponent implements OnInit {
  addflag: FormGroup;
	submitted = false;

  constructor(
    public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder, 
		private helperSvc: HelperService,
		private router: Router, 
		private authSvc: AuthService,
		private constantSvc: ConstantService
  ) { }

  ngOnInit() {
    this.addflag = this.formBuilder.group({
      flag_name: ['', Validators.required],
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addflag.controls; }

  onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.addflag.invalid) {
		  return;
		}else{
			//alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addflag.value));
			var flag_data = this.addflag.value;
			this.authSvc.flag_in(this.constantSvc.APIConfig.FLAG_IN, flag_data).subscribe(
				res => {
					if (res.Status === 201) {
						this.helperSvc.notifySuccess('Flag successfully added.');
						$( "#re_close" ).trigger( "click" );
						this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["flagged"]));
					}else{
						console.log('there are something wrong.');
					}
				}, err => console.log('error in register function ', err)
			);
		}
	}

}
