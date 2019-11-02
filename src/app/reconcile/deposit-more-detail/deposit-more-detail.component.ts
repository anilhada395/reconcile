import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deposit-more-detail',
  templateUrl: './deposit-more-detail.component.html',
  styleUrls: ['./deposit-more-detail.component.scss']
})
export class DepositMoreDetailComponent implements OnInit {

  name: any;
  amount: any;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
