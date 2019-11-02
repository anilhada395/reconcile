import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantService } from '../../core/service/constant.service';
import { HelperService } from '../../core/service/helper.service';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutgoingBillComponent } from '../../reconcile/outgoing-bill/outgoing-bill.component';
import { ShowOutgoingFlagComponent } from '../../reconcile/show-outgoing-flag/show-outgoing-flag.component';

const names = [];

@Component({
  selector: 'app-outgoing',
  templateUrl: './outgoing.component.html',
  styleUrls: ['./outgoing.component.scss']
})
export class OutgoingComponent implements OnInit {

  intcctData;
  intact_total_amount;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  length: any;
  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject<any>();
  length1: any;
  data_not_found;
  outgoing_data_val;
  both_checked;
  outgoing_totle;
  outgoing_totle_val;
  formControlValue = '';


  intacct_data_total;

  constructor(
    private http: HttpClient,
    private helperSvc: HelperService,
    private constantSvc: ConstantService,
    private authSvc: AuthService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.helperSvc.loaderStart();
    this.psb_cc_data();

    this.refIntacct();

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

  psb_cc_data() {
    this.dtOptions1 = {
      paging: false,
      pagingType: 'full_numbers',
      pageLength: 10000,
      scrollY: "500px",
      scrollCollapse: true
    };

    this.authSvc.get_all_bank_data('Plain State Bank').subscribe(
      res => {
        var outgoing_result;

        this.authSvc.get_psb_cc_data().subscribe(
          respo => {
            function comparer(otherArray) {
              return function (current) {
                return otherArray.filter(function (other) {
                  return other.description == current['description'] && other.amount == current['amount']
                }).length == 0;
              }
            }
            var onlyInA = respo['data_val'].filter(comparer(res['data']));
            var onlyInB = res['data'].filter(comparer(respo['data_val']));

            outgoing_result = onlyInA.concat(onlyInB);

            this.outgoing_data_val = outgoing_result;
            this.length1 = outgoing_result.length;
            this.dtTrigger1.next();

            // // totle deposit log amount
            var outgoing_numbers = outgoing_result.map(i => {
              if (i.amount == undefined || i.amount == "") {
                return parseFloat('0');
              } else {
                return parseFloat(i.amount)
              }
            });
            var outgoing_sum = outgoing_numbers.reduce((a, b) => a + b, 0);
            this.outgoing_totle = outgoing_sum.toFixed(2);

          });
      }, err => console.log('error in function ', err)
    );
  }

  outgoing_flag(id) {

    // var flag_val = $(".deposit_tbl_new_flag"+flag_class).val();

    this.authSvc.get_all_bank_data_by_id(id).subscribe(
      res => {
        const modalRef = this.modalService.open(OutgoingBillComponent, { size: 'lg' });
        modalRef.componentInstance.psb_data = res.data;
      })
  }

  show_flag(flag_class, id) {
    var flag_value;
    if (!$('.decheckbox' + flag_class).is(':checked')) {
      flag_value = "close";
    } else {
      flag_value = "open";
    }

    if ($(".decheckbox" + flag_class).prop("checked") == true) {
      var flag_val = $(".deposit_tbl_new_flag" + flag_class).val();
      const modalRef = this.modalService.open(ShowOutgoingFlagComponent, { size: 'lg' });
      modalRef.componentInstance.flag_class = flag_class;
      modalRef.componentInstance.flag_val = flag_val;
      modalRef.componentInstance.bank_data_id = id;
      modalRef.componentInstance.flag_value = flag_value;
    } else {
      var flag_val = $(".deposit_tbl_new_flag" + flag_class).val();
      const modalRef = this.modalService.open(ShowOutgoingFlagComponent, { size: 'lg' });
      modalRef.componentInstance.flag_class = flag_class;
      modalRef.componentInstance.flag_val = flag_val;
      modalRef.componentInstance.bank_data_id = id;
      modalRef.componentInstance.flag_value = flag_value;
    }
  }

  chk_both_tbl_click() {
    var row: any;
    var row1: any;
    var psb_cc_tbl_ck;
    var amount_val;
    var amount_val1;
    var data;
    var data2;
    var psb_cc_data = [];
    var outgoing_totle_val;
    var intcct_tbl_chk;
    var intcct_data = [];
    var intcct_totle_val;

    $(".psb_cc_tbl input[name=psb_cc_tbl_chk]:checked").each(function () {
      $(this).closest("tr").addClass("row_checked_bg");
      psb_cc_tbl_ck = 'checked';
      row = $(this).closest("tr")[0];

      //select value from psb and cc amount
      amount_val = row.cells[4].innerHTML;

      data = { "amount": amount_val };
      psb_cc_data.push(data);
    });
    $(".psb_cc_tbl input[name=psb_cc_tbl_chk]:not(:checked)").each(function () {

      $(this).closest("tr").removeClass("row_checked_bg");

    });

    // totle psb and cc amount
    var numbers = psb_cc_data.map(i => {
      if (i.amount == undefined || i.amount == "") {
        return parseFloat('0');
      } else {
        return parseFloat(i.amount)
      }
    });
    var sum = numbers.reduce((a, b) => (a) + (b), 0);
    outgoing_totle_val = sum.toFixed(2);

    $(".intcct_tbl input[name=intcct_tbl_chk]:checked").each(function () {
      $(this).closest("tr").addClass("row_checked_bg");
      intcct_tbl_chk = 'checked';

      row1 = $(this).closest("tr")[0];
      amount_val1 = row1.cells[3].innerHTML;

      data2 = { "amount": amount_val1 };
      intcct_data.push(data2);

    });
    $(".intcct_tbl input[name=intcct_tbl_chk]:not(:checked)").each(function () {

      $(this).closest("tr").removeClass("row_checked_bg");

    });

    // totle idms amount
    var numbers1 = intcct_data.map(i => {
      if (i.amount == undefined || i.amount == "") {
        return parseFloat('0');
      } else {
        return parseFloat(i.amount)
      }
    });
    var sum1 = numbers1.reduce((a, b) => (a) + (b), 0);
    intcct_totle_val = sum1.toFixed(2);

    if (intcct_totle_val == outgoing_totle_val) {
      if (intcct_tbl_chk == 'checked' && psb_cc_tbl_ck == 'checked') {
        this.both_checked = intcct_tbl_chk;
        $(".reconcile_button").removeAttr("disabled");
        $(".reconcile_button").removeClass("disabled");
      } else {
        this.both_checked = '';
        $(".reconcile_button").attr("disabled", "");
        $(".reconcile_button").addClass("disabled");
      }
    } else {
      $(".reconcile_button").attr("disabled", "");
      $(".reconcile_button").addClass("disabled");
    }



    if (psb_cc_tbl_ck == 'checked' && intcct_tbl_chk != 'checked') {
      $(".transfer_button").removeClass("disabled");
      $(".transfer_button").removeAttr("disabled");
    } else {
      $(".transfer_button").addClass("disabled");
      $(".transfer_button").attr("disabled", "");
    }

  }

  onTransfer() {
    $(".transfer_button").attr("disabled", "");
    $(".transfer_button").addClass("disabled");
    var note_value = $('.re_note').val();
    var row: any;
    var date;
    var bank;
    var description;
    var amount;
    var flag;
    var type;
    var psb_cc_data;
    var all_psb_cc_data = [];
    var id;
    var USER_NAME = atob(this.helperSvc.lsGetItem('USER-NAME'));

    $(".psb_cc_tbl input[name=psb_cc_tbl_chk]:checked").each(function () {
      row = $(this).closest("tr")[0];

      //select value from idms amount
      date = row.cells[1].innerHTML;
      bank = row.cells[2].innerHTML;
      description = row.cells[3].innerHTML;
      amount = row.cells[4].innerHTML;
      flag = row.cells[5].innerHTML;
      type = 'transfer';
      id = row.cells[6].innerHTML;

      psb_cc_data = { "id": id, "date": date, "bank": bank, "description": description, "amount": amount, "type": type, "transfered_by": USER_NAME, "note": note_value };

      all_psb_cc_data.push(psb_cc_data);
    });

    var x;
    var y = 1;
    for (x = 0; x < all_psb_cc_data.length; x++) {
      this.authSvc.transfer_psb_cc_bank(this.constantSvc.APIConfig.TRANSFER_PSB_CC_BANK, all_psb_cc_data[x]).subscribe(
        res => {
          if (all_psb_cc_data.length == y) {
            $(".psb_cc_tbl input[type=checkbox]:checked").each(function () {
              $(this).prop("checked", false);
              $(this).closest("tr").addClass("re_chk_hide");
            });
            // after_reduce_deposit_amount = parseFloat(this.deposit_log_totle) - parseFloat(transfer_deposit_totle_val);
            // this.deposit_log_totle = after_reduce_deposit_amount.toFixed(2);
            this.helperSvc.notifySuccess('Transfer successfully done');
            this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => this.router.navigate(["outgoing"]));
          }
          y++;
        });
    }


  }

