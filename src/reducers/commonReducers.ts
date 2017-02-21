import {IAlertAction, IAlertType} from '../interfaces';

let ALERT_INITIAL_STATE: IAlertType = {show: false, type: '', message: ''};

export function commonAlertReducer(state: IAlertType = ALERT_INITIAL_STATE, action: IAlertAction): IAlertType {
    switch (action.type) {
        case 'SHOW_ALERT':
            return {show: true, type: action.payload.alertType, message: action.payload.alertMessage};
        
        case 'HIDE_ALERT': 
            return {show: false, type: '', message: ''};
        
        default: 
            return state;
    }
};

let MODAL_INITIAL_STATE: boolean = false;

export function commonModalReducer(state: boolean = MODAL_INITIAL_STATE, action) {
    switch (action.type) {
        case 'SHOW_CONFIRMATION_MODAL': 
            return true;
        
        case 'HIDE_CONFIRMATION_MODAL': 
            return false;
        
        default: 
            return state;
    }
};
