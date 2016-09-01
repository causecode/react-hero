import * as React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import '../../../utils/appService';
import {IFilter} from '../../../interfaces/interfaces';

export function DateRangeFilter({ label, paramName, fields }: IFilter, {}): JSX.Element {

    label = label ? label : paramName;
    return (
        <FormGroup>
            <ControlLabel>{ label.capitalize() }</ControlLabel>
            <strong>From</strong>
            <FormControl type="date" {...fields[0]}/>
            <strong>To</strong>
            <FormControl type="date" {...fields[1]}/>
        </FormGroup>
    );
}
