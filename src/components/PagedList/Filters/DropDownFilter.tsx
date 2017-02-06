import * as React from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {IFilter, IDropDownFilterData} from '../../../interfaces';
import {DropDownSelect} from './DropDownSelect';
const Field = require<any>('redux-form').Field;

export interface IDropDownFilter extends IFilter {
    possibleValues?: IDropDownFilterData[];
}

export function DropDownFilter({label, paramName, possibleValues}: IDropDownFilter): JSX.Element {

    label = label || paramName;
    return (
        <FormGroup>
            <ControlLabel>{label.capitalize()}</ControlLabel>
            <Field 
                    name={paramName}
                    component={DropDownSelect}
                    possibleValues={possibleValues}
            />
        </FormGroup>
    );
}
