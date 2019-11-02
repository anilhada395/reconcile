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
  selector: 'app-show-outgoing-flag',
  templateUrl: './show-outgoing-flag.component.html',
  styleUrls: ['./show-outgoing-flag.component.scss']
})
export class ShowOutgoingFlagComponent implements OnInit {
  flag_class:any;
  flag_value:any;
  bank_data_id:any;
  flag_val:any;
  flag_data;
  data: string;
  registerForm: FormGroup;

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
 
  }

  note_click(){
    
     var note =  $('.note_class').val()
     var bank_id = this.bank_data_id
     var data = {"flag": this.flag_value, "flag_data": note}
     $('.deposit_tbl_new_flag'+this.flag_class).val(note);
     this.authSvc.all_bank_flag_update(bank_id,data).subscribe(
      res => {
        $( "#re_close" ).trigger( "click" );
				this.helperSvc.notifySuccess('Note created successfully');        

      });
  }
}
