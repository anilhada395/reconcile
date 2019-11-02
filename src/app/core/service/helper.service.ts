import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

declare var NProgress: any;
NProgress.configure({ showSpinner: false });

@Injectable({
  providedIn: 'root'
})
export class HelperService {
	toastAnimate: any = 'slideFromTop';

	constructor(private _tosterService: ToastrManager) { }

	public lsSetItemSession(key, value) {
		return sessionStorage.setItem(key, JSON.stringify(value));
	}
	public lsGetItemSession(key) {
		return JSON.parse(sessionStorage.getItem(key));
	}
	public lsRemoveItemSession(key) {
		return sessionStorage.removeItem(key);
	}
	
	public lsSetItem(key, value) {
		return localStorage.setItem(key, JSON.stringify(value));
	}
	 public lsGetItem(key) {
		return JSON.parse(localStorage.getItem(key));
	}
	public lsRemoveItem(key) {
		return localStorage.removeItem(key);
	}
	public lsClear() {
		return localStorage.clear();
	}

	public loaderStart() {
	NProgress.start();
	}

	public loaderStop() {
	NProgress.done();
	}

	public notifySuccess(msg: string = null) {
	this._tosterService.successToastr(msg, '', {
	  animate: this.toastAnimate
	});
	}

	public notifyInfo(msg: string = null) {
	this._tosterService.infoToastr(msg, '', {
	  animate: this.toastAnimate
	});
	}

	public notifyWarnig(msg: string = null) {
	this._tosterService.warningToastr(msg, '', {
	  animate: this.toastAnimate
	});
	}

	public notifyError(msg: string = null) {
	this._tosterService.errorToastr(msg, '', {
	  animate: this.toastAnimate
	});
	}
}
