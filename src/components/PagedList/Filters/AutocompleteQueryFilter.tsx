import * as React from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {CSS, IFilter, IDropDownFilterData} from '../../../interfaces';
import {ReactSelect} from '../../common/ReactSelect';
const {Field} = require<any>('redux-form');

export interface IAutocompleteQueryFilter extends IFilter {
    multi?: boolean;
    options?: IDropDownFilterData[];
    onInputChange?: (value: string) => void;
    normalizer?: (value: any, previousValue: any, allValues: any, previousAllValues: any) => any;
    style?: CSS;
}

export function AutocompleteQueryFilter(props: IAutocompleteQueryFilter): JSX.Element {

    let label: string = props.label || props.paramName;
    return (
        <FormGroup>
            <ControlLabel>{label.capitalize()}</ControlLabel>
            <Field
                    {...props}
                    name={props.paramName}
                    normalize={props.normalizer || normalizer}
                    component={ReactSelect}
            />
        </FormGroup>
    );
}

export function normalizer(option: any, previousValue: any, allValues: any, previousAllValues: any): string|string[] {
    if (option && option.constructor === Array) {
        return option.map((item: IDropDownFilterData): string => {
            return item.value;
        });
    }

    if (option) {
        return option.value;
    }

    return '';
}
