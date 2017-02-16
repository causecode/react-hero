import * as React from 'react';
import * as moment from 'moment';
import {connect, MapStateToProps, MapDispatchToPropsFunction} from 'react-redux';
import {IDispatch} from '../../interfaces';
import {isEmpty, parseWidgetDate} from '../../utils/appService';
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
const {actions} = require<any>('react-redux-form');
const ReactDatetime = require<any>('react-datetime');

export interface IInputStateProps {
    propertyValue?: any;
}

export interface IInputDispatchProps {
    change?: (model: string, value: any) => void;
}

export interface IInputProps extends IInputStateProps, IInputDispatchProps {
    model: string;
    enum?: any;
    type: string;
    propertyName: string;
}

let GenericInputTemplate = (props): JSX.Element => {
    let handleChange: (e: React.FormEvent) => void = (e: React.FormEvent) => {
        props.onChange(e.target[`value`]);
    };

    return (
        <input type={props.type} className="form-control" value={props.propertyValue} onChange={handleChange}/>
    );
};

let BooleanInputTemplate = (props): JSX.Element => {
    
    let handleChange: (e: React.FormEvent) => void = (e: React.FormEvent) => {
        props.onChange((e.target[`value`] === 'option-true'));
    };

    return (
        <Row>
            <Col sm={6}>
                <Radio
                    onChange={handleChange}
                    value="option-true"
                    name={props.propertyName}
                    checked={props.propertyValue}>
                    True
                </Radio>
            </Col>
            <Col sm={6}>
                <Radio
                    onChange={handleChange}
                    value="option-false"
                    name={props.propertyName}
                    checked={!props.propertyValue}>
                    False
                </Radio>
            </Col>
        </Row>
    );
};

let DropDownInputTemplate = (props): JSX.Element => {

    let handleChange: (e: React.FormEvent) => void = (e: React.FormEvent) => {
        props.onChange(e.target[`value`]);
    };
    
    return (
        <select
            value={props.propertyValue}
            className="form-control"
            onChange={handleChange}>
            <option
                value=""
                style={{
                color: 'grey',
                pointerEvents: 'none'
            }}>Select One</option>
            {(() => {
                let enumInstance = props.enum;
                if (isEmpty(enumInstance)) {
                    return;
                }
                let optionElements: JSX.Element[] = [];
                enumInstance.forEach((element, index) => {
                    optionElements.push(
                        <option
                            key={index}
                            value={element.value}>
                            {element.label}
                        </option>
                    );
                });
                return optionElements;
            })()}
        </select>
    );
};

// TODO Add support for nested objects list in this component.
class ListInputTemplate extends React.Component<any, any> {

    constructor(props) {
         super(props);
         this.state = {newListItem: ''};
    }

    handleTextChange = (e: React.FormEvent): void => {
        this.setState({newListItem: e.target[`value`]});
    }

    addListItem = (e: React.FormEvent): void => {
        this.setState({newListItem: ''});
        let propertyValue = this.props.propertyValue ? this.props.propertyValue.slice() : [] ;
        propertyValue.push(this.state.newListItem);
        this.props.onChange(propertyValue);
    }
    
    render(): JSX.Element {
        let list: string[] = this.props.propertyValue || ['Nothing to show.'];
        return (
            <div>
                <Row>
                    <Col sm={8}>
                        <FormControl
                            type="text"
                            value={this.state.newListItem}
                            onChange={this.handleTextChange}/>
                    </Col>
                    <Col sm={4}>
                        <Button bsStyle="default" onClick={this.addListItem}>Add</Button>
                    </Col>
                </Row> 
                <ListGroup style={{margin: '10px'}}> 
                {(() => {
                    return list.map((listItem : string, index : number) => {
                        return (
                            <ListGroupItem
                                style={{wordWrap: 'break-word'}}
                                key={`${this.props.propertyName}-${index}`}>
                                {listItem}
                            </ListGroupItem>
                        );
                    });
                })()} 
                </ListGroup>
            </div>
        );        
    }
}

// TODO: Make it generic component by allowing it to accept all props of react-datetime
class DateTimeComponent extends React.Component<IInputProps, void> {
    
    handleChange = (newValue: {_d: {toISOString: () => any}}): void => {
        if (newValue && newValue._d) {
            this.props.change(this.props.model, newValue._d.toISOString());
        }
    }

    render(): JSX.Element {
        return(
           <ReactDatetime 
                defaultValue={this.props.propertyValue ? 
                        moment(this.props.propertyValue).format('MM-DD-YYYY HH:mm') : ''}
                strictParsing={true}
                utc={true}
                onChange={this.handleChange}
           />
        );
    }

}

class FormInputImpl extends React.Component<IInputProps, {}> {
    
    handleChange = (newValue: any): void => {
        this.props.change(this.props.model, newValue);
    }

    getInputTemplate = (): React.ComponentClass<any> | React.StatelessComponent<any> => {
        let type: string = this.props.type;
        switch (type) {
            case 'boolean': return BooleanInputTemplate;
            case 'select': return DropDownInputTemplate;
            case 'list': return ListInputTemplate;
            case 'datetime': return DateTimeComponent;
            default: return GenericInputTemplate;
        }
    }

    render(): JSX.Element {
        let {propertyValue} = this.props;
        if (this.props.type === 'date') {
            propertyValue = propertyValue ? parseWidgetDate(propertyValue) : '';
        }
        let InputTemplate: React.ComponentClass<any> = this.getInputTemplate() as React.ComponentClass<any>;
        return (
            <FormGroup className="row" style={{margin: '0px'}}>
                <Col sm={3}>
                    <ControlLabel style={{textAlign: 'right'}}>{this.props.propertyName}</ControlLabel>
                </Col>
                <Col sm={4}>
                    <InputTemplate 
                        {...this.props}
                        value={propertyValue}
                        onChange={this.handleChange}
                    />
                </Col>
            </FormGroup>
        );
    }
}

let mapStateToProps: MapStateToProps<IInputStateProps, IInputProps> = 
        (state: {forms: any}, ownProps: IInputProps): IInputStateProps => {
    let data = state.forms || {};
    ownProps.model.split('.').forEach(prop => {
        data = data.hasOwnProperty(prop) ? data[prop] : '';
    });
    return {
        propertyValue: data
    };
};

let mapDispatchToProps: MapDispatchToPropsFunction<IInputDispatchProps, IInputProps> = 
        (dispatch: IDispatch): IInputDispatchProps => {
    return {
        change: (model: string, value: any): void => {
            dispatch(actions.change(model, value));
        }
    };
}; 

export let FormInput: React.ComponentClass<IInputProps> = connect<IInputStateProps, IInputDispatchProps, IInputProps>
        (mapStateToProps, mapDispatchToProps)(FormInputImpl);
