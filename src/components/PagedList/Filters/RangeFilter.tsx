import * as React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {IFilter} from "./IFilters";
import {capitalizeFirstLetter} from "../../../utils/AppService";

export default function RangeFilter({ label, paramName, fields }: IFilter, {}) {

    label = label ? label : paramName;
    return (
        <FormGroup>
            <ControlLabel>{ capitalizeFirstLetter(label) }</ControlLabel>
            <strong>From</strong>
            <FormControl type="text" {...fields[0]}/>

            <strong>To</strong>
            <FormControl type="text" {...fields[1]}/>
        </FormGroup>
    );
}
