import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantService } from '../../core/service/constant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PendingDepositPopupComponent } from '../pending-deposit-popup/pending-deposit-popup.component';
import { HelperService } from '../../core/service/helper.service';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
const names = [];

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss']
})
export class DepositsComponent implements OnInit {

  pending_deposit:any;
  pe_deposit_totle;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  length:any;
  dtOptions1: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject<any>();
  length1:any;
  private loading: boolean = false;
  new_bank_data;
  bank_deposit_log_totle;
  formControlValue = '';

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private helperSvc: HelperService,
    private constantSvc: ConstantService,
    private authSvc: AuthService,
    private router: Router, 
  ) { }

  ngOnInit() { 
    this.dtOptions = {
			paging: false,
			pagingType: 'full_numbers',
      pageLength: 10000,
      order: [],
      columnDefs: [ {
        targets  : 'no-sort',
        orderable: false,
      }],
      scrollY: "500px",
      scrollCollapse: true
    };

    this.helperSvc.loaderStart();
    this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_PENDING_DEPOSIT_DB).subscribe(
      res => {
        this.pending_deposit = res['data_val'];
        this.length = res['data_val'].length;
				this.dtTrigger.next();

        // // totle deposit log amount
        var pe_deposit_numbers = res['data_val'].map(i => {
          if(i.amount == undefined || i.amount == ""){
            return parseFloat('0');
          }else{
            return parseFloat(i.amount)
          }
        });
        var pe_deposit_sum = pe_deposit_numbers.reduce((a, b) => a + b, 0);
        this.pe_deposit_totle = pe_deposit_sum.toFixed(2);

        this.helperSvc.loaderStop();
      });

      this.bank_data();

      this.authSvc.showUser().subscribe(
        res => {
         const userData = res.data;
         userData.forEach(element => {
           names.push(element.name);
         });
        }, err => console.log('error in show user function ', err)
        );
  }

  findChoices(searchText: string) {
    $("mwl-text-input-autocomplete-menu").addClass("intro");
    return names
    .filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );
  }
 
  getChoiceLabel(choice: string) {
    return `@${choice} `;
  }

  send_note(){
    var user_search_name = [];
    
    var note_value = $('.re_note').val().toString();

    var  remove_space = note_value.replace(/\s+$/, '');
    var val = remove_space.split(" ");
    
    for(var j=0; j<val.length; j++){
      var searchVal = val[j]
      var at = searchVal.match(/^[@]/i);
      if(at){
        searchVal = searchVal.replace(/@/g, "");
        user_search_name.push(searchVal)
      }
    }

    if(user_search_name.length > 0){

      $(".note_loading_img").show();
      var data = {sms:note_value,username:user_search_name};
      this.authSvc.send_sms(data).subscribe(
        res => {
          if(res.Status == 200){
            this.helperSvc.notifySuccess('Massage successfully sent.');
            $(".note_loading_img").hide();
          }else if(res.Status == 401){
            this.helperSvc.notifyError('Authentication token invalid.');
            $(".note_loading_img").hide();
          }else if(res.Status == 404){
            this.helperSvc.notifyError('Account SID invalid.');
            $(".note_loading_img").hide();
          }else{
            this.helperSvc.notifyError('Massage not sent.');
            $(".note_loading_img").hide();
          }

        }
      );
    }else{
      this.helperSvc.notifyError('Massage not sent.');
      $(".note_loading_img").hide();
    }
    
  }

  bank_data(){
    this.dtOptions1 = {
			paging: false,
			pagingType: 'full_numbers',
			pageLength: 10000,
      scrollY: "500px",
      scrollCollapse: true
    };

    this.helperSvc.loaderStart();
    this.loading = true;
    this.authSvc.get_all_bank_data('Capital One').subscribe(
      res => {
        var deposit_result;

        this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_DEPOSIT_BANK_DATA).subscribe(
          respo => {
            this.loading = false;
            function comparer(otherArray){
              return function(current){
                return otherArray.filter(function(other){
                  return other.description == current['description'] && other.amount == current['amount']
                }).length == 0;
              }
            }
            var onlyInA = respo['data_val'].filter(comparer(res['data'])); 
            var onlyInB = res['data'].filter(comparer(respo['data_val']));

            deposit_result = onlyInA.concat(onlyInB);

            this.new_bank_data = deposit_result; 
            this.length1 = deposit_result.length;
            this.dtTrigger1.next();

            // // totle deposit log amount
            var bank_deposit_numbers = deposit_result.map(i => {
              if(i.amount == undefined || i.amount == ""){
                return parseFloat('0');
              }else{
                return parseFloat(i.amount)
              }
            });
            var bank_deposit_sum = bank_deposit_numbers.reduce((a, b) => a + b, 0);
            this.bank_deposit_log_totle = bank_deposit_sum.toFixed(2);

        });

      });

  }

  onSubmit(){
    $(".reconcile_button").attr("disabled","");
    $(".reconcile_button").addClass("disabled");

    var note_value = $('.re_note').val();
    var row:any;
    var bankrow:any;
    var pd_id ='';
    var pd_reconcile_data ='';
    var Id='';
    var recon_data='';
    var PD_id='';
    var PD_recon_data:any;
    var bank_name='';
    var bank_description='';
    var bank_date='';
    var bank_amount='';
    var co_psb_data;
    var all_co_psb_data = [];
    var datetoday;
    var datenow='';
    var all_bank_name='';
    var panding_deposit_id;
    var all_panding_deposit_id = [];

    //var numbers;
    var co_psb_data_in;
    var re_totle_amt;

    //Loop through all checked CheckBoxes in GridView.    
    $(".pending_deposit_tbl input[name=panding_deposit_chk]:checked").each(function () { 
      row = $(this).closest("tr")[0];
      //select value from idms amount
      panding_deposit_id = {"id":row.cells[5].innerHTML};

      all_panding_deposit_id.push(panding_deposit_id);

      pd_id = row.cells[5].innerHTML;
      Id += pd_id+',';
  });

  var i;
  var y = 1;
  for (i = 0; i < all_panding_deposit_id.length; i++) { 
    this.http.post(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.PENDING_DEPOSIT_UPDATE, all_panding_deposit_id[i]).subscribe(
      res => {
        if(all_panding_deposit_id.length == y){
          $(".pending_deposit_tbl input[name=panding_deposit_chk]:checked").each(function () { 
            $(this).prop("checked", false);
            $(this).closest("tr").addClass("re_chk_hide");
          });

          
        }

        y++;
      });
    }



  PD_id = Id.replace(/,\s*$/, "");
  PD_recon_data = recon_data.replace(/,\s*$/, "");

  $(".bank_deposit input[name=bank_deposit_chk]:checked").each(function () { 
    bankrow = $(this).closest("tr")[0];

    bank_name = bankrow.cells[1].innerHTML;
    bank_description = bankrow.cells[2].innerHTML;
    bank_date = bankrow.cells[3].innerHTML;
    bank_amount = bankrow.cells[4].innerHTML;
    datetoday = new Date;
    datenow= (datetoday.getMonth()+1)+'/'+datetoday.getDate()+'/'+datetoday.getFullYear();

    all_bank_name += bank_name+',';

    co_psb_data = {"bank":bank_name,"description":bank_description,"date":bank_date,"amount":bank_amount,"pending_deposit_id":PD_id,"created_date":datenow};

    all_co_psb_data.push(co_psb_data);


  });

  all_bank_name = all_bank_name.replace(/,\s*$/, "");

  // totle idms amount
  var numbers = all_co_psb_data.map(i => {
    if(i.amount == undefined || i.amount == ""){
      return parseFloat('0');
    }else{
      return parseFloat(i.amount)
    }
  });
  var sum = numbers.reduce((a, b) => (a) + (b), 0);
  re_totle_amt = sum.toFixed(2);

  var USER_NAME = atob(this.helperSvc.lsGetItem('USER-NAME'));

  var j;
  var k = 1;
  var insertId='';
  for (j = 0; j < all_co_psb_data.length; j++) { 
    this.http.post(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.ADD_DEPOSIT_BANK_DATA, all_co_psb_data[j]).subscribe(
      res => {
        insertId += res['data'].insertedId+',';
        
        if(all_co_psb_data.length == k){
          $(".bank_deposit input[name=bank_deposit_chk]:checked").each(function () { 
            $(this).prop("checked", false);
            $(this).closest("tr").addClass("re_chk_hide");
          });

          insertId = insertId.replace(/,\s*$/, "");

          co_psb_data_in = {"reconciled_by":USER_NAME,"bank":all_bank_name,"created_date":datenow,"amount":re_totle_amt,"deposit_bank_id":insertId,"pending_deposit_id": PD_id,"note":note_value};

          this.http.post(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.DEPOSIT_RECONILED_IN, co_psb_data_in).subscribe(
            respons => {
              this.helperSvc.notifySuccess('Reconcile successfully done');
              this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["deposits"]));

          });

          
        }

        k++;
      });
    }

  
  }

  chk_click_check(){
    var pending_deposit_tbl_ck;
    var bank_deposit_tbl_ck;
    var row;
    var row1;
    var amount_val;
    var amount_val1;
    var data;
    var data2;
    var pending_deposit_data = [];
    var bank_deposit_data = [];
    var checked_pending_deposit_val;
    var checked_bank_deposit_val;

    $(".pending_deposit_tbl input[name=panding_deposit_chk]:checked").each(function () { 
      $(this).closest("tr").addClass("row_checked_bg");
      pending_deposit_tbl_ck = 'checked';
      row = $(this).closest("tr")[0];

      //select value from idms amount
      amount_val = row.cells[4].innerHTML;
      data = {"amount":amount_val};
      pending_deposit_data.push(data);
    });
    $(".pending_deposit_tbl input[name=panding_deposit_chk]:not(:checked)").each(function () {

      $(this).closest("tr").removeClass("row_checked_bg");
    
    });

    // totle pending deposit amount
    var numbers = pending_deposit_data.map(i => {
      if(i.amount == undefined || i.amount == ""){
        return parseFloat('0');
      }else{
        return parseFloat(i.amount)
      }
    });
    var sum = numbers.reduce((a, b) => (a) + (b), 0);
    checked_pending_deposit_val = sum.toFixed(2);


    $(".bank_deposit input[name=bank_deposit_chk]:checked").each(function () {
      $(this).closest("tr").addClass("row_checked_bg");
      bank_deposit_tbl_ck = 'checked';
      row1 = $(this).closest("tr")[0];
      amount_val1 = row1.cells[4].innerHTML;
      data2 = {"amount":amount_val1};
      bank_deposit_data.push(data2);
    });

    $(".bank_deposit input[name=bank_deposit_chk]:not(:checked)").each(function () {

      $(this).closest("tr").removeClass("row_checked_bg");
    
    });

    // totle bank deposit amount
    var numbers1 = bank_deposit_data.map(i => {
      if(i.amount == undefined || i.amount == ""){
        return parseFloat('0');
      }else{
        return parseFloat(i.amount)
      }
    });
    var sum1 = numbers1.reduce((a, b) => (a) + (b), 0);
    checked_bank_deposit_val = sum1.toFixed(2);

    if(checked_pending_deposit_val == checked_bank_deposit_val){
      if(pending_deposit_tbl_ck== 'checked' && bank_deposit_tbl_ck == 'checked'){
        $(".reconcile_button").removeAttr("disabled");
        $(".reconcile_button").removeClass("disabled");
      }else{
        $(".reconcile_button").attr("disabled","");
        $(".reconcile_button").addClass("disabled");
      }
    }else{
      $(".reconcile_button").attr("disabled","");
      $(".reconcile_button").addClass("disabled");
    }

  }

  open(trans_id,note) {
		const modalRef = this.modalService.open(PendingDepositPopupComponent, { size: 'lg' });
		modalRef.componentInstance.trans_id = trans_id;
		modalRef.componentInstance.note = note;
	}

}
