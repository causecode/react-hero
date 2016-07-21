import * as React from 'react';
import {DynamicForm} from './DynamicForm';
import { Form, Button, Grid, Row } from 'react-bootstrap';
import {DropDownFilter} from './DropDownFilter';
import {fetchInstanceList} from '../../../actions/data';
import {store} from '../../../store/store';
import * as Actions from '../../../actions/data';
import {spring} from 'react-motion';
import {IFilter} from '../../../interfaces/interfaces';
import {IPagedListFiltersProps} from '../../../interfaces/interfaces';

export function PagedListFilters ({ children, resource }: IPagedListFiltersProps): JSX.Element {
    let filterProps: string[] = [];
    if (!resource) {
        resource = '';
    }
    React.Children.forEach(children, (child: React.ReactElement<IFilter> & {type: {name: string}}) => {
        let paramName = child.props.paramName;
        let filterName = child.type.name;
        if (['RangeFilter', 'DateRangeFilter'].indexOf(filterName) !== -1) {
            filterProps.push(`${paramName}From`, `${paramName}To`);
        } else if (child.props.paramName) {
            filterProps.push(child.props.paramName);
        }
    });

    // TODO use connect and mapDispatchToProps for this.
    let toggleFilters = (): void => {
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
