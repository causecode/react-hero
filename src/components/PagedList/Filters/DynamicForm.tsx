import * as React from 'react';
import {IPagedListFiltersProps} from '../../../interfaces';
import {ModelService} from '../../../utils/modelService';
import {Button} from 'react-bootstrap';
const ReduxForm: any = require<any>('redux-form');
const classNames: any = require<any>('classnames');

export class InnerFilterForm extends React.Component<IPagedListFiltersProps, void> {

    static defaultProps: IPagedListFiltersProps = {
        filtersOpen: false,
        fields: [],
        filters: {}
    };

    sendFilters(resource: string): void {
        ModelService.getModel(resource).list(this.props.filters || {});
    }

    handleSubmit = (e): void => {
        e.preventDefault();
        this.sendFilters(this.props.resource);
    };

    render(): JSX.Element {
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

        let hideClass: string = filtersOpen ? '' : 'hide';
        return (
            <form className={classNames('form-inline', 'filter-form', 'stick-left', hideClass)}
                  onSubmit={this.handleSubmit}>
                {childrenWithProps}
                <Button className="filter-button" bsStyle="primary" type="submit">Submit</Button>
            </form>
        );
    }
}

function mapStateToProps(state): {filtersOpen: boolean} {
    return {
        filtersOpen: state.data.get('filtersOpen')
    };
}

export function createFilterForm(resource): typeof InnerFilterForm {
    return ReduxForm.reduxForm(
        {
            form: `${resource}Filters`,
            destroyOnUnmount: false
        },
        mapStateToProps
    )(InnerFilterForm);
}
