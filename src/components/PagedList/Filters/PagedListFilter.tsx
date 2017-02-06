import * as React from 'react';
import * as Radium from 'radium';
import {createFilterForm} from './DynamicForm';
import {Button} from 'react-bootstrap';
import {toggleFilters as toggle} from '../../../actions/modelActions';
import {IPagedListFiltersProps} from '../../../interfaces';
import {isEmpty} from '../../../utils/appService';
import {store} from '../../../store';
const ReactFontAwesome = require('react-fontawesome');
const FontAwesome = Radium(ReactFontAwesome);

let InnerFilterForm: React.ComponentClass<IPagedListFiltersProps>;

@Radium
export class PagedListFilters extends React.Component<IPagedListFiltersProps, void> {
    
    static defaultProps: IPagedListFiltersProps = {
        resource: ''
    };

    componentWillMount = (): void => {
        InnerFilterForm = createFilterForm(this.props.resource);
    }

    toggleFilters = (): void => {
        store.dispatch(toggle());
    }

    render(): JSX.Element {
        let children: React.ReactNode = this.props.children;
        if (isEmpty(children)) {
            return null;
        }
        return (
            <div className="paged-list-filters">
                <Button onClick={this.toggleFilters}>
                    <FontAwesome name="filter" />
                </Button>
                <InnerFilterForm resource={this.props.resource} filtersOpen={false}>
                    {children}
                </InnerFilterForm>
            </div>
        );
    }
}

