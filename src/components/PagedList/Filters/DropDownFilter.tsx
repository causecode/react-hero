import * as React from 'react';
import { Button, Grid, Row } from 'react-bootstrap';
import {IFilter} from "./IFilters";

export interface IDropDownFilter extends IFilter {
    possibleValues: Array<string>;
}

export default function DropDownFilter({ label, possibleValues }: IDropDownFilter, {}) {

    return (
        <div className="flex dropdown-filter">
            <section>
                <strong>{ label } </strong>
                <select>
                    { possibleValues.map(value => {
                        return (
                        <option key={possibleValues.indexOf(value)} value={value}>{value}</option>
                            );
                        })
                    }
                </select>
            </section>
        </div>
    );
}
