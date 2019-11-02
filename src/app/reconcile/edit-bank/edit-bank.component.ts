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
  selector: 'app-edit-bank',
  templateUrl: './edit-bank.component.html',
  styleUrls: ['./edit-bank.component.scss']
})
export class EditBankComponent implements OnInit {
  editData: any;
  editForm: FormGroup;
  submitted = false;
  
  bankId;
  bank_name;
  account_number;

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
    this.bankId = this.editData._id;
		this.bank_name = this.editData.bank_name;
		this.account_number = this.editData.account_number;
    

    this.editForm = this.formBuilder.group({
			id: ['', Validators.required],
			bank_name: ['', Validators.required],
			account_number: [''], 
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
			this.authSvc.updateBank(this.constantSvc.APIConfig.UPDATE_BANK, userdata).subscribe(
				res => {
					if (res.Status === 200) {
						this.helperSvc.notifySuccess('Bank updated successfully');
						$( "#re_close" ).trigger( "click" );
						this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["bank"])); 
						
					}else{
						console.log('there are something wrong.');
					}
				}, err => console.log('error in update function ', err)
			);
		}
	}

}
