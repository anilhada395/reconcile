import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { HelperService } from '../../core/service/helper.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantService } from '../../core/service/constant.service';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent implements OnInit {

  addbank: FormGroup;
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
    this.addbank = this.formBuilder.group({
			bank_name: ['', Validators.required],
			account_number: [''],
		});
  }

  // convenience getter for easy access to form fields
  get f() { return this.addbank.controls; }
  
  onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.addbank.invalid) {
		  return;
		}else{
			//alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addbank.value));
			var bankdata = this.addbank.value;
			this.authSvc.addBank(this.constantSvc.APIConfig.ADD_BANK, bankdata).subscribe(
				res => {
					if (res.Status === 201) {
						this.helperSvc.notifySuccess('Bank registerd successfully');
						$( "#re_close" ).trigger( "click" );
						this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["bank"])); 
					}else{
						console.log('there are something wrong.');
					}
				}, err => console.log('error in register function ', err)
			);
		}
	}

}