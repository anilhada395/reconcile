import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { HelperService } from '../../core/service/helper.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantService } from '../../core/service/constant.service';
import { AddBankComponent } from '../../reconcile/add-bank/add-bank.component';
import { EditBankComponent } from '../../reconcile/edit-bank/edit-bank.component';

import { Http } from '@angular/http';
import { Subject } from 'rxjs';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
	dtOptions: DataTables.Settings = {};
	bankData: any;
	dtTrigger: Subject<any> = new Subject<any>();
	length:any;
	csvContent: string;
	parsedCsv: string[][];
	bank_id;
	bank_name;
	account_number;

	constructor(
		private modalService: NgbModal,
		private helperSvc: HelperService,
		private authSvc: AuthService,
		private router: Router, 
		private http: Http,
		private constantSvc: ConstantService,
	) { }

	ngOnInit() {
		this.showUserDataTable();
	}

	showUserDataTable(){
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10
		};

		this.authSvc.get_bank_data().subscribe(
		res => {
			console.log(" erererer");
			console.log(res);
			this.bankData = res.data_val;
			this.length = res.data_val.length;
			this.dtTrigger.next();
		}, err => console.log('error in show user function ', err)
		);
	}
  
	open() {
		const modalRef = this.modalService.open(AddBankComponent, { size: 'lg' });
		modalRef.componentInstance.name = 'World';
	}
  
	delete(userId) {
		if (confirm("Are you sure. You want to delete bank.")) {
			this.authSvc.bankDelete(this.constantSvc.APIConfig.DELETE_BANK+'/', userId).subscribe(
				res => {
					if (res.Status === 200) {
						this.helperSvc.notifySuccess('Bank deleted successfully');
						$( "#re_close" ).trigger( "click" );
						this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["bank"])); 
						
					} else {
						console.log('there are something wrong.');
					}
				}, err => console.log('error in delete function ', err)
			);
		}
		return false;
	}

	edit(editId) {
		this.authSvc.bankEdit(this.constantSvc.APIConfig.EDIT_BANK+'/', editId).subscribe(
			res => {
				const modalRef = this.modalService.open(EditBankComponent, { size: 'lg' });
				modalRef.componentInstance.editData =  res.data;
			}, err => console.log('error in useredit function ', err)
		);
	}

	onFileSelect(input: HTMLInputElement,bank_id,bank_name,account_number) {

	this.bank_id = bank_id;
	this.bank_name = bank_name;
	this.account_number = account_number;

	const files = input.files;
	var content = this.csvContent;    
		if (files && files.length) {
			const fileToRead = files[0];
			const fileReader = new FileReader();
			var csv = [];

			fileReader.onload = ((fileLoadedEvent) => {
				const csvSeparator = ',';
				const textFromFileLoaded = fileLoadedEvent.target['result'];
				const txt:any = textFromFileLoaded; 
				var row = [];
				var key = [];
				var key1 = [];
				const lines = txt.split('\n');

				
				if(bank_name == 'Plain State Bank'){
					lines.shift();
				}
				key = lines[0].split(',');

				console.log("key");
				console.log(key);
				
				var val;
				var val1;
				var i;


				lines.forEach(element => {
					const cols = element;

						if(bank_name == 'Plain State Bank'){
							var no_blank_value = element.replace(new RegExp(',,','g'), ', ,');

							if(no_blank_value.match("\".*\"")) {
								val = no_blank_value.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
							}else{
								val = cols.split(',');
							}
						}else{
							var no_blank_value = element.replace(new RegExp(',,','g'), ', ,');

							if(element.match("\".*\"")) {
								val = no_blank_value.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
							}else{
								val = cols.split(',');
							}
						}
					
					
					row.push(val)
				});

				for (i = 1; i < lines.length-1; i++) {
					var r = {};
						for (var j = 0; j < row[0].length; j++) {		
						r[row[0][j]] = row[i][j];

						}
						if(i != 0){
							csv.push(r);
						}
				}

				var csv_data = {"csv":csv,"bank_id":bank_id,"bank_name":bank_name,"account_number":account_number};

				console.log("csv_data");
				console.log(csv_data);

				this.authSvc.upload_file(this.constantSvc.APIConfig.UPLOAD_FILE, csv_data).subscribe((data:any)=>
				{
					this.helperSvc.notifySuccess('Csv upload successfully');
					$( "#re_close" ).trigger( "click" );
					this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["bank"])); 
				}
				);
			});
			
						
			fileReader.readAsText(fileToRead, "UTF-8");

			var csv_data = {"csv":csv,"bank_id":bank_id,"bank_name":bank_name};
		
		}
		if(csv_data){
			
		}
	}
}






//back up
// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../core/service/auth.service';
// import { HelperService } from '../../core/service/helper.service';
// import { Router } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ConstantService } from '../../core/service/constant.service';
// import { AddBankComponent } from '../../reconcile/add-bank/add-bank.component';
// import { EditBankComponent } from '../../reconcile/edit-bank/edit-bank.component';

