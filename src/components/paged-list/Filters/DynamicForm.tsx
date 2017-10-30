import * as React from 'react';
import * as Radium from 'radium';
import {IPagedListFiltersProps} from '../../../interfaces';
import {ModelService} from '../../../utils/modelService';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
const ReduxForm: any = require<any>('redux-form');
const classNames: any = require<any>('classnames');

@Radium
export class InnerFilterFormImpl extends React.Component<IPagedListFiltersProps, void> {

    static defaultProps: IPagedListFiltersProps = {
        filtersOpen: false,
    };

    sendFilters(resource: string): void {
        ModelService.getModel(resource).list(
            {}, false, {}, this.props.successCallBack, this.props.failureCallBack, this.props.path,
        );
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        this.sendFilters(this.props.resource);
    };

    render(): JSX.Element {
        let hideClass: string = this.props.filtersOpen ? '' : 'hide';
        return (
            <form className={classNames('form-inline', 'filter-form', 'stick-left', hideClass)}
                    onSubmit={this.handleSubmit}>
                {this.props.children}
                <Button className="filter-button" bsStyle="primary" type="submit">Submit</Button>
            </form>
        );
    }
}

function mapStateToProps(state: {data: any}): {filtersOpen: boolean} {
    return {
        filtersOpen: state.data.get('filtersOpen'),
    };
}

export function createFilterForm(resource: string) {
    let InnerFilterFormConnected = ReduxForm.reduxForm({
        form: `${resource}Filters`,
    })(InnerFilterFormImpl);

    let InnerFilterForm: React.ComponentClass<IPagedListFiltersProps> =
            connect<void, void, IPagedListFiltersProps>(mapStateToProps)(InnerFilterFormConnected);

    return InnerFilterForm;
}
