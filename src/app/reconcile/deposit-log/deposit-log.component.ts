import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { HelperService } from '../../core/service/helper.service';
import { Router } from '@angular/router';
import { ConstantService } from '../../core/service/constant.service';
// import {MatDatepickerModule, MatInputModule,MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import { Subject } from 'rxjs'; 

@Component({
  selector: 'app-deposit-log',
  templateUrl: './deposit-log.component.html',
  styleUrls: ['./deposit-log.component.scss']
})
export class DepositLogComponent implements OnInit {
	

	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();
	length:any;

 	depositlog_form: FormGroup;
	submitted = false;
	deposit_log_data;
	editdepositData;

	id;
	deposit_date;
	description;
	payment_type;
	amount;

	date;
	button_val;

  constructor(
    private formBuilder: FormBuilder, 
		private helperSvc: HelperService,
		private router: Router, 
		private authSvc: AuthService,
		private constantSvc: ConstantService,
		private matDatepicker: MatDatepickerModule
  ) { }

  ngOnInit() {
	this.deposit_date = new FormControl(new Date());
	this.button_val = 'Add';
	
	this.dtOptions = {
		paging: false,
		pagingType: 'full_numbers',
		pageLength: 10000,
		scrollY: "500px",
      	scrollCollapse: true
	};

	this.authSvc.get_deposit_log().subscribe(
		res => {
		  console.log(res);
		  this.deposit_log_data = res['data_val'];
		  this.length = res['data_val'].length;
		  this.dtTrigger.next();

		  if(res['data_val'].length <= 0){
			  $(".reconcile_button").attr("disabled","");
			  $(".reconcile_button").addClass("disabled");
		  }

		}
	);

    this.depositlog_form = this.formBuilder.group({
		id:[''],
		deposit_date: [new Date(),Validators.required],
		deposit_type: ['', [Validators.required]],
		description: [''],
		amount: ['', Validators.required],
	});
  }

  edit(editId) {
	this.button_val = 'Update';
	this.authSvc.userDepositlog(this.constantSvc.APIConfig.EDIT_DPOSIT_LOG+'/', editId).subscribe(
		res => {
			 this.editdepositData = res['data'];

			 this.depositlog_form = this.formBuilder.group({
				id:this.editdepositData._id,
				deposit_date: new Date(this.editdepositData.date),
				description: this.editdepositData.description,
				deposit_type: this.editdepositData.payment_type,
				amount: this.editdepositData.amount,
			});



		}, err => console.log('error in useredit function ', err)
	);	
		

		
  }

  delete(deposit_log_Id) {
	if (confirm("Are you sure. You want to delete.")) {
		this.authSvc.userDelete(this.constantSvc.APIConfig.DELETE_DPOSIT_LOG+'/', deposit_log_Id).subscribe(
			res => {
				if (res.Status === 200) {
					this.helperSvc.notifySuccess('Deposit log deleted successfully');
					$( "#re_close" ).trigger( "click" );
					this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["deposit-log"])); 
					
				} else {
					console.log('there are something wrong.');
				}
			}, err => console.log('error in delete function ', err)
		);
	}
	return false;
	
}

  // convenience getter for easy access to form fields
  get f() { 
	return this.depositlog_form.controls; }

  onSubmit() {
		this.submitted = true;
		console.log(this.depositlog_form.invalid)
		if (this.depositlog_form.invalid) {
		  return;
		}else{
			//alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.depositlog_form.value));
			var bankdata = this.depositlog_form.value;
			this.authSvc.add_deposit_log_data(this.constantSvc.APIConfig.ADD_DEPOSITLOG_BANK_DATA, bankdata).subscribe(
				res => {
				if(this.depositlog_form.value.id != ''){
					this.helperSvc.notifySuccess('Deposit log successfully updated.');
				}else{
					this.helperSvc.notifySuccess('Deposit log successfully inserted.');
				}
          		
          		this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["deposit-log"])); 
					
				}, err => console.log('error in register function ', err)
			);
		}
	}

	chk_deposit_log_click(){
		this.authSvc.update_depositlog_status().subscribe(
			res => {
			  this.helperSvc.notifySuccess('Deposit log successfully added.');
			  
			  this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["deposit-log"])); 
				
			}, err => console.log('error in register function ', err)
		);
	}

}
