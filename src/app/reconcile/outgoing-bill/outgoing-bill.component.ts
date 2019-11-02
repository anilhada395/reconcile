import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { HelperService } from '../../core/service/helper.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantService } from '../../core/service/constant.service';
import { DatePipe } from '@angular/common';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-outgoing-bill',
  templateUrl: './outgoing-bill.component.html',
  styleUrls: ['./outgoing-bill.component.scss'],
  providers:[DatePipe]
})
export class OutgoingBillComponent implements OnInit {
  psb_data: any;

  bankId: any;
	bankName: any;
	userEmail: any;
	bankDate: any;
	bankDescription: any;
  bankAmount: any;
  vendor: any;

  bankAccountNo: any;
  bankLocationID: any;
  bankLineNo: any;

  formGroup: FormGroup;
  submitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder, 
    private authSvc: AuthService,
    private helperSvc: HelperService,
  ) { }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
			id: [''],
			bank_name: [''],
			bank_description: [''],
			bank_amount: [''],
			bank_date: [''],
			bank_accno: [''],
			bank_locationid: [''],
			bank_stockno: ['', Validators.required],
			vendor_id: ['', Validators.required],
    });

    this.bankId = this.psb_data._id;
    this.bankDate = this.psb_data.date;
    this.bankName = this.psb_data.bank_name;
    this.bankDescription = this.psb_data.description;
    this.bankAmount = this.psb_data.amount;

    this.authSvc.get_reconcile_setting().subscribe(
      res => {
        if (res.Status === 200) {
          this.bankAccountNo  = res.data[9].meta_value;
          this.bankLocationID = res.data[10].meta_value;
          this.bankLineNo     = "1";
        }
      })
    

    this.authSvc.get_vendor().subscribe(
      res => {
        if (res.Status === 200) {
          this.vendor = res.data_val;
        }
      })
  }
  get f() { return this.formGroup.controls; }

  onSubmit(){
    this.submitted   = true;
    // stop here if form is invalid
		if (this.formGroup.invalid) {
      return;
		} else {
      var vendorValue = this.formGroup.value;
      var vendorData = {
        whencreated_date: vendorValue.bank_date,
        vendor_id: vendorValue.vendor_id, 
        amount: vendorValue.bank_amount, 
        stock_no: vendorValue.bank_stockno, 
        line_no: this.bankLineNo, 
        account_no: this.bankAccountNo,
        location_id: this.bankLocationID
      };

      console.log('vendorData')
      console.log(vendorData)

      
      this.authSvc.outgoing_bill_insert(vendorData).subscribe(
        res => {
        console.log(res)
          if(res.Status == 201){
            this.helperSvc.notifySuccess(res.data);
            this.helperSvc.notifySuccess("Bill Create Successfully");
            $('.registerbtn').attr('disabled', 'disabled');
            $( "#re_close" ).trigger( "click" );
          } else {
            this.helperSvc.notifyError(res.data);
          }
        })
    }
  }
}