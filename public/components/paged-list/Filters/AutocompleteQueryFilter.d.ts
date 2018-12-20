/// <reference types="react" />
import { CSS, IFilter, IDropDownFilterData } from '../../../interfaces';
export interface IAutocompleteQueryFilter extends IFilter {
    multi?: boolean;
    options?: IDropDownFilterData[];
    onInputChange?: (value: string) => void;
    normalizer?: (value: any, previousValue: any, allValues: any, previousAllValues: any) => any;
    style?: CSS;
}
export declare function AutocompleteQueryFilter(props: IAutocompleteQueryFilter): JSX.Element;
export declare function normalizer(option: any, previousValue: any, allValues: any, previousAllValues: any): string | string[];