  refIntacct() {
    var intacct_data;
    this.dtOptions = {
      paging: false,
      pagingType: 'full_numbers',
      pageLength: 10000,
      scrollY: "500px",
      scrollCollapse: true,
      destroy: true,
      retrieve: true,
    };

    $(".ref_loding").addClass("loading");
    let promise = new Promise((resolve, reject) => {
      let apiURL = this.constantSvc.APIBaseURL + this.constantSvc.APIConfig.INTCCTDATA;
      this.http.post<any>(apiURL, '')
        .toPromise()
        .then(
          res => { // Success
            var sender_status = res.data.response.control[0].status[0]
            var authenticate_status = res.data.response.operation[0].authentication[0].status[0]
            if (sender_status == 'success' && authenticate_status == 'success') {
              var intacct_result;
              intacct_data = res['data'].response.operation[0].result[0].data[0].apbill;
              //this.intcctData = intacct_data;

              var x;
              var intacct_new_formate;
              var intacct_new_val = [];


              if (intacct_data != undefined) {
                for (x = 0; x < intacct_data.length; x++) {
                  intacct_new_formate = { "date": intacct_data[x].WHENCREATED[0], "vendor": intacct_data[x].VENDORNAME[0], "amount": intacct_data[x].TOTALPAID[0] };

                  intacct_new_val.push(intacct_new_formate);
                }

                this.http.get(this.constantSvc.APIBaseURL + this.constantSvc.APIConfig.GET_INTACCT_DATA).subscribe(
                  respo => {
                    function comparer(otherArray) {
                      return function (current) {
                        return otherArray.filter(function (other) {
                          return other['vendor'] == current['vendor'] && other['amount'] == current['amount']
                        }).length == 0;
                      }
                    }
                    var onlyInA = respo['data_val'].filter(comparer(intacct_new_val));
                    var onlyInB = intacct_new_val.filter(comparer(respo['data_val']));

                    intacct_result = onlyInA.concat(onlyInB);
                    this.intcctData = intacct_result;
                    this.length = intacct_result.length;
                    this.dtTrigger.next();

                    // // totle deposit log amount
                    var new_intacct_numbers = intacct_result.map(i => {
                      if (i.amount == undefined || i.amount == "") {
                        return parseFloat('0');
                      } else {
                        return parseFloat(i.amount)
                      }
                    });
                    var new_intacct_sum = new_intacct_numbers.reduce((a, b) => a + b, 0);
                    this.intact_total_amount = new_intacct_sum.toFixed(2);

                    $(".ref_loding").removeClass("loading");

                  });
              } else {
                this.intcctData = '';
                this.length = 0;
                this.dtTrigger.next();
                $(".ref_loding").removeClass("loading");
              }
              this.helperSvc.loaderStop();
            } else {
              this.intcctData = '';
              this.length = 0;
              this.dtTrigger.next();
              $(".ref_loding").removeClass("loading");
              this.helperSvc.loaderStop();
              this.helperSvc.notifyError('Intacct connection failed! check your credentials');
            }
          });
    });
  }

