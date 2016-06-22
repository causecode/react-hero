import * as React from 'react';
import { Button, Grid, Row, FormControl } from 'react-bootstrap';
import {IFilter} from "./IFilters";
import {capitalizeFirstLetter} from "../../../utils/AppService";

export default function RangeFilter({ label, paramName }: IFilter, {}) {

    label = label ? label : paramName;
    return (
        <section>
            <strong>{ capitalizeFirstLetter(label) }</strong> <br/>
            <strong>From</strong>
            <FormControl type="text" />
            <br/>
            <strong>To</strong>
            <FormControl type="text" />
        </section>
    );
}
