import { IGenericAction, IUserAction } from '../interfaces';
export declare function resetUserAction(): IGenericAction;
export declare function saveUserAction(action: string): IUserAction;
export declare function saveUserActionData(records: number): IUserAction;
