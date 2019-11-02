import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { HelperService } from '../../core/service/helper.service';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { ConstantService } from '../../core/service/constant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepositMoreDetailComponent } from '../deposit-more-detail/deposit-more-detail.component';
import { ShowFlagComponent } from '../../reconcile/show-flag/show-flag.component';
import { Subject } from 'rxjs'; 
const names = [];

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.scss'],
  providers: [DatePipe]
})
export class IncomingComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  length:any;
  dtOptions1: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject<any>();
  length1:any;
  data:any;
  
  bank_data:any;
  myDate = new Date();
  idmsData:any;
  private loading: boolean = false;

  deposit_log_totle:any;
  idms_totle_val='';
  Idmsdb='';
  both_checked='';
  user_role;
  row_count:any;
  twilloUsers:any;
  formControlValue = '';

  number = [];
  

  constructor(
    private http: HttpClient,
    private helperSvc: HelperService,
    private datePipe: DatePipe,
    private router: Router, 
    private authSvc: AuthService,
    private modalService: NgbModal,
    private constantSvc: ConstantService
  ) { }

  ngOnInit() {
    this.dtOptions1 = {
			paging: false,
			pagingType: 'full_numbers',
      pageLength: 10000,
      scrollY: "500px",
      scrollCollapse: true
    };

    this.helperSvc.loaderStart();
    var role = atob(this.helperSvc.lsGetItem('USER-ROLE'));
    if(role != '1'){
      this.user_role = "disabled";
    }
    this.loading = true;
    this.authSvc.get_all_bank_data('Chase').subscribe(
      res => {
        var deposit_result;

        this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.DEPOSITDB).subscribe(
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

            this.bank_data = deposit_result; 
            this.length1 = deposit_result.length;
				    this.dtTrigger1.next();

            // totle deposit log amount
            var deposit_numbers = deposit_result.map(i => {
              if(i.amount == undefined || i.amount == ""){
                return parseFloat('0');
              }else{
                return parseFloat(i.amount)
              }
            });
            var deposit_sum = deposit_numbers.reduce((a, b) => a + b, 0);
            this.deposit_log_totle = deposit_sum.toFixed(2);


          }
        );
      }, err => console.log('error in register function ', err)
    );
    
    // Idms data get
    this.idmsApiData();

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

  show_flag(flag_class,id){
    var flag_value;
    if (!$('.decheckbox'+flag_class).is(':checked')) { 
      flag_value = "close";
    } else {
      flag_value = "open";
    }

    if($(".decheckbox"+flag_class).prop("checked") == true){
      var flag_val = $(".deposit_tbl_new_flag"+flag_class).val();
      const modalRef = this.modalService.open(ShowFlagComponent, { size: 'lg' });
      modalRef.componentInstance.flag_class = flag_class;
      modalRef.componentInstance.flag_val = flag_val;
      modalRef.componentInstance.bank_data_id = id;
      modalRef.componentInstance.flag_value = flag_value;
    }else{
      var flag_val = $(".deposit_tbl_new_flag"+flag_class).val();
      const modalRef = this.modalService.open(ShowFlagComponent, { size: 'lg' });
      modalRef.componentInstance.flag_class = flag_class;
      modalRef.componentInstance.flag_val = flag_val;
      modalRef.componentInstance.bank_data_id = id;
      modalRef.componentInstance.flag_value = flag_value;
    }
  }

  deposit_more_details(name,amount){
    const modalRef = this.modalService.open(DepositMoreDetailComponent, { size: 'lg' });
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.amount = amount;
  }

  onSearchChange(searchValue: string): void { 
    this.chk_idms_click();
  }

  chk_idms_click(){
    var idms_tbl_ck;
    var deposit_tbl_ck;
    var row:any;
    var row1:any;
    var amount_edit = '';
    var amount_val = '';
    var amount_val1 = '';
    var description_val1;
    var data;
    var data2;
    var idms_data = [];
    var deposit_data = [];
    var idms_totle_val;
    var deposit_totle_val;

    $(".idms_tbl input[name=idms_tbl_checkbox]:checked").each(function () { 
      $(this).closest("tr").addClass("row_checked_bg");
      idms_tbl_ck = 'checked';
      row = $(this).closest("tr")[0];

      //select value from idms amount
      amount_edit = ''+$( this ).text( row.cells[4].innerHTML).val();
      amount_val = ''+$('.'+amount_edit).val();

      data = {"amount":amount_val};
      idms_data.push(data);
    });

    $(".idms_tbl input[name=idms_tbl_checkbox]:not(:checked)").each(function () {
      $(this).closest("tr").removeClass("row_checked_bg");
    });

    // totle idms amount
    var numbers = idms_data.map(i => {
              if(i.amount == undefined || i.amount == ""){
                return parseFloat('0');
              }else{
                return parseFloat(i.amount)
              }
            });
    var sum = numbers.reduce((a, b) => (a) + (b), 0);
    idms_totle_val = sum.toFixed(2);

    $(".deposit_tbl input[name=deposit_tbl_checkbox]:checked").each(function () {
      $(this).closest("tr").addClass("row_checked_bg");
      deposit_tbl_ck = 'checked';

      row1 = $(this).closest("tr")[0];
      amount_val1 = row1.cells[3].innerHTML;
      description_val1 = row1.cells[1].innerHTML;

      data2 = {"amount":amount_val1,"description":description_val1};
      deposit_data.push(data2);
    });

    $(".deposit_tbl input[name=deposit_tbl_checkbox]:not(:checked)").each(function () {
      $(this).closest("tr").removeClass("row_checked_bg");
    });

    var only_deposit_val = deposit_data.find(x => x.description === 'Deposit Log');
    var only_chase_bank_val = deposit_data.find(y => y.description === 'Chase');

    // totle idms amount
    var numbers1 = deposit_data.map(i => {
      if(i.amount == undefined || i.amount == ""){
        return parseFloat('0');
      }else{
        return parseFloat(i.amount)
      }
    });
    var sum1 = numbers1.reduce((a, b) => (a) + (b), 0);
    deposit_totle_val = sum1.toFixed(2);

    if(idms_totle_val == deposit_totle_val){
      if(idms_tbl_ck== 'checked' && deposit_tbl_ck == 'checked'){
        this.both_checked = idms_tbl_ck;
        if(only_deposit_val != undefined && only_chase_bank_val === undefined){
          $(".button_deposit_log").removeAttr("disabled");
          $(".button_deposit_log").removeClass("disabled");
        }
        
        if(only_chase_bank_val != undefined && only_deposit_val === undefined){
          $(".button_reconcile_verified").removeAttr("disabled");
          $(".button_reconcile_verified").removeClass("disabled");
        }
        
      }else{
        this.both_checked = '';
        $(".reconcile_button").attr("disabled","");
        $(".reconcile_button").addClass("disabled");
      }
    }else{
      $(".reconcile_button").attr("disabled","");
      $(".reconcile_button").addClass("disabled");
    }

    if(idms_tbl_ck != 'checked' && deposit_tbl_ck == 'checked'){
      $(".transfer_button").removeClass("disabled");
      $(".transfer_button").removeAttr("disabled");
    }else{
      $(".transfer_button").addClass("disabled");
      $(".transfer_button").attr("disabled","");
    }

  }

  onTransfer(){
    $(".transfer_button").attr("disabled","");
    $(".transfer_button").addClass("disabled");
    var note_value = $('.re_note').val();
    var row2:any;
    var flag_value;
    var flag_data;
    var source;
    var description;
    var amounts;
    var dates;
    var flag;
    var flag;
    var idms_id;
    var payment_type;
    var type;
    var deposit_data;
    var all_deposit_data = [];
    var transfer_deposit_totle_val;
    var after_reduce_deposit_amount;
    var user_name = atob(this.helperSvc.lsGetItem('USER-NAME'));

    $(".deposit_tbl input[name=deposit_tbl_checkbox]:checked").each(function () {
      row2 = $(this).closest("tr")[0]; 

      flag_value = ''+$( this ).text( row2.cells[5].innerHTML).val();
      if($('.'+flag_value).is(':checked')){  
        flag_data = 'checked'; 
      }else{
        flag_data = ''; 
      }

      //select value from idms amount
      source = row2.cells[1].innerHTML;
      description = row2.cells[2].innerHTML;
      amounts = row2.cells[3].innerHTML;
      dates = row2.cells[4].innerHTML;
      flag = flag_data; 
      idms_id = '';
      type = 'transfer';
      payment_type = row2.cells[5].innerHTML;

      deposit_data = {"source":source,"description":description,"amount":amounts,"date":dates,"payment_type":payment_type,"flag":flag, "idms_id":"", "type":type, "transfered_by":user_name,"note":note_value};

      all_deposit_data.push(deposit_data);
    });

    // totle idms amount
    var numbers = all_deposit_data.map(i => {
      if(i.amount == undefined || i.amount == ""){
        return parseFloat('0');
      }else{
        return parseFloat(i.amount)
      }
    });
    var sum = numbers.reduce((a, b) => (a) + (b), 0);
    transfer_deposit_totle_val = sum.toFixed(2);

    var x;
    var y =1;
    for (x = 0; x < all_deposit_data.length; x++) { 
      this.http.post(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.DEPOSITDATA_IN, all_deposit_data[x]).subscribe(
      res => {
        if(all_deposit_data.length == y){
          $(".deposit_tbl input[type=checkbox]:checked").each(function () {
            $(this).prop("checked", false);
            $(this).closest("tr").addClass("re_chk_hide"); 
          });
          after_reduce_deposit_amount = parseFloat(this.deposit_log_totle) - parseFloat(transfer_deposit_totle_val);
          this.deposit_log_totle = after_reduce_deposit_amount.toFixed(2);
          this.helperSvc.notifySuccess('Transfer successfully done');
          this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["incoming"]));
        }
        y++;
      });
    }
  }

  idmsApiData(){
    this.dtOptions = {
			paging: false,
			pagingType: 'full_numbers',
      pageLength: 10000,
      scrollY: "500px",
      scrollCollapse: true
    };
    
    let promise = new Promise((resolve, reject) => {
      let apiURL = this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.IDMSDATA;
      this.http.get<any>(apiURL)
        .toPromise()
        .then(
          res => { // Success
            if(res.Status == 200){
            var i;
            var idms_totle = 0;
            var new_data;
            var all_data=[];
            var amount_val;
            var a;
            var b;
            var result;
           
            this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.IDMSDB).subscribe(
              respo => {
                console.log(respo);
                function comparer(otherArray){
                  return function(current){
                    return otherArray.filter(function(other){
                      return other.Acct_ID == current['Acct ID'] && other.date == current['Post Date']
                    }).length == 0;
                  }
                }
                var onlyInA = res.data.filter(comparer(respo['data_val'])); 
                var onlyInB = respo['data_val'].filter(comparer(res.data));
  
                result = onlyInA.concat(onlyInB);

                this.idmsData = result;
                this.length = result.length;
				        this.dtTrigger.next();

                // totle idms amount
                var numbers = result.map(i => {
                  if(i.Amount == undefined || i.Amount == ""){
                    return parseFloat('0');
                  }else{
                    return parseFloat(i.Amount)
                  }
                });
                var sum = numbers.reduce((a, b) => (a) + (b), 0);
                this.idms_totle_val = sum.toFixed(2);

                $(".idms_loading_img").hide();
                this.helperSvc.loaderStop();
              }
            );
            resolve();
          } else {
            console.log('error');
            $(".idms_loading_img").hide();
            this.idmsData = '';
            this.length = 0;
				    this.dtTrigger.next();
            this.helperSvc.loaderStop();
            this.helperSvc.notifyError(res.data);
          }
          },
          msg => { // Error
            console.log('error');
            console.log(msg);
            this.helperSvc.loaderStop();
            this.helperSvc.notifyError('File Not Found');
          reject(msg);
          }
        );
    });
    return promise;  
  }

  onSubmit(submit_type) {
    $(".reconcile_button").attr("disabled","");

    var note_value = $('.re_note').val();
    var account_name ='';
    var date ='';
    var payment_form ='';
    var amount ='';
    var loan ='';
    var posted_by ='';
    var ref_comm ='';
    var Acct_ID ='';
    var amount_edit = '';
    var amount_val = '';
    var data;
    var idms_data = [];
    var row:any;
    var reduce_idms_amount;
    var after_reduce_amount;
    
    //Loop through all checked CheckBoxes in GridView.    
    $(".idms_tbl input[name=idms_tbl_checkbox]:checked").each(function () { 
      row = $(this).closest("tr")[0];

      //select value from idms amount
      amount_edit = ''+$( this ).text( row.cells[4].innerHTML).val();
      amount_val = ''+$('.'+amount_edit).val();

      account_name = row.cells[1].innerHTML;
      date = row.cells[2].innerHTML;
      payment_form = row.cells[3].innerHTML;
      amount = amount_val;
      loan = row.cells[5].innerHTML;
      posted_by = row.cells[6].innerHTML;
      ref_comm = row.cells[7].innerHTML;
      Acct_ID = row.cells[8].innerHTML;


      data = {"account_name":account_name,"date":date,"payment_form":payment_form,"amount":amount,"loan":loan, "posted_by":posted_by,"ref_comm":ref_comm,"Acct_ID":Acct_ID};

      idms_data.push(data);
    });

    // totle idms amount
    var idms_re_numbers = idms_data.map(i => {
      if(i.amount == undefined || i.amount == ""){
        return parseFloat('0');
      }else{
        return parseFloat(i.amount)
      }
    });
    var re_sum = idms_re_numbers.reduce((a, b) => (a) + (b), 0);

    reduce_idms_amount = re_sum.toFixed(2);
    after_reduce_amount = parseFloat(this.idms_totle_val) - parseFloat(reduce_idms_amount);
    this.idms_totle_val = after_reduce_amount.toFixed(2);

    var i;
    var j = 1;
    var insertId='';
    for (i = 0; i < idms_data.length; i++) { 
      this.http.post(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.IDMSDATA_IN, idms_data[i]).subscribe(
        res => {
          if(j==1){
          insertId += res['id'];
          }
          if(j>1){
            insertId += ','+res['id'];
          } 

          if(idms_data.length == j){
          //Loop through all checked CheckBoxes in GridView.
          var source;
          var description;
          var amounts;
          var dates;
          var flag;
          var idms_id;
          var deposit_data;
          var all_deposit_data = [];
          var row2:any;
          var flag_value;
          var flag_data;
          var reduce_deposit_amount;
          var after_reduce_deposit_amount;
          var type;
          var payment_type;
          var user_name = atob(this.helperSvc.lsGetItem('USER-NAME'));
          $(".deposit_tbl input[name=deposit_tbl_checkbox]:checked").each(function () {
            row2 = $(this).closest("tr")[0]; 

            flag_value = ''+$( this ).text( row2.cells[5].innerHTML).val();
            if($('.'+flag_value).is(':checked')){  
              flag_data = 'checked'; 
            }else{
              flag_data = ''; 
            }

            //select value from idms amount
            source = row2.cells[1].innerHTML;
            description = row2.cells[2].innerHTML;
            amounts = row2.cells[3].innerHTML;
            dates = row2.cells[4].innerHTML;
            payment_type = row2.cells[5].innerHTML;
            flag = flag_data; 
            idms_id = insertId;
            type = 'bank';

            deposit_data = {"source":source,"description":description,"amount":amounts,"date":dates,"payment_type":payment_type,"flag":flag, "idms_id":insertId, "type":type, "transfered_by":user_name};

            all_deposit_data.push(deposit_data);
          });

          // totle deposit log amount
          var deposit_re_numbers = all_deposit_data.map(i => {
            if(i.amount == undefined || i.amount == ""){
              return parseFloat('0');
            }else{
              return parseFloat(i.amount)
            }
          });
          var deposit_re_sum = deposit_re_numbers.reduce((a, b) => (a) + (b), 0);

          reduce_deposit_amount = deposit_re_sum.toFixed(2);
          after_reduce_deposit_amount = parseFloat(this.deposit_log_totle) - parseFloat(reduce_deposit_amount);

          this.deposit_log_totle = after_reduce_deposit_amount.toFixed(2);

            var x;
            var y = 1;
            var deposit_row=[];
            var pendingdeposit_data;
            var uniq_id;
            for (x = 0; x < all_deposit_data.length; x++) { 
              this.http.post(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.DEPOSITDATA_IN, all_deposit_data[x]).subscribe(
              res => {
                deposit_row.push(res['data'].ops[0]);

                if(all_deposit_data.length == y){
                  $(".idms_tbl input[type=checkbox]:checked").each(function () { 
                    $(this).prop("checked", false);
                    $(this).closest("tr").addClass("re_chk_hide");
                  });
    
                  $(".deposit_tbl input[type=checkbox]:checked").each(function () {
                    $(this).prop("checked", false);
                    $(this).closest("tr").addClass("re_chk_hide"); 
                  });

                  this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.TRANSACTION_ID).subscribe(
                    res => {
                      // // totle deposit log amount
                      var deposit_amt = all_deposit_data.map(i => {
                        if(i.amount == undefined || i.amount == ""){
                          return parseFloat('0');
                        }else{
                          return parseFloat(i.amount)
                        }
                      });
                      var deposit_sum_amt = deposit_amt.reduce((a, b) => a + b, 0);
                      var deposit_rco_totle = deposit_sum_amt.toFixed(2);
                      
                      var USERS_NAME = atob(this.helperSvc.lsGetItem('USER-NAME'));

                      var datetoday = new Date;
                      var datenow= (datetoday.getMonth()+1)+'/'+datetoday.getDate()+'/'+datetoday.getFullYear();

                      pendingdeposit_data = {"date":datenow,"transaction_id":res['data_val'],"user_id":USERS_NAME,"amount":deposit_rco_totle,"reconcile_data":deposit_row,"type":"","note":note_value};

                      if(submit_type == 'reconciled'){

                      this.http.post(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.PENDINGDEPOSIT_IN, pendingdeposit_data).subscribe(
                        res1 => {
                          console.log(res1); 

                        });

                      this.helperSvc.notifySuccess('Reconcile successfully done');

                      }else{
                        this.http.post(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.ADD_INCOMING_RECONCILED_VERIFIED, pendingdeposit_data).subscribe(
                          res2 => {
                            console.log("res2"); 
                            console.log(res2); 
                          });
    
                        this.helperSvc.notifySuccess('Reconcile verified successfully done');
                      }
                      $(".reconcile_button").attr("disabled","");
                      $(".reconcile_button").addClass("disabled");
                      this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["incoming"]));
                  }); 
                }
                y++;
              });
            }
          }
          j++;
        }, err => console.log('error in idms function ', err)
      );
    }
  }
}
