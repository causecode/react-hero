/// <reference types="react" />
import { IFilter } from '../../../interfaces';
export interface IQueryFilter extends IFilter {
    placeholder: string;
}
export declare function QueryFilter({placeholder, paramName}: IQueryFilter): JSX.Element;