  onSubmit() {
    $(".reconcile_button").attr("disabled", "");

    var note_value = $('.re_note').val();
    var date = '';
    var bank = '';
    var amount = '';
    var description = '';
    var flag = '';
    var posted_by = '';
    var ref_comm = '';
    var Acct_ID = '';
    var amount_edit = '';
    var amount_val = '';
    var data;
    var bank_data = [];
    var row: any;
    var reduce_psb_cc_amount;
    var after_reduce_amount;

    //Loop through all checked CheckBoxes in GridView.    
    $(".psb_cc_tbl input[name=psb_cc_tbl_chk]:checked").each(function () {
      row = $(this).closest("tr")[0];

      //select value from idms amount
      date = row.cells[1].innerHTML;
      bank = row.cells[2].innerHTML;
      description = row.cells[3].innerHTML;
      amount = row.cells[4].innerHTML;
      flag = row.cells[5].innerHTML;


      data = { "date": date, "bank": bank, "description": description, "amount": amount };

      bank_data.push(data);
    });

    // // totle idms amount
    var psb_cc_re_numbers = bank_data.map(i => {
      if (i.amount == undefined || i.amount == "") {
        return parseFloat('0');
      } else {
        return parseFloat(i.amount)
      }
    });
    var re_sum = psb_cc_re_numbers.reduce((a, b) => (a) + (b), 0);

    reduce_psb_cc_amount = re_sum.toFixed(2);

    after_reduce_amount = parseFloat(this.outgoing_totle_val) - parseFloat(reduce_psb_cc_amount);
    this.outgoing_totle_val = after_reduce_amount.toFixed(2);

    var i;
    var j = 1;
    var insertId = '';
    for (i = 0; i < bank_data.length; i++) {
      this.http.post(this.constantSvc.APIBaseURL + this.constantSvc.APIConfig.OUTGOING_BANK_IN, bank_data[i]).subscribe(
        res => {
          if (j == 1) {
            insertId += res['data']['insertedId'];
          }
          if (j > 1) {
            insertId += ',' + res['data']['insertedId'];
          }

          if (bank_data.length == j) {
            //Loop through all checked CheckBoxes in GridView.
            // var source;
            // var description;
            var amounts;
            var dates;
            var vendor;
            var bank_id;
            // var flag;
            // var idms_id;
            var intacct_data;
            var all_intacct_data = [];
            var row2: any;
            // var flag_value;
            // var flag_data;
            var reduce_intacct_amount;
            var after_reduce_intacct_amount;
            var type;
            // var payment_type;
            var USER_NAME = atob(this.helperSvc.lsGetItem('USER-NAME'));
            $(".intcct_tbl input[name=intcct_tbl_chk]:checked").each(function () {
              row2 = $(this).closest("tr")[0];

              // flag_value = ''+$( this ).text( row2.cells[5].innerHTML).val();
              // if($('.'+flag_value).is(':checked')){  
              //   flag_data = 'checked'; 
              // }else{
              //   flag_data = ''; 
              // }

              //select value from intacct amount
              dates = row2.cells[1].innerHTML;
              vendor = row2.cells[2].innerHTML;
              amounts = row2.cells[3].innerHTML;
              bank_id = insertId;
              type = 'reconciled';

              intacct_data = { "date": dates, "vendor": vendor, "amount": amounts, "bank_id": bank_id, "type": type, "transfered_by": USER_NAME, "note": note_value };

              all_intacct_data.push(intacct_data);

            });


            // totle deposit log amount
            var intacct_re_numbers = all_intacct_data.map(i => {
              if (i.amount == undefined || i.amount == "") {
                return parseFloat('0');
              } else {
                return parseFloat(i.amount)
              }
            });
            var intacct_re_sum = intacct_re_numbers.reduce((a, b) => (a) + (b), 0);

            reduce_intacct_amount = intacct_re_sum.toFixed(2);

            after_reduce_intacct_amount = parseFloat(this.intacct_data_total) - parseFloat(reduce_intacct_amount);
            this.intact_total_amount = after_reduce_intacct_amount.toFixed(2);

            var x;
            var y = 1;
            var deposit_row = [];
            var pendingdeposit_data;
            var uniq_id;
            for (x = 0; x < all_intacct_data.length; x++) {
              this.http.post(this.constantSvc.APIBaseURL + this.constantSvc.APIConfig.INTACCT_DATA_IN, all_intacct_data[x]).subscribe(
                res => {
                  if (all_intacct_data.length == y) {
                    $(".intcct_tbl input[type=checkbox]:checked").each(function () {
                      $(this).prop("checked", false);
                      $(this).closest("tr").addClass("re_chk_hide");
                    });

                    $(".psb_cc_tbl input[type=checkbox]:checked").each(function () {
                      $(this).prop("checked", false);
                      $(this).closest("tr").addClass("re_chk_hide");
                    });

                    this.helperSvc.notifySuccess('Reconcile successfully done');
                    $(".reconcile_button").attr("disabled", "");
                    $(".reconcile_button").addClass("disabled");

                    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => this.router.navigate(["outgoing"]));
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
