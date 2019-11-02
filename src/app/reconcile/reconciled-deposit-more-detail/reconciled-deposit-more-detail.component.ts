import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantService } from '../../core/service/constant.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reconciled-deposit-more-detail',
  templateUrl: './reconciled-deposit-more-detail.component.html',
  styleUrls: ['./reconciled-deposit-more-detail.component.scss']
})
export class ReconciledDepositMoreDetailComponent implements OnInit {

  reconciled_pending_deposit_details:any;
  data:any;
  note:any;
  reconcile_data = [];
  reconcile_data1;
  loading_img;

  constructor(
    public activeModal: NgbActiveModal,
    private http: HttpClient,
    private constantSvc: ConstantService
    ) { }

  ngOnInit() {
    var ids = this.data;
    var all_data = [];
    if (ids.indexOf(',') > -1) { 
      var multiple_ids = ids.split(',');
    }else{
      var single_id = ids;
    }
    if(multiple_ids){
      var x = 1;
      var loop_length = multiple_ids.length;
      multiple_ids.forEach(element => {
        this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_PD_DATA_BY_ID+'/'+element).subscribe(
          res => {
            if(res['data'].reconcile_data.length > 1){
              res['data'].reconcile_data.forEach(row => {
                all_data.push(row);
              });

            }else{
              all_data.push(res['data'].reconcile_data[0]);
            }
              this.reconcile_data = all_data;         
          }
        );
        x++;
      });

    }else{
      this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_PD_DATA_BY_ID+'/'+single_id).subscribe(
        res => {
          if(res['data'].reconcile_data.length > 1){
            res['data'].reconcile_data.forEach(row => {
              all_data.push(row);
            });
            this.reconcile_data = all_data;

          }else{
            all_data = res['data'].reconcile_data[0];
            this.reconcile_data1 = all_data;
          }
        }
      );
    }
  }

}
