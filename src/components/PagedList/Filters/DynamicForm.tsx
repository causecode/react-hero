import * as React from 'react';
import {IPagedListFiltersProps} from './IFilters';
import {Button} from 'react-bootstrap';
import {fetchInstanceList} from '../../../actions/data';
const ReduxForm: any = require<any>('redux-form');
const classNames: any = require<any>('classnames');

export class FilterForm extends React.Component<IPagedListFiltersProps, {}> {

    static defaultProps = {
        sendFilters: (e) => {e.preventDefault(); },
        filtersOpen: false,
        fields: []
    };

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
                    let from: string = `${paramName}From`;
                    let to: string = `${paramName}To`;
                    if (fields[from] && fields[to]) {
                        return React.cloneElement(child, {
                            fields: [fields[from], fields[to]]
                        });
                    } else {
                        return child;
                    }
                } else {
                    if (fields[paramName]) {
                        return React.cloneElement(child, {
                            fields: [fields[paramName]]
                        });
                    } else {
                        return child;
                    }
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
