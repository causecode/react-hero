import * as React from 'react';
import * as Radium from 'radium';
import {ModelService} from '../../../utils/modelService';
import {Button} from 'react-bootstrap';
const ReduxForm: any = require<any>('redux-form');

export interface IOuterFilterProps {
    resource: string;
}

@Radium
export class OuterFilterImpl extends React.Component<IOuterFilterProps, void> {
    
    sendFilters(resource: string): void {
        ModelService.getModel(resource).list();
    }

    handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        this.sendFilters(this.props.resource);
    };
    
    render(): JSX.Element {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.props.children}
                <Button style={submitBtn} type="submit">Search</Button>
            </form>
        );
    }
}

export function createOuterFilterForm (formName: string): React.ComponentClass<IOuterFilterProps> {
    let OuterFilterForm = ReduxForm.reduxForm({
        form: formName
    })(OuterFilterImpl);
    
    return OuterFilterForm;
}

const submitBtn: React.CSSProperties = {
    margin: '-115px 0px 0px 375px'
};
