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
  selector: 'app-show-flag',
  templateUrl: './show-flag.component.html',
  styleUrls: ['./show-flag.component.scss']
})
export class ShowFlagComponent implements OnInit {
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
    this.authSvc.get_flag_db().subscribe(
      res => {
        if (res.Status === 200) {
          this.flag_data = res['data_val'];
          var data;
          var data_val = [];
          if(this.flag_val){
            
          var flag_split = this.flag_val.split(",");

          for (var i = 0; i < flag_split.length; i++) {
            data = {"flag_name":flag_split[i], "checked":"checked"};
            data_val.push(data);
          }

          var finalObj = data_val.concat(res['data_val']);
          }
          
        } else{
          console.log('there are something wrong.');
        }
      }, err => console.log('error in vendor function ', err)
    );
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
