import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
	
  public APIBaseURL = 'http://localhost:4545/';
  //public APIBaseURL = 'http://18.191.178.120:4545/'; 

  constructor() { }
  
  public APIConfig = {
    LOGIN: 'api/login',
    REGISTER: 'secureApi/signup',
    USERS: 'secureApi/getAllUsers',
    USERROLE: 'secureApi/getAllRoles',
    DELETE: 'secureApi/deleteUser',
    EDITUSER: 'secureApi/editUser', 
    UPDATEUSER: 'secureApi/updateUser',
    RESETPASS: 'api/forgetpassword',
    CHANGEPASS: 'api/forgetpasswordupdate',
    INTCCTDATA: 'secureApi/getIntcctData',
    IDMSDATA: 'secureApi/idmsData',
    DEPOSITDB: 'secureApi/getDepositdb',
    IDMSDB: 'secureApi/getIdmsdb',
    IDMSDATA_IN: 'secureApi/idmsData_in',
    DEPOSITDATA_IN: 'secureApi/depositLog_in',
    PENDINGDEPOSIT_IN: 'secureApi/pendingDeposit_in',
    GET_PENDING_DEPOSIT_DB: 'secureApi/getpendingDeposit',
    TRANSACTION_ID: 'secureApi/transaction_id',
    CO_PSB_BANK_IN: 'secureApi/co_psb_bank_in',
    DEPOSIT_RECONILED_IN: 'secureApi/deposit_reconciled_in',
    ALL_DEPOSIT_RECONILED_DB: 'secureApi/all_deposit_reconciled_db',
    RECONCILED_PENDING_DEPOSIT_DB: 'secureApi/reconciled_pending_deposit_db',
    PENDING_DEPOSIT_UPDATE: 'secureApi/pendingDeposit_update',
    ADD_VENDOR: 'secureApi/add_vendor',
    GET_VENDOR: 'secureApi/get_all_vendor_db',
    EDIT_VENDOR: 'secureApi/editVendor',
    UPDATE_VENDOR: 'secureApi/updateVendor',
    DELETE_VENDOR: 'secureApi/deleteVendor',
    ADD_BANK: 'secureApi/add_bank_in',
    GET_BANK_DATA: 'secureApi/add_bank_db',
    EDIT_BANK: 'secureApi/editBank',
    UPDATE_BANK: 'secureApi/updatebank',
    DELETE_BANK: 'secureApi/deleteBank',
    OUTGOING_BANK_IN: 'secureApi/psb_cc_in',
    GET_PSB_CC_BANK: 'secureApi/psb_cc_db', 
    TRANSFER_PSB_CC_BANK: 'secureApi/psb_cc_transfer', 
    GET_TRANSFER_DEPOSIT_LOG: 'secureApi/get_deposit_log_transfered', 
    FLAG_IN: 'secureApi/flag_in', 
    GET_FLAG_DB: 'secureApi/get_flag_db', 
    EDIT_FLAG: 'secureApi/editflag', 
    UPDATE_FLAG: 'secureApi/updateflag', 
    DELETE_FLAG: 'secureApi/deleteflag', 
    UPLOAD_FILE: 'secureApi/upload_file', 
    GET_PSB_CC_TRANSFER: 'secureApi/get_psb_cc_transfered', 
    ALL_BANK_DATA: 'secureApi/all_bank_data_db', 
    INTACCT_DATA_IN: 'secureApi/intacct_in', 
    GET_INTACCT_DATA: 'secureApi/get_intacct_db', 
    ADD_DEPOSIT_BANK_DATA: 'secureApi/deposit_bank_data_in', 
    GET_DEPOSIT_BANK_DATA: 'secureApi/get_deposit_bank_data_db', 
    ADD_DEPOSITLOG_BANK_DATA: 'secureApi/deposit_log_bank_data_in', 
    FLAGGED_BANK_DATA: 'secureApi/flagged_bank_data?',
    ALL_BANK_FLAG_UPDATE: 'secureApi/all_bank_flag_update',
    ALL_BANK_DATA_BY_ID: 'secureApi/all_bank_data_by_id',
    OUTGOING_BILL_INSERT: 'secureApi/outgoing_bill_insert',
    ADD_INCOMING_RECONCILED_VERIFIED: 'secureApi/incoming_reconciled_verified_in',
    GET_INCOMING_RECONCILED_VERIFIED: 'secureApi/get_incoming_reconciled_verified',
    GET_DEPOSIT_LOG: 'secureApi/get_deposit_log_data',
    EDIT_DPOSIT_LOG: 'secureApi/editDepositlog', 
    DELETE_DPOSIT_LOG: 'secureApi/deleteDposit_log', 
    UPDATE_DPOSIT_LOG_STATUS: 'secureApi/update_depositlog_status', 
    GET_INCOMEING_RECONCILED_DATA: 'secureApi/get_reconciled_incoming_data', 
    GET_RECONCILE_SETTING: 'secureApi/get_reconcile_setting',
    SETTING_UPDATE: 'secureApi/reconcile_setting',
    SEND_SMS: 'secureApi/send_sms',
    TWILLO_USERS: 'secureApi/get_twillo_users',
    GET_PD_DATA_BY_ID: 'secureApi/getpendingDeposit_by_id',
  };
}
