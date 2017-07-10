import { IFilter } from '../../../interfaces';
export interface IRangeFilterProps extends IFilter {
    paramNameFrom?: string;
    paramNameTo?: string;
}
export declare function RangeFilter({label, paramName, type, paramNameFrom, paramNameTo}: IRangeFilterProps): JSX.Element;
export declare function renderRangeFilter(paramName: string, type: string, formatter?: (value: any) => any, parser?: (value: string) => any): JSX.Element;
