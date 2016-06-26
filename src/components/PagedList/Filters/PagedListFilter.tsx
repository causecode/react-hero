import * as React from 'react';
import { Form, Button, Grid, Row } from 'react-bootstrap';
import {DatePicker} from '../../Widgets';
import {IFilter} from "./IFilters";
const ReduxForm = require<any>('redux-form');
import DropDownFilter from './DropDownFilter';
import {fetchInstanceList} from "../../../actions/data";
import {store} from "../../../store/store";
const classNames = require<any>('classnames');
import * as Actions from '../../../actions/data'
import {spring} from "react-motion";

export interface IPagedListFiltersProps extends React.Props<any> {
    children?: JSX.Element;
    fields?: string[];
    sendFilters?: (resource: string) => void;
    clazz?: string;
    filtersOpen?: boolean
};

class FilterForm extends React.Component<IPagedListFiltersProps, {}> {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sendFilters(this.props.clazz);
    };

    render() {
        const { filtersOpen, children, fields } = this.props;
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
                        fields: [fields[paramName]]
                    })
                }
            });

        let hideClasses = filtersOpen? '' : 'hide';
        return (
            <form className={classNames('form-inline', 'filter-form', 'stick-left', hideClasses)} onSubmit={this.handleSubmit}>
                {childrenWithProps}
                <Button className="filter-button" bsStyle="primary" type="submit">Submit</Button>
            </form>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendFilters: (resource: string) => dispatch(fetchInstanceList(resource, 0)),
    };
}

function mapStateToProps(state) {
    return {
        filtersOpen: state.data.get('filtersOpen')
    };
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

    // TODO use connect and mapDispatchToProps for this.
    let toggleFilters = () => {store.dispatch(Actions.toggleFilters())}
    return (
        <div>
            <Button onClick={toggleFilters}> <i className="fa fa-filter" /> </Button>
            <DynamicForm fields={filterProps} children={children} clazz={clazz} filtersOpen=""/>
        </div>
    );

}
