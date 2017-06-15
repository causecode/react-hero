import * as React from 'react';
import * as Radium from 'radium';
import {ModelService} from '../../../utils/modelService';
import {Button, Col} from 'react-bootstrap';
import {InputGroup, FontAwesome, Row} from '../../ReusableComponents';
import {CSS} from '../../../interfaces';
const ReduxForm: any = require<any>('redux-form');

export interface IOuterFilterProps {
    resource: string;
    style?: CSS;
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
                <Row style={{margin: 0}}>
                    <Col md={5}>
                        <InputGroup>
                            {this.props.children}
                            <InputGroup.Button>
                                <Button type="submit" style={this.props.style}>
                                    <FontAwesome name="search" />
                                </Button>
                            </InputGroup.Button>
                        </InputGroup>
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
