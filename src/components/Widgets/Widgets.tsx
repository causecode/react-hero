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
import {BaseModel} from '../../models/BaseModel';
import * as moment from 'moment';
import {isEmpty} from '../../utils/appService';
import {store} from '../../store/store';
import {connect} from 'react-redux';
const classNames: any = require<any>('classnames');
const {actions} = require<any>('react-redux-form');

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

function mapPropertyValue(state, ownProps) {
            let value; 
            let data = state.forms;
            ownProps.model.split('.').forEach(prop => {
                let keys = ownProps.model.split('.');
                if (keys.indexOf(prop) === (keys.length - 1)) {
                    value = data[prop];
                }
                data = data[prop];
            });
            return {
                propertyValue: data
            };
        };

function InputFactory(type: string): any {
    class Input extends React.Component<any, void> {

        handleChange = (e) => {
            store.dispatch(actions.change(this.props.model, e.target[`value`]));
        }

        render(): JSX.Element {
            let {propertyValue} = this.props;
            if (type === 'date') {
                propertyValue = moment(propertyValue).format('YYYY-MM-DD');
            }
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

    return connect(mapPropertyValue)(Input);
}

export class BooleanInputImpl extends React.Component<any, void> {

    static defaultProps = {
        propertyValue: false,
        propertyName: '',
        model: '',
        instance: {}
    };

    handleChange = (e: React.FormEvent) => {
        store.dispatch(actions.change(this.props.model, (e.target[`value`] === 'option-true')));
    }
    
    render(): JSX.Element {
        let {propertyName, propertyValue} = this.props;
        return (
            <FormGroup className="row" style={{margin: '0px'}}>
                <Col sm={3}>
                    <RightAlignControlLabel>{propertyName}</RightAlignControlLabel>
                </Col>
                <Col sm={4}>
                    <Row>
                        <Col sm={6}>
                            <Radio 
                                    onChange={this.handleChange} 
                                    value="option-true" 
                                    name={propertyName}
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

let BooleanInput = connect(mapPropertyValue)(BooleanInputImpl);
export {BooleanInput};

export class DropDownInputImpl extends React.Component<any, void> {

    static defaultProps = {
        propertyName: '',
        model: '',
        instance: {}
    };

    handleChange = (e: React.FormEvent) => {
        store.dispatch(actions.change(this.props.model, e.target[`value`]));
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

let DropDownInput = connect(mapPropertyValue)(DropDownInputImpl as any);
export {DropDownInput};

// TODO handle cases where the list is not a list of string.
export class ListInputImpl extends React.Component<any, {newListItem?: string}> {

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
        let propertyValue = this.props.propertyValue ? this.props.propertyValue.slice() : [] ;
        propertyValue.push(this.state.newListItem);
        store.dispatch(actions.change(this.props.model, propertyValue));
    }

    handleTextChange = (e: React.FormEvent) => {
        this.setState({newListItem: e.target[`value`]});
    }

    render(): JSX.Element {
        let list = this.props.propertyValue || ['Nothing to show.'];
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
                                    <ListGroupItem 
                                            style={{wordWrap: 'break-word'}} 
                                            key={`${this.props.propertyName}-${index}`}
                                    >
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

let ListInput = connect(mapPropertyValue)(ListInputImpl);
export {ListInput};
