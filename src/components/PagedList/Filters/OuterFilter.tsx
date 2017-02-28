import * as React from 'react';
import * as Radium from 'radium';
import {ModelService} from '../../../utils/modelService';
import {Button, Row, Col} from 'react-bootstrap';
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
            <form onSubmit={this.handleSubmit} style={outerFilterStyle}>
                <Row>
                    <Col md={4}>
                        {this.props.children}
                    </Col>
                    <Col>
                        <Button style={btnStyle} type="submit">Search</Button>
                    </Col>
                </Row>
            </form>
        );
    }
}

export function createOuterFilterForm (formName: string): React.ComponentClass<IOuterFilterProps> {
    let OuterFilterForm = ReduxForm.reduxForm({
        form: formName,
    })(OuterFilterImpl);

    return OuterFilterForm;
}

const outerFilterStyle: React.CSSProperties = {
    margin: '0px 0px 0px -15px',
};
const btnStyle: React.CSSProperties = {
    margin: '40px 0px 0px 0px',
};
