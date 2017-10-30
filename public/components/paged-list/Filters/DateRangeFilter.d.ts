/// <reference types="react" />
import { IRangeFilterProps } from './RangeFilter';
export interface IDateRangeFilterProps extends IRangeFilterProps {
    formatter?: (value: any) => any;
    parser?: (value: string) => any;
}
export declare function DateRangeFilter({label, paramName, paramNameFrom, paramNameTo, formatter, parser}: IDateRangeFilterProps): JSX.Element;
