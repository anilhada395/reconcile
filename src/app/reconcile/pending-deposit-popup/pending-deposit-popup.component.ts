import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pending-deposit-popup',
  templateUrl: './pending-deposit-popup.component.html',
  styleUrls: ['./pending-deposit-popup.component.scss']
})
export class PendingDepositPopupComponent implements OnInit {

  trans_id: any;
  note:any;
  deposit_rco_totle;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    // // totle deposit log amount
    var deposit_amt = this.trans_id.map(i => {
      if(i.amount == undefined || i.amount == ""){
        return parseFloat('0');
      }else{
        return parseFloat(i.amount)
      }
    });
    var deposit_sum_amt = deposit_amt.reduce((a, b) => a + b, 0);
    this.deposit_rco_totle = deposit_sum_amt.toFixed(2);
  }

}