// import { Http } from '@angular/http';
// import { Subject } from 'rxjs';
// import { TestBed } from '@angular/core/testing';

// @Component({
//   selector: 'app-bank',
//   templateUrl: './bank.component.html',
//   styleUrls: ['./bank.component.scss']
// })
// export class BankComponent implements OnInit {
// 	dtOptions: DataTables.Settings = {};
// 	bankData: any;
// 	dtTrigger: Subject<any> = new Subject<any>();
// 	length:any;
// 	csvContent: string;
// 	parsedCsv: string[][];
// 	bank_id;
// 	bank_name;
// 	account_number;

//   constructor(
//     private modalService: NgbModal,
// 	private helperSvc: HelperService,
// 	private authSvc: AuthService,
// 	private router: Router, 
// 	private http: Http,
// 	private constantSvc: ConstantService,


//   ) { }

//   ngOnInit() {
//     this.showUserDataTable();
//   }

//   showUserDataTable(){
// 		this.dtOptions = {
// 			pagingType: 'full_numbers',
// 			pageLength: 10
// 		};
// 		this.authSvc.get_bank_data().subscribe(
// 			res => {
// 				console.log(" erererer");
// 				console.log(res);
// 				this.bankData = res.data_val;
// 				this.length = res.data_val.length;
// 				this.dtTrigger.next();
// 			}, err => console.log('error in show user function ', err)
// 			);
//   }
  
//   open() {
// 		const modalRef = this.modalService.open(AddBankComponent, { size: 'lg' });
// 		modalRef.componentInstance.name = 'World';
//   }
  
//   delete(userId) {
// 		if (confirm("Are you sure. You want to delete bank.")) {
// 			this.authSvc.bankDelete(this.constantSvc.APIConfig.DELETE_BANK, userId).subscribe(
// 				res => {
// 					if (res.Status === 200) {
// 						this.helperSvc.notifySuccess('Bank deleted successfully');
// 						$( "#re_close" ).trigger( "click" );
// 						this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["bank"])); 
						
// 					} else {
// 						console.log('there are something wrong.');
// 					}
// 				}, err => console.log('error in delete function ', err)
// 			);
// 		}
// 		return false;
		
// 	}

// 	edit(editId) {
//     this.authSvc.bankEdit(this.constantSvc.APIConfig.EDIT_BANK, editId).subscribe(
//       res => {
//         const modalRef = this.modalService.open(EditBankComponent, { size: 'lg' });
//         modalRef.componentInstance.editData =  res.data;
//       }, err => console.log('error in useredit function ', err)
//     );
// 	 }

// 	onFileSelect(input: HTMLInputElement,bank_id,bank_name,account_number) {

// 	this.bank_id = bank_id;
// 	this.bank_name = bank_name;
// 	this.account_number = account_number;

// 	const files = input.files;
// 	var content = this.csvContent;    
// 		if (files && files.length) {
// 			const fileToRead = files[0];
// 			const fileReader = new FileReader();
// 			var csv = [];
// 			fileReader.onload = ((fileLoadedEvent) => {
// 				const csvSeparator = ',';
// 				const textFromFileLoaded = fileLoadedEvent.target['result'];
// 				const txt:any = textFromFileLoaded; 
// 				var row = [];
// 				var key = [];
// 				var key1 = [];
// 				const lines = txt.split('\n');

				
// 				// if(bank_name == 'Plain State Bank'){
// 				// 	lines.shift();
// 				// }
// 				key = lines[0].split(',');
				
// 				var val;
// 				var val1;
// 				var i;


// 				lines.forEach(element => {
// 					const cols = element;

					
// 						console.log(element);
// 						if(element.match("\".*\"")) {
// 							val = element.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
// 						}else{
// 							val = cols.split(',');
// 						}
					
					
// 					row.push(val)
// 				});

// 				for (i = 1; i < lines.length-1; i++) {
// 					var r = {};
// 						for (var j = 0; j < row[0].length; j++) {		
// 						r[row[0][j]] = row[i][j];

// 						}
// 						if(i != 0){
// 							csv.push(r);
// 						}
// 				}

// 				var csv_data = {"csv":csv,"bank_id":bank_id,"bank_name":bank_name,"account_number":account_number};

// 				console.log("csv_data");
// 				console.log(csv_data);

// 				this.authSvc.upload_file(this.constantSvc.APIConfig.UPLOAD_FILE, csv_data).subscribe((data:any)=>
// 				{
// 					this.helperSvc.notifySuccess('Csv upload successfully');
// 					$( "#re_close" ).trigger( "click" );
// 					this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["bank"])); 
// 				}
// 				);
// 			});
			
						
// 			fileReader.readAsText(fileToRead, "UTF-8");

// 			var csv_data = {"csv":csv,"bank_id":bank_id,"bank_name":bank_name};
		
// 		}
// 		if(csv_data){
			
// 		}
// 	}
// }
