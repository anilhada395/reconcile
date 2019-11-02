import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/service/auth.service';
import { HelperService } from '../core/service/helper.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { EditComponent } from '../edit/edit.component';
import { ConstantService } from '../core/service/constant.service';

import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	dtOptions: DataTables.Settings = {};
	usersData: any;
	dtTrigger: Subject<any> = new Subject<any>();
	edituserData:Array<any> = [];
	usersRole: any;
	length:any;
	
	constructor(
		private modalService: NgbModal,
		private helperSvc: HelperService,
		private authSvc: AuthService,
		private router: Router, 
		private http: Http,
		private constantSvc: ConstantService,
	) { }
	
	
	ngOnInit(): void{
		var role = atob(this.helperSvc.lsGetItem('USER-ROLE'));
      	if(role == '1'){
			this.showUserDataTable();
		}else{
			this.router.navigate(['/home']);
		}
		
		

	}
	
	showUserDataTable(){
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
		};
		this.authSvc.showUser().subscribe(
			res => {
				this.usersData = res.data;
				this.length = res.data.length;
				this.dtTrigger.next();
			}, err => console.log('error in show user function ', err)
			);
	}
	
	delete(userId) {
		if (confirm("Are you sure. You want to delete user.")) {
			this.authSvc.userDelete(this.constantSvc.APIConfig.DELETE+'/', userId).subscribe(
				res => {
					if (res.Status === 200) {
						this.helperSvc.notifySuccess('User deleted successfully');
						$( "#re_close" ).trigger( "click" );
						this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["users"])); 
						
					} else {
						console.log('there are something wrong.');
					}
				}, err => console.log('error in delete function ', err)
			);
		}
		return false;
		
	}

	open() {
		const modalRef = this.modalService.open(UserRegistrationComponent, { size: 'lg' });
		modalRef.componentInstance.name = 'World';
	}

	edit(editId) {
		this.authSvc.userRole().subscribe(
			res => {
				this.usersRole = res.data;
				this.authSvc.userEdit(this.constantSvc.APIConfig.EDITUSER+'/', editId).subscribe(
					res => {
						this.edituserData = res.data;
						const modalRef = this.modalService.open(EditComponent, { size: 'lg' });
						modalRef.componentInstance.editData =  this.edituserData;
						modalRef.componentInstance.usersRole =  this.usersRole;
					}, err => console.log('error in useredit function ', err)
				);	
			}, err => console.log('error in userrole function ', err)
		);

			
	}

	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}

	private extractData(res: Response) {
		const body = res.json();
		return body.data || {};
	}
}
