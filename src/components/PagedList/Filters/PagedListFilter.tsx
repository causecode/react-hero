import * as React from 'react';
import {createFilterForm} from './DynamicForm';
import {Button} from 'react-bootstrap';
import {store} from '../../../store';
import {toggleFilters as toggle} from '../../../actions/modelActions';
import {IFilter, IPagedListFiltersProps} from '../../../interfaces';
import {isEmpty} from '../../../utils/appService';

let InnerFilterForm: React.ComponentClass<IPagedListFiltersProps>;
export class PagedListFilters extends React.Component<IPagedListFiltersProps, void> {
    filterProps: string[] = [];
    static defaultProps: IPagedListFiltersProps = {
        resource: ''
    };

    constructFilters(): void {
        let children: React.ReactNode = this.props.children;
        React.Children.forEach(children, (child: React.ReactElement<IFilter> & {type: {name: string}}) => {
            let paramName = child.props.paramName;
            let filterName = child.type.name;
            if (['RangeFilter', 'DateRangeFilter'].indexOf(filterName) !== -1) {
                this.filterProps.push(`${paramName}From`, `${paramName}To`);
            } else if (child.props.paramName) {
                this.filterProps.push(child.props.paramName);
            }
        });
    }

    // TODO use connect and mapDispatchToProps for this.
    toggleFilters(): void {
        store.dispatch(toggle());
    }

    render(): JSX.Element {
        InnerFilterForm = createFilterForm(this.props.resource);
        this.constructFilters();
        let children: React.ReactNode = this.props.children;
        if (isEmpty(children)) {
            return <div></div>;
        }
        return (
            <div className="paged-list-filters">
                <Button onClick={this.toggleFilters}>
                    <i className="fa fa-filter"/>
                </Button>
                <InnerFilterForm fields={this.filterProps} resource={this.props.resource} filtersOpen={false}>
                    {children}
                </InnerFilterForm>
            </div>
        );
    }
}
