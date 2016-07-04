import * as React from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {DatePicker} from '../../Widgets';
import {IFilter} from './IFilters';
import '../../../utils/appService';

export default function DateRangeFilter({ label, paramName, fields }: IFilter, {}) {

    label = label ? label : paramName;
    return (
        <FormGroup>
            <ControlLabel>{ label.capitalize() }</ControlLabel>
            <strong>From</strong>
            <DatePicker fields={fields[0]}/>
            <strong>To</strong>
            <DatePicker fields={fields[1]}/>
        </FormGroup>
    );
}
