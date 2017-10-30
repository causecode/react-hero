import * as React from 'react';
import {ListGroup, ListGroupItem, FormControlProps, ButtonProps} from 'react-bootstrap';
import {FormControl, Col, Row, Button} from '../../ReusableComponents';
import {IInputProps} from './';

export interface IListInputState {
    newListItem: string;
}

// TODO Add support for nested objects list in this component.
export class ListInputTemplate extends React.Component<IInputProps, IListInputState> {

    constructor(props) {
        super(props);
        this.state = {newListItem: ''};
    }

    handleTextChange = (e: React.ChangeEvent<FormControlProps>): void => {
        this.setState({newListItem: e.target[`value`]});
    }

    addListItem = (e: React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>): void => {
        this.setState({newListItem: ''});
        const propertyValue: string[] = this.props.propertyValue ? this.props.propertyValue.slice() : [] ;
        propertyValue.push(this.state.newListItem);
        this.props.onChange(propertyValue);
    }

    render(): JSX.Element {
        const {style} = this.props;

        const inputCSS: React.CSSProperties = style && style.inputCSS ? style.inputCSS : {};
        const listCSS: React.CSSProperties = style && style.listCSS ? style.listCSS : {};
        const btnCSS: React.CSSProperties = style && style.btnCSS ? style.btnCSS : {};

        const list: string[] = this.props.propertyValue || ['Nothing to show.'];

        return (
            <div>
                <Row>
                    <Col sm={8}>
                        <FormControl
                                type="text"
                                value={this.state.newListItem}
                                onChange={this.handleTextChange}
                                style={inputCSS}
                        />
                    </Col>
                    <Col sm={4}>
                        <Button
                                bsStyle="default"
                                style={btnCSS}
                                onClick={this.addListItem}
                        >
                            Add
                        </Button>
                    </Col>
                </Row>
                <ListGroup style={{margin: '10px'}}>
                {
                    list.map((listItem : string, index : number) => {
                        return (
                            <ListGroupItem
                                    style={{wordWrap: 'break-word', ...listCSS}}
                                    key={`${this.props.propertyName}-${index}`}
                            >
                                {listItem}
                            </ListGroupItem>
                        );
                    })
                }
                </ListGroup>
            </div>
        );
    }
}
