import * as React from 'react';
import { Form, Button, Grid, Row } from 'react-bootstrap';
import {DatePicker} from '../../Widgets';
import {IFilter} from "./IFilters";
const ReduxForm = require<any>('redux-form');
import DropDownFilter from './DropDownFilter';
import fields from "../../Test/SimpleForm";

export interface IPagedListFiltersProps extends React.Props<any> {
    content?: JSX.Element;
    children?: JSX.Element | JSX.Element[];
    fields?: string[];
};

function FilterForm ({content , fields }:IPagedListFiltersProps) {
    const childrenWithProps = React.Children.map(content,
        (child: any) => {
            let paramName = child.props.paramName;
            let filterName = child.type.name;
            if (['RangeFilter', 'DateRangeFilter'].indexOf(filterName) !== -1) {
                return React.cloneElement(child, {
                    fields: [fields[`${paramName}From`], fields[`${paramName}To`]]
                })
            } else {
                return React.cloneElement(child, {
                    fields: [fields[child.props.paramName]]
                })
            }
        });

    return(
        <Form inline className="filter-form stick-left">
            {childrenWithProps}
            <Button className="filter-button" bsStyle="primary" type="submit">Submit</Button>
        </Form>
    )
}

let DynamicForm = ReduxForm.reduxForm({form: 'dynamic'})(FilterForm);

export function PagedListFilters ({ content, children }:IPagedListFiltersProps) {
    let filterProps = [];
    React.Children.forEach(children, (child: any) => {
        let paramName = child.props.paramName;
        let filterName = child.type.name;
        if (['RangeFilter', 'DateRangeFilter'].indexOf(filterName) !== -1) {
            filterProps.push(`${paramName}From`, `${paramName}To`);
        } else {
            filterProps.push(child.props.paramName);
        }
    });
    return (
        <div className="flex">
            <Button> { content || <i className="fa fa-filter" /> } </Button>
            <DynamicForm fields={filterProps} content={children}/>
        </div>
    );

}
