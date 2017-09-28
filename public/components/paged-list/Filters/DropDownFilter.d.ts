/// <reference types="react" />
import { IFilter, IDropDownFilterData } from '../../../interfaces';
export interface IDropDownFilter extends IFilter {
    possibleValues?: IDropDownFilterData[];
}
export declare function DropDownFilter({label, paramName, possibleValues}: IDropDownFilter): JSX.Element;
