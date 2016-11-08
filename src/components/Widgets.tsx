import * as React from 'react';
import {
    FormControl,
    FormGroup,
    Col,
    ControlLabel,
    Row,
    Button,
    ListGroup,
    ListGroupItem,
    Radio 
} from 'react-bootstrap';
import { isEmpty } from '../utils/appService';
import { ModelPropTypes, BaseModel } from '../models/BaseModel';
const {Control} = require<any>('react-redux-form');
const TextControl = (props) => <Control.text model={props.model} className="form-control" />;
const classNames: any = require<any>('classnames');

export const Title = (props): JSX.Element => {
    return (
        <div className="title">{props.children}</div>
    );
};

export const Description = (props): JSX.Element => {
    return (
        <div className="description">{props.children}</div>
    );
};

export const Content = (props): JSX.Element => {
    return (
        <div className="widget-content">{props.children}</div>
    );
};

export const ButtonList = (props): JSX.Element => {
    let classes : string[] = ['button-list '];
    if (props.highlightOnHover) {
        classes.push('highlight');
    }
    return (
        <ul className={classNames(classes)}>{props.children}</ul>
    );
};

export const ButtonListItem = (props): JSX.Element => {
    let classes = ['button-list-item '];
    if (props.highlightOnHover) {
        classes.push('highlight-on-hover');
    }
    return (
        <li className={classNames((classes))}>{props.children}</li>
    );
};

export class DateInput extends React.Component<{propertyName: string, propertyValue: Date}, {value: string}> {
    
    static defaultProps = {
        propertyValue: new Date(),
        propertyName: ''
    };

    constructor(props) {
         super();
         this.state = {value: props.propertyValue};
    }

    handleChange = (e: React.FormEvent) => {
        this.setState({value: e.target[`value`]});
    }
    
    render(): JSX.Element {
        return (
            <FormGroup className="row" style={{margin: '0px'}}>
                <Col sm={3}>
                    <ControlLabel>{this.props.propertyName}</ControlLabel>
                </Col>
                <Col sm={4}>
                    <FormControl type="date" onChange={this.handleChange} value={this.state.value} />
                </Col>
            </FormGroup>
        );
    }
}

export class StringInput extends React.Component<{propertyName: string, propertyValue: string}, {value: string}> {
    
    static defaultProps = {
        propertyValue: '',
        propertyName: ''
    };

    constructor(props) {
         super();
         this.state = {value: props.propertyValue};
    }

    handleChange = (e: React.FormEvent) => {
        this.setState({value: e.target[`value`]});
    }
    
    render(): JSX.Element {
        return (
            <FormGroup className="row" style={{margin: '0px'}}>
                <Col sm={3}>
                    <ControlLabel>{this.props.propertyName}</ControlLabel>
                </Col>
                <Col sm={4}>
                    <FormControl type="text" onChange={this.handleChange} value={this.state.value} />
                </Col>
            </FormGroup>
        );
    }
}

export class NumberInput extends React.Component<{propertyName: string, propertyValue: number}, {value: string}> {
    
    static defaultProps = {
        propertyValue: 0,
        propertyName: ''
    };

    constructor(props) {
         super();
         this.state = {value: props.propertyValue};
    }

    handleChange = (e: React.FormEvent) => {
        this.setState({value: e.target[`value`]});
    }
    
    render(): JSX.Element {
        return (
            <FormGroup className="row" style={{margin: '0px'}}>
                <Col sm={3}>
                    <ControlLabel>{this.props.propertyName}</ControlLabel>
                </Col>
                <Col sm={4}>
                    <FormControl type="number" onChange={this.handleChange} value={this.state.value} />
                </Col>
            </FormGroup>
        );
    }
}

export class BooleanInput extends React.Component<{propertyName: string, propertyValue: boolean}, {value: string}> {

    static defaultProps = {
        propertyValue: false,
        propertyName: ''
    };

    constructor(props) {
         super();
         this.state = {value: `option-${props.propertyValue.toString()}`};
     }

    handleChange = (e: React.FormEvent) => {
        this.setState({value: e.target[`value`]});
    }
    
    render(): JSX.Element {
        return (
            <FormGroup className="row" style={{margin: '0px'}}>
                <Col sm={3}>
                    <ControlLabel>{this.props.propertyName}</ControlLabel>
                </Col>
                <Col sm={4}>
                    <Row>
                        <Col sm={6}>
                            <Radio 
                                    onChange={this.handleChange} 
                                    value="option-true" 
                                    name={this.props.propertyName}
                                    checked={this.state.value === 'option-true'}
                            >
                                True
                            </Radio>
                        </Col>
                        <Col sm={6}>
                            <Radio
                                    onChange={this.handleChange}
                                    value="option-false"
                                    name={this.props.propertyName}
                                    checked={this.state.value === 'option-false'}
                            >
                                False
                            </Radio>
                        </Col>
                    </Row>
                </Col>
            </FormGroup>
        );
    }
}

// TODO handle cases where the list is not a list of string.
export class ListInput extends React.Component<{propertyName: string, propertyValue: string[]}, {list?: string[], newListItem?: string}> {

    static defaultProps = {
        propertyValue: [],
        propertyName: '',
        newListItem: ''
    };

    constructor(props) {
        super();
        this.state = {list: props.propertyValue, newListItem: ''};
    }

    addListItem = (e: React.FormEvent) => {
        let currentList: string[] = this.state.list;
        currentList.push(this.state.newListItem);
        this.setState({list: currentList, newListItem: ''});
    }

    handleTextChange = (e: React.FormEvent) => {
        this.setState({newListItem: e.target[`value`]});
    }

    render(): JSX.Element {
        return (
            <FormGroup className="row" style={{margin: '0px'}}>
                <Col sm={3}>
                    <ControlLabel>{this.props.propertyName}</ControlLabel>
                </Col>
                <Col sm={4}>
                    <Row>
                        <Col sm={8}>   
                            <FormControl type="text" value={this.state.newListItem} onChange={this.handleTextChange} />
                        </Col> 
                        <Col sm={4}>   
                            <Button bsStyle="default" onClick={this.addListItem}>Add</Button>
                        </Col> 
                    </Row>
                    <ListGroup style={{margin: '10px'}}>
                        {(() => {
                            let list = isEmpty(this.state.list) ? ['Nothing to show.'] : this.state.list;
                            return list.map((listItem: string, index: number) => {
                                return (
                                    <ListGroupItem key={`${this.props.propertyName}-${index}`}>
                                        {listItem}
                                    </ListGroupItem>
                                );
                            });
                        })()}
                    </ListGroup>
                </Col>
            </FormGroup>
        );
    }
}
