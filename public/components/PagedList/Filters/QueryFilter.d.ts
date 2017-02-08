import '../../../utils/appService';
import { IFilter } from '../../../interfaces';
export interface IQueryFilter extends IFilter {
    placeholder: Array<string>;
}
export declare function QueryFilter({label, placeholder, fields, paramName}: IQueryFilter, {}: {}): JSX.Element;
