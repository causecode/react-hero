import * as React from 'react';
import {FormFactory} from './DynamicForm';
import {Button} from 'react-bootstrap';
import {store} from '../../../store/store';
import {toggleFilters as toggle} from '../../../actions/modelActions';
import {IFilter, IPagedListFiltersProps} from '../../../interfaces/interfaces';

export class PagedListFilters extends React.Component<IPagedListFiltersProps, void> {
    filterProps: string[] = [];
    DynamicForm: React.ComponentClass<IPagedListFiltersProps>;
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

    componentWillMount(): void {
        this.DynamicForm = FormFactory(this.props.resource);
    }

    // TODO use connect and mapDispatchToProps for this.
    toggleFilters(): void {
        store.dispatch(toggle());
    }

    render(): JSX.Element {
        let DynamicForm = this.DynamicForm;
        this.constructFilters();
        let children: React.ReactNode = this.props.children;
        if (children) {
            return (
                <div className="paged-list-filters">
                    <Button onClick={this.toggleFilters}>
                        <i className="fa fa-filter"/>
                    </Button>
                    <DynamicForm fields={this.filterProps} resource={this.props.resource} filtersOpen={false}>
                        {children}
                    </DynamicForm>
                </div>
            );
        } else {
            return <div></div>;
        }
    }

}
