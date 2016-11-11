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
import { BaseModel } from '../models/BaseModel';
const classNames: any = require<any>('classnames');
import * as moment from 'moment';
import { isEmpty } from '../utils/appService';

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

export interface IFormInputProps {
    propertyName: string; 
    propertyValue: string;
    instance: BaseModel;
}

const RightAlignControlLabel = (props) => {
    return (
        <ControlLabel style={{textAlign: 'right'}}>
            {props.children}
        </ControlLabel>
    );
};

export const StringInput: React.ComponentClass<any> = InputFactory('text');
export const NumberInput: React.ComponentClass<any> = InputFactory('number');
export const DateInput: React.ComponentClass<any> = InputFactory('date');

function InputFactory(type: string): any {
    return class extends React.Component<any, void> {
        
        static defaultProps = {
            propertyValue: '',
            propertyName: '',
        };

        handleChange = (e: React.FormEvent) => {
            // this.setState({value: e.target[`value`]});
            let instance: BaseModel = this.props.instance;
            instance.properties[this.props.propertyName] = e.target[`value`];
            this.props.onChange(instance); 
        }
        
        render(): JSX.Element {
            let propertyValue = type === 'date' ? 
                    moment(this.props.propertyValue).format('YYYY-MM-DD') : this.props.propertyValue;
            return (
                <FormGroup className="row" style={{margin: '0px'}}>
                    <Col sm={3}>
                        <RightAlignControlLabel>{this.props.propertyName}</RightAlignControlLabel>
                    </Col>
                    <Col sm={4}>
                        <input 
                                type={type} 
                                className="form-control" 
                                value={propertyValue} 
                                onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>
            );
        }
    };
}

export class BooleanInput extends React.Component<any, void> {

    static defaultProps = {
        propertyValue: false,
        propertyName: '',
        model: '',
        instance: {}
    };

    handleChange = (e: React.FormEvent) => {
        // this.setState({value: e.target[`value`]});
        this.props.instance.properties[this.props.propertyName] = e.target[`value`] === 'option-true';
        this.props.onChange(this.props.instance); 
    }
    
    render(): JSX.Element {
        let propertyName: string = this.props.propertyName;
        let propertyValue = this.props.instance.properties[propertyName];
        return (
            <FormGroup className="row" style={{margin: '0px'}}>
                <Col sm={3}>
                    <RightAlignControlLabel>{this.props.propertyName}</RightAlignControlLabel>
                </Col>
                <Col sm={4}>
                    <Row>
                        <Col sm={6}>
                            <Radio 
                                    onChange={this.handleChange} 
                                    value="option-true" 
                                    name={this.props.propertyName}
                                    checked={propertyValue}
                            >
                                True
                            </Radio>
                        </Col>
                        <Col sm={6}>
                            <Radio
                                    onChange={this.handleChange}
                                    value="option-false"
                                    name={this.props.propertyName}
                                    checked={!propertyValue}
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

export class DropDownInput extends React.Component<any, void> {

    static defaultProps = {
        propertyValue: false,
        propertyName: '',
        model: '',
        instance: {}
    };

    handleChange = (e: React.FormEvent) => {
        this.props.instance.properties[this.props.propertyName] = e.target[`value`];
        this.props.onChange(this.props.instance);
    }
    
    render() {
        return (
            <FormGroup className="row" style={{margin: '0px'}}>
                <Col sm={3}>
                    <RightAlignControlLabel>{this.props.propertyName}</RightAlignControlLabel>
                </Col>
                <Col sm={4}>
                    <select value={this.props.propertyValue} className="form-control" onChange={this.handleChange}>
                    <option disabled value="" style={{color: 'grey', pointerEvents: 'none'}}>Select one..</option>
                        {(() => {
                            let enumInstance = this.props.enum;
                            if (isEmpty(enumInstance)) {
                                return;
                            }
                            return Object.keys(enumInstance).map((enumproperty: string, index: number) => {
                                    if (
                                            enumInstance.hasOwnProperty(enumproperty) && 
                                            !isNaN(parseInt(enumproperty, 10))
                                    ) {
                                        return (
                                            <option 
                                                    key={`enumproperty-key-${index}`}
                                                    value={enumproperty}
                                            >
                                            {enumInstance[enumproperty]}
                                            </option>
                                        ); 
                                    }
                                });
                        })()}
                    </select>
                </Col>
            </FormGroup> 
        );      
    }
}

// TODO handle cases where the list is not a list of string.
export class ListInput extends React.Component<any, {newListItem?: string}> {

    static defaultProps = {
        instance: {},
        propertyValue: [],
        propertyName: '',
        newListItem: '',
        model: ''
    };

    constructor(props) {
        super();
        this.state = {newListItem: ''};
    }

    addListItem = (e: React.FormEvent) => {
        this.props.instance.properties[this.props.propertyName].push(this.state.newListItem);
        this.props.onChange(this.props.instance);
        this.setState({newListItem: ''});
        // let currentList: string[] = this.state.list;
        // currentList.push(this.state.newListItem);
        // this.setState({list: currentList, newListItem: ''});
    }

    handleTextChange = (e: React.FormEvent) => {
        this.setState({newListItem: e.target[`value`]});
    }

    render(): JSX.Element {
        let instance: BaseModel = this.props.instance;
        let list = instance.properties[this.props.propertyName] || ['Nothing to show.'];
        return (
            <FormGroup className="row" style={{margin: '0px'}}>
                <Col sm={3}>
                    <RightAlignControlLabel>{this.props.propertyName}</RightAlignControlLabel>
                </Col>
                <Col sm={4}>
                    <Row>
                        <Col sm={8}>
                            <FormControl 
                                    type="text" 
                                    value={this.state.newListItem} 
                                    onChange={this.handleTextChange} 
                            />
                        </Col>
                        <Col sm={4}>   
                            <Button bsStyle="default" onClick={this.addListItem}>Add</Button>
                        </Col> 
                    </Row>
                    <ListGroup style={{margin: '10px'}}>
                        {(() => {
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
