import * as React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {IFilter} from './IFilters';
import '../../../utils/appService';

export interface IDropDownFilter extends IFilter {
    possibleValues: Array<string>;
}

export default function DropDownFilter({ label, paramName, possibleValues, fields }: IDropDownFilter, {}) {

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
