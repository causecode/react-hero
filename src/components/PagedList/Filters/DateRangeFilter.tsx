import * as React from 'react';
import { Button, Grid, Row } from 'react-bootstrap';
import {DatePicker} from '../../Widgets';
import {IFilter} from "./IFilters";
import {capitalizeFirstLetter} from "../../../utils/AppService";

/*export interface IRangeFilter extends IFilter {
 type: 'integer' | 'date';
 }*/

export default function DateRangeFilter({ label, paramName }: IFilter, {}) {

	label = label ? label : paramName;
	return (
		<section>
			<strong>{ capitalizeFirstLetter(label) }</strong> <br/>
			<strong>From</strong>
			<DatePicker />
			<br/>
			<strong>To</strong>
			<DatePicker />
		</section>
	);
}
