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
import {isEmpty, parseWidgetDate} from '../../utils/appService';
import {store} from '../../store';
import {connect} from 'react-redux';
const {actions} = require<any>('react-redux-form');

export interface IInputProps {
    model: string;
    propertyValue: any;
    type: string;
    propertyName: string;
}

let GenericInputTemplate = (props) => {
    let handleChange = (e: React.FormEvent) => {
        props.onChange(e.target[`value`]);
    };

    return (
        <input type={props.type} className="form-control" value={props.value} onChange={handleChange}/>
    );
};

let BooleanInputTemplate = (props) => {
    
    let handleChange = (e: React.FormEvent) => {
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

let DropDownInputTemplate = (props) => {

    let handleChange = (e: React.FormEvent) => {
        props.onChange(e.target[`value`]);
    };
    
    return (
        <select
            value={props.propertyValue}
            className="form-control"
            onChange={handleChange}>
            <option
                disabled
                value=""
                style={{
                color: 'grey',
                pointerEvents: 'none'
            }}>Select one..</option>
            {(() => {
                let enumInstance = props.enum;
                if (isEmpty(enumInstance)) {
                    return;
                }
                return Object
                    .keys(enumInstance)
                    .map((enumproperty : string, index : number) => {
                        if (enumInstance.hasOwnProperty(enumproperty) && !isNaN(parseInt(enumproperty, 10))) {
                            
                            return (
                                <option key={`${enumInstance[enumproperty]}-${index}`} value={enumproperty}>
                                    {enumInstance[enumproperty]}
                                </option>
                            );
                        }
                    });
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

    handleTextChange = (e: React.FormEvent) => {
        this.setState({newListItem: e.target[`value`]});
    }

    addListItem = (e: React.FormEvent) => {
        this.setState({newListItem: ''});
        let propertyValue = this.props.propertyValue ? this.props.propertyValue.slice() : [] ;
        propertyValue.push(this.state.newListItem);
        this.props.onChange(propertyValue);
    }
    
    render() {
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

class FormInputImpl extends React.Component<IInputProps, {}> {
    
    handleChange = (newValue: any) => {
        store.dispatch(actions.change(this.props.model, newValue));
    }

    getInputTemplate = (): React.ComponentClass<any> | React.StatelessComponent<any> => {
        let type: string = this.props.type;
        switch (type) {
            case 'boolean': return BooleanInputTemplate;
            case 'select': return DropDownInputTemplate;
            case 'list': return ListInputTemplate;
            default: return GenericInputTemplate;
        }
    }

    render() {
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

let mapStateToProps = (state, ownProps) => {
    let data = state.forms || {};
    ownProps.model.split('.').forEach(prop => {
        data = data.hasOwnProperty(prop) ? data[prop] : '';
    });
    return {
        propertyValue: data
    };
};

export let FormInput = connect(mapStateToProps)(FormInputImpl);
