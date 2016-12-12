import * as React from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import '../../../utils/appService';
import {IFilter} from '../../../interfaces';

export interface IDropDownFilter extends IFilter {
    possibleValues: Array<string>;
}

export function DropDownFilter({ label, paramName, possibleValues, fields }: IDropDownFilter, {}): JSX.Element {

    label = label ? label : paramName;
    // TODO Reset Dropdown.
    return (
        <FormGroup>
            <ControlLabel>{ label.capitalize() }</ControlLabel>
            <FormControl componentClass="select" {...fields[0]}>
                { possibleValues.map(value => {
                    return (
                    <option key={possibleValues.indexOf(value)} value={value}>{value}</option>
                        );
                    })
                }
            </FormControl>
        </FormGroup>
    );
}
