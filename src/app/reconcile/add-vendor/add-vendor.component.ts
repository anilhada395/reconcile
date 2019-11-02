import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { HelperService } from '../../core/service/helper.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantService } from '../../core/service/constant.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {
  addvendor: FormGroup;
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
    this.addvendor = this.formBuilder.group({
		vendor_id: ['', Validators.required],
		vendor_name: ['', Validators.required],
    });
    
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.addvendor.controls; }

  onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.addvendor.invalid) {
		  return;
		}else{
			//alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addvendor.value));
			var vendor_data = this.addvendor.value;
			this.authSvc.add_vendor(this.constantSvc.APIConfig.ADD_VENDOR, vendor_data).subscribe(
				res => {
					if (res.Status === 201) {
						this.helperSvc.notifySuccess('Vendor successfully added.');
						$( "#re_close" ).trigger( "click" );
						this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["vendor"]));
					} else if(res.Status ===  404) {
						if(res.data[0].message ===  'This Vendor ID is Taken, Try Another') {
							this.helperSvc.notifyWarnig(res.data[0].message);
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

}
