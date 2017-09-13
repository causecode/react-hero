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
    Radio,
    FormControlProps,
    ButtonProps,
} from 'react-bootstrap';
import {getNestedData} from '../../utils/commonUtils';

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
    fieldSize?: number;
    labelSize?: number;
    style?: React.CSSProperties;
    radioButtonLabels?: {first: string, second: string}
    onBlur?: boolean;
}

const GenericInputTemplate = (props): JSX.Element => {
    const handleChange: (e: React.FormEvent<void>) => void = (e: React.FormEvent<void>) => {
        props.onChange(e.target[`value`]);
    };

    const inputProps = props.onBlur ? {onBlur: handleChange} : {onChange: handleChange};
    return (
        <input type={props.type} className="form-control" defaultValue={props.propertyValue} {...inputProps} />
    );
};

const BooleanInputTemplate = (props): JSX.Element => {

    const handleChange: (e: React.FormEvent<Radio>) => void = (e: React.FormEvent<Radio>) => {
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
                    {props.radioButtonLabels && props.radioButtonLabels.first ? props.radioButtonLabels.first : 'True'}
                </Radio>
            </Col>
            <Col sm={6}>
                <Radio
                    onChange={handleChange}
                    value="option-false"
                    name={props.propertyName}
                    checked={!props.propertyValue}>
                    {
                        props.radioButtonLabels && props.radioButtonLabels.second
                            ? props.radioButtonLabels.second
                            : 'False'
                    }
                </Radio>
            </Col>
        </Row>
    );
};

const DropDownInputTemplate = (props): JSX.Element => {

    const handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void =
            (e: React.ChangeEvent<HTMLSelectElement>) => {
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
                pointerEvents: 'none',
            }}>Select One</option>
            {(() => {
                const enumInstance = props.enum;
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

    handleTextChange = (e: React.FormEvent<React.Component<FormControlProps, {}>>): void => {
        this.setState({newListItem: e.target[`value`]});
    }

    addListItem = (e: React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>): void => {
        this.setState({newListItem: ''});
        let propertyValue = this.props.propertyValue ? this.props.propertyValue.slice() : [] ;
        propertyValue.push(this.state.newListItem);
        this.props.onChange(propertyValue);
    }

    render(): JSX.Element {
        const list: string[] = this.props.propertyValue || ['Nothing to show.'];
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

    static defaultProps: IInputProps = {
        fieldSize: 9,
        labelSize: 3,
        model: '',
        enum: '',
        type: '',
        propertyName: '',
    };

    handleChange = (newValue: any): void => {
        this.props.change(this.props.model, newValue);
    }

    getInputTemplate = (): React.ComponentClass<any> | React.StatelessComponent<any> => {
        const type: string = this.props.type;
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
        const InputTemplate: React.ComponentClass<any> = this.getInputTemplate() as React.ComponentClass<any>;
        return (
            <FormGroup className="row" style={{margin: '0px'}}>
                <Col sm={this.props.labelSize}>
                    <ControlLabel style={{textAlign: 'right'}}>{this.props.propertyName}</ControlLabel>
                </Col>
                <Col sm={this.props.fieldSize} style={this.props.style}>
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

const mapStateToProps: MapStateToProps<IInputStateProps, IInputProps> =
        (state: {forms: any}, ownProps: IInputProps): IInputStateProps => {
    let data = state.forms || {};
    
    return {
        propertyValue: getNestedData(data, ownProps.model),
    };
};

const mapDispatchToProps: MapDispatchToPropsFunction<IInputDispatchProps, IInputProps> =
        (dispatch: IDispatch): IInputDispatchProps => {
    return {
        change: (model: string, value: any): void => {
            dispatch(actions.change(model, value));
        },
    };
};

export const FormInput: React.ComponentClass<IInputProps> = connect<IInputStateProps, IInputDispatchProps, IInputProps>
        (mapStateToProps, mapDispatchToProps)(FormInputImpl);
