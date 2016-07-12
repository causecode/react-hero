import * as React from 'react';
import { Form, Button, Grid, Row } from 'react-bootstrap';
import {DatePicker} from '../../Widgets';
import {IFilter} from './IFilters';
const ReduxForm: any = require<any>('redux-form');
import DropDownFilter from './DropDownFilter';
import {fetchInstanceList} from '../../../actions/data';
import {store} from '../../../store/store';
const classNames: any = require<any>('classnames');
import * as Actions from '../../../actions/data';
import {spring} from 'react-motion';

export interface IPagedListFiltersProps extends React.Props<{}> {
    children?: React.Component<{}, {}> | React.Component<{}, {}>[];
    fields?: string[];
    sendFilters?: (resource: string) => void;
    resource?: string;
    filtersOpen?: boolean;
}

export class FilterForm extends React.Component<IPagedListFiltersProps, {}> {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sendFilters(this.props.resource);
    };

    render() {
        const { filtersOpen, children, fields } = this.props;
        const childrenWithProps = React.Children.map(children,
            (child: any) => {
                let paramName = child.props.paramName;
                let filterName = child.type.name;
                if (['RangeFilter', 'DateRangeFilter'].indexOf(filterName) !== -1) {
                    return React.cloneElement(child, {
                        fields: [fields[`${paramName}From`], fields[`${paramName}To`]]
                    });
                } else {
                    return React.cloneElement(child, {
                        fields: [fields[paramName]]
                    });
                }
            });

        let hideClasses = filtersOpen ? '' : 'hide';
        return (
            <form className={classNames('form-inline', 'filter-form', 'stick-left', hideClasses)}
                    onSubmit={this.handleSubmit}>
                {childrenWithProps}
                <Button className="filter-button" bsStyle="primary" type="submit">Submit</Button>
            </form>
        );
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

export {DynamicForm};

export function PagedListFilters ({ children, resource }: IPagedListFiltersProps) {
    let filterProps = [];
    if (!resource) {
        resource = '';
    }
    React.Children.forEach(children, (child: any) => {
        let paramName = child.props.paramName;
        let filterName = child.type.name;
        if (['RangeFilter', 'DateRangeFilter'].indexOf(filterName) !== -1) {
            filterProps.push(`${paramName}From`, `${paramName}To`);
        } else if (child.props.paramName) {
            filterProps.push(child.props.paramName);
        }
    });

    // TODO use connect and mapDispatchToProps for this.
    let toggleFilters = () => {
        store.dispatch(Actions.toggleFilters());
    };

    if (children) {
        return (
            <div className="paged-list-filters">
                <Button onClick={toggleFilters}>
                    <i className="fa fa-filter"/>
                </Button>
                <DynamicForm fields={filterProps} resource={resource} filtersOpen={false}>
                    {children}
                </DynamicForm>
            </div>
        );
    } else {
        return <div></div>;
    }

}
