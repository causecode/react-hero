import { IUserAction, IGenericAction } from '../interfaces';
export declare function toggleCheckbox(type: string, id: number): IUserAction;
export declare function selectAllRecords(type: string, checked: boolean): IUserAction;
export declare function resetCheckboxState(): IGenericAction;
