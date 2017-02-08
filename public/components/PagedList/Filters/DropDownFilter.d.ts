import '../../../utils/appService';
import { IFilter } from '../../../interfaces';
export interface IDropDownFilter extends IFilter {
    possibleValues: Array<string>;
}
export declare function DropDownFilter({label, paramName, possibleValues, fields}: IDropDownFilter, {}: {}): JSX.Element;
