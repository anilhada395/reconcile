import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reconciled-popup',
  templateUrl: './reconciled-popup.component.html',
  styleUrls: ['./reconciled-popup.component.scss']
})
export class ReconciledPopupComponent implements OnInit {
  title:any;
  note:any;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

}
