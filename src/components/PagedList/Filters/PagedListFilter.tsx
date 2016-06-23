import * as React from 'react';
import { Form, Button, Grid, Row } from 'react-bootstrap';
import {DatePicker} from '../../Widgets';
import {IFilter} from "./IFilters";
const ReduxForm = require<any>('redux-form');
import DropDownFilter from './DropDownFilter';
import fields from "../../Test/SimpleForm";
import {fetchInstanceList} from "../../../actions/data";

export interface IPagedListFiltersProps extends React.Props<any> {
    children?: JSX.Element;
    fields?: string[];
    sendFilters?: () => void;
    clazz: string;
};

class FilterForm extends React.Component<IPagedListFiltersProps, {}> {

    handleSubmit = () => {
    }

    render() {
        const { children, fields } = this.props;
        const childrenWithProps = React.Children.map(children,
            (child:any) => {
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

        return (
            <form className="form-inline filter-form stick-left" onSubmit={this.handleSubmit}>
                {childrenWithProps}
                <Button className="filter-button" bsStyle="primary" type="submit">Submit</Button>
            </form>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendFilters: (resource: string, offset: number) => dispatch(fetchInstanceList(resource, offset)),
    };
}

function mapStateToProps(state) {
    return {};
}

let DynamicForm = ReduxForm.reduxForm(
    {form: 'dynamic'},
    mapStateToProps,
    mapDispatchToProps
)(FilterForm);

export function PagedListFilters ({ children, clazz }:IPagedListFiltersProps) {
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
        <div>
            <Button> <i className="fa fa-filter" /> </Button>
            <DynamicForm fields={filterProps} children={children} clazz={clazz}/>
        </div>
    );

}
