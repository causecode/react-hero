import * as React from 'react';
import {DynamicForm} from './DynamicForm';
import { Form, Button, Grid, Row } from 'react-bootstrap';
import {IFilter} from './IFilters';
import DropDownFilter from './DropDownFilter';
import {fetchInstanceList} from '../../../actions/data';
import {store} from '../../../store/store';
import * as Actions from '../../../actions/data';
import {spring} from 'react-motion';
import {IPagedListFiltersProps} from './IFilters';

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
