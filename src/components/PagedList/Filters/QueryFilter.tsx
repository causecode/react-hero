import * as React from 'react';
import { Button, Grid, Row } from 'react-bootstrap';
import {IFilter} from "./IFilters";
import {capitalizeFirstLetter} from "../../../utils/AppService";

export interface IQueryFilter extends IFilter {
    fields: Array<string>;
}

export default function QueryFilter ({ label, fields, paramName }: IQueryFilter, {}) {

    let queryFields: string = fields.join(', ');
    label = label ? label : paramName;
    return (
        <div className="flex query-filter">
            <strong> { capitalizeFirstLetter(label) } </strong>
            <input type="text" placeholder={ queryFields }/>
        </div>
    );
}
