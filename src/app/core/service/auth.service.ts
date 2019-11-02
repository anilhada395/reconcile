import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HelperService } from './helper.service';
import { ConstantService } from './constant.service';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

	constructor(
		private http: HttpClient,
		private helperSvc: HelperService,
		private router: Router,
		private constantSvc: ConstantService
	) { 
		this.currentUserSubject = new BehaviorSubject<any>(this.helperSvc.lsGetItem('TOKEN'));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): any {
		return this.currentUserSubject.value;
	  }
	
	register(url, data): Observable<any> {
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+url,data).subscribe(
			res => {
			  observer.next(res);
			  observer.complete();
			}, err => {
			  observer.complete();
			}
			);
		});
	}

	login(url, data) {
		return this.http.post<any>(this.constantSvc.APIBaseURL+url, data)
		  .pipe(map(user => {
			if (user && user.token) {
			  this.helperSvc.lsSetItem('TOKEN', user.token);
			  this.currentUserSubject.next(user.token);
			}
			return user;
		  }));
	  }

	  userRole(){
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.USERROLE).subscribe(usersRole => {
				observer.next(usersRole);
			    observer.complete();
			});
		});
	}

	get_transfer_deposit_log(){
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_TRANSFER_DEPOSIT_LOG).subscribe(deposit_log_transfer => {
				observer.next(deposit_log_transfer);
			    observer.complete();
			});
		});
	}

	get_transfer_psb_cc(){
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_PSB_CC_TRANSFER).subscribe(psb_cc_transfer => {
				observer.next(psb_cc_transfer);
			    observer.complete();
			});
		});
	}

	get_vendor(){
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_VENDOR).subscribe(vendor => {
				observer.next(vendor);
			    observer.complete();
			});
		});
	}
	
	vendorEdit(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+url+data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	vendorUpdate(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+url,data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	vendorDelete(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+url+data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	upload_file(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+url,data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	add_deposit_log_data(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+url,data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	flag_in(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+url,data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	get_flag_db(){
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_FLAG_DB).subscribe(get_flag => {
				observer.next(get_flag);
			    observer.complete();
			});
		});
	}

	edit_flag(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+url+data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	delete_flag(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+url+data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	update_flag(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+url,data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	deposit_bank_data_in(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+url,data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	psb_cc_bank(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+url,data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	get_psb_cc_data(){
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_PSB_CC_BANK).subscribe(psb_cc => {
				observer.next(psb_cc);
			    observer.complete();
			});
		});
	}

	transfer_psb_cc_bank(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+url,data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	addBank(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+url,data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	get_bank_data(){
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_BANK_DATA).subscribe(vendor => {
				observer.next(vendor);
			    observer.complete();
			});
		});
	}

	get_all_bank_data(bank_name){
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.ALL_BANK_DATA+'/'+bank_name).subscribe(vendor => {
				observer.next(vendor);
			    observer.complete();
			});
		});
	}

	get_deposit_log(){
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_DEPOSIT_LOG).subscribe(vendor => {
				observer.next(vendor);
			    observer.complete();
			});
		});
	}

	bankEdit(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+url+data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	updateBank(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+url,data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	bankDelete(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+url+data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	showUser(){
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.USERS).subscribe(usersData => {
				observer.next(usersData);
			    observer.complete();
			});
		});
	}


	
	userEdit(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+url+data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	userDepositlog(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+url+data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	update(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+url,data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}
	
	userDelete(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+url+data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	resetPassword(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.put(this.constantSvc.APIBaseURL+url, data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	changePassword(url, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.put(this.constantSvc.APIBaseURL+url, data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	add_vendor(url, data): Observable<any> {
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+url,data).subscribe(
			res => {
			  observer.next(res);
			  observer.complete();
			}, err => {
			  observer.complete();
			}
			);
		});
	}

	all_bank_flag_update(id, data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.ALL_BANK_FLAG_UPDATE+'/'+id,data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	update_depositlog_status(): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.UPDATE_DPOSIT_LOG_STATUS,'').subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	flagged_bank_data(flag,bank_name){
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.FLAGGED_BANK_DATA+"flag="+flag+"&bank_name="+bank_name).subscribe(vendor => {
				observer.next(vendor);
			    observer.complete();
			});
		});
	}

	get_all_bank_data_by_id(bank_id){
	  return new Observable<any>((observer: Observer<any>) => {
		this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.ALL_BANK_DATA_BY_ID+'/'+bank_id).subscribe(vendor => {
			observer.next(vendor);
			observer.complete();
		});
	  });
	}
		
	outgoing_bill_insert(data): Observable<any>{ 
	   return new Observable<any>((observer: Observer<any>) => {
		this.http.post(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.OUTGOING_BILL_INSERT,data).subscribe(
		res => {
		observer.next(res);
		observer.complete();
		}, err => {
		observer.complete(); 
		}); 
		});
	}

	get_reconcile_setting(){
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.GET_RECONCILE_SETTING).subscribe(usersData => {
				observer.next(usersData);
			    observer.complete();
			});
		});
	}

	setting_update(data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.SETTING_UPDATE,data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	send_sms(data): Observable<any>{
		return new Observable<any>((observer: Observer<any>) => {
			this.http.post(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.SEND_SMS,data).subscribe(
			res => {
				observer.next(res);
				observer.complete();
			}, err => {
				observer.complete();
			});
		});
	}

	get_twillo_users(name){
		return new Observable<any>((observer: Observer<any>) => {
			this.http.get(this.constantSvc.APIBaseURL+this.constantSvc.APIConfig.TWILLO_USERS+'/'+name).subscribe(usersData => {
				observer.next(usersData);
			    observer.complete();
			});
		});
	}
	
	logout() {
		// remove user from local storage to log user out
		this.helperSvc.lsRemoveItemSession('login');
		this.helperSvc.lsRemoveItem('USER-INFO');
		this.helperSvc.lsRemoveItem('USER-ROLE');
		this.helperSvc.lsRemoveItem('TOKEN');
		this.currentUserSubject.next(null);
		this.helperSvc.notifySuccess('Sesssion successfully destroyed!');
		this.router.navigate(['/home']);
	}
}
