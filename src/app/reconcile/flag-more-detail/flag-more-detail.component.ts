import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flag-more-detail',
  templateUrl: './flag-more-detail.component.html',
  styleUrls: ['./flag-more-detail.component.scss']
})
export class FlagMoreDetailComponent implements OnInit {

  note: any;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
