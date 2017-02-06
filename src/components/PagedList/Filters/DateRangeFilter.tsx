import * as React from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {IFilter} from '../../../interfaces';
import {renderRangeFilter} from './RangeFilter';

export function DateRangeFilter({label, paramName}: IFilter): JSX.Element {

    label = label || paramName;
    return (
        <FormGroup>
            <ControlLabel>{label.capitalize()}</ControlLabel>
            
            <strong>From</strong>
            {renderRangeFilter(`${paramName}From`, 'date')}
            
            <strong>To</strong>
            {renderRangeFilter(`${paramName}To`, 'date')}
        </FormGroup>
    );
}
