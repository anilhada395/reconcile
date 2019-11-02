import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { HelperService } from '../../core/service/helper.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantService } from '../../core/service/constant.service';
import { AddBankComponent } from '../../reconcile/add-bank/add-bank.component';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
	settingForm: FormGroup;

  senderID: any;
  senderPassword: any;
  userID: any;
  userPassword: any;
  companyID: any;
  hostName: any;
  idmsUser: any;
  idmsPassword: any;
  idmsFile: any;
  billAccount: any;
  billLocation: any;
  accountSid: any;
  authToken: any;
  fromNumber: any;
  role;

  constructor(
    private modalService: NgbModal,
    private helperSvc: HelperService,
	  private formBuilder: FormBuilder,     
		private authSvc: AuthService,
		private router: Router, 
    private http: Http,
		private constantSvc: ConstantService,
  ) { }
  
  ngOnInit() {
    if (this.helperSvc.lsGetItem('USER-INFO')) {
      this.role = atob(this.helperSvc.lsGetItem('USER-ROLE'));
      if(this.role != '1'){
        this.router.navigate(['/home']);
      }
    }

    this.authSvc.get_reconcile_setting().subscribe(
      res => {

      this.senderID = res.data[0].meta_value;
      this.senderPassword = res.data[1].meta_value;
      this.userID = res.data[2].meta_value;
      this.companyID = res.data[3].meta_value;
      this.userPassword = res.data[4].meta_value;
      this.hostName = res.data[5].meta_value;
      this.idmsUser = res.data[6].meta_value;
      this.idmsPassword = res.data[7].meta_value;
      this.idmsFile = res.data[8].meta_value;
      this.billAccount = res.data[9].meta_value;
      this.billLocation = res.data[10].meta_value;
      this.accountSid = res.data[11].meta_value;
      this.authToken = res.data[12].meta_value;
      this.fromNumber = res.data[13].meta_value;
      })
      
    
		this.settingForm = this.formBuilder.group({
			intacct_sender_id: ['', Validators.required],
			intacct_sender_password: ['', Validators.required],
			intacct_user_id: ['', Validators.required],
			intacct_user_password: ['', Validators.required],
			intacct_company_id: ['', Validators.required],
			idms_hostname: ['', Validators.required],
			idms_username: ['', Validators.required],
			idms_password: ['', Validators.required],
			idms_filename: ['', Validators.required],
			bill_account_no: ['', Validators.required],
			bill_location_id: ['', Validators.required],
			twillo_account_sid: ['', Validators.required],
			twillo_auth_token: ['', Validators.required],
			twillo_from_no: ['', Validators.required],
    });
	}
  

  focusoutHandler(value,key) {
      var meta_key = key;
      var meta_value = value;
      var settingData = {meta_key: meta_key, meta_value: meta_value}
      this.authSvc.setting_update(settingData).subscribe(
        res => {
          console.log(res)
          console.log(res.data.matchedCount)
          if(res.Status == 201 && res.data.matchedCount == 1){
              this.helperSvc.notifySuccess('Update Successfully Done');
          } else {
              this.helperSvc.notifyError('Not Updated');
          }
        }), err =>{
          console.log('error in delete function ', err)
        }
}
	// convenience getter for easy access to form fields
 get f() { return this.settingForm.controls; }

}