import * as React from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {renderRangeFilter, IRangeFilter} from './RangeFilter';

export function DateRangeFilter({label, paramName, paramNameFrom, paramNameTo}: IRangeFilter): JSX.Element {

    label = label || paramName;
    
    return (
        <FormGroup>
            <ControlLabel>{label.capitalize()}</ControlLabel>
            
            <strong>From</strong>
            {renderRangeFilter(paramNameFrom || `${paramName}From`, 'date')}
            
            <strong>To</strong>
            {renderRangeFilter(paramNameTo || `${paramName}To`, 'date')}
        </FormGroup>
    );
}
