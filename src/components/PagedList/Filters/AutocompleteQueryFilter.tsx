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

export function AutocompleteQueryFilter({
        label, paramName, options, onInputChange, style, normalizer
    }: IAutocompleteQueryFilter): JSX.Element {

    label = label || paramName;
    return (
        <FormGroup>
            <ControlLabel>{label.capitalize()}</ControlLabel>
            <Field 
                    name={paramName}
                    normalize={normalizer}
                    component={ReactSelect}
                    options={options}
                    onInputChange={onInputChange}
                    style={style}
            />
        </FormGroup>
    );
}
