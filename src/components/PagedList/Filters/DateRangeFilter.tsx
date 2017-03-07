import * as React from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {renderRangeFilter, IRangeFilterProps} from './RangeFilter';

export interface IDateRangeFilterProps extends IRangeFilterProps {
    formatter?: (value: any) => any;
    parser?: (value: string) => any;
}

export function DateRangeFilter(
        {label, paramName, paramNameFrom, paramNameTo, formatter, parser}: IDateRangeFilterProps): JSX.Element {

    label = label || paramName;

    return (
        <FormGroup>
            <ControlLabel>{label.capitalize()}</ControlLabel>

            <strong>From</strong>
            {renderRangeFilter(paramNameFrom || `${paramName}From`, 'date', formatter, parser)}

            <strong>To</strong>
            {renderRangeFilter(paramNameTo || `${paramName}From`, 'date', formatter, parser)}

        </FormGroup>
    );
}
