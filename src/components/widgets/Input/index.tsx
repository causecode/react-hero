import * as React from 'react';
import {connect, MapStateToProps, MapDispatchToPropsFunction} from 'react-redux';
import {IDispatch} from '../../../interfaces';
import {parseWidgetDate} from '../../../utils/appService';
import {FormGroup, Col, ControlLabel} from '../../ReusableComponents';
import {getNestedData} from '../../../utils/commonUtils';
import {CSS} from '../../../interfaces';
import {GenericInputTemplate} from './GenericInputTemplate';
import {BooleanInputTemplate} from './BooleanInputTemplate';
import {DropDownInputTemplate} from './DropDownInputTemplate';
import {DateTimeComponent} from './DateTimeComponent';
import {ListInputTemplate} from './ListInputTemplate';
import {IReactSelectProps} from './DropDownInputTemplate';

const {actions} = require<any>('react-redux-form');

export interface IInputWidgetStyle {
    inputCSS?: React.CSSProperties;
    labelCSS?: React.CSSProperties;
    listCSS?: React.CSSProperties;
    btnCSS?: React.CSSProperties;
}

export interface IInputStateProps {
    propertyValue?: any;
}

export interface IInputDispatchProps {
    change?: (model: string, value: any) => void;
}

export interface IInputProps extends IReactSelectProps, IInputStateProps, IInputDispatchProps {
    model: string;
    enum?: any;
    type: string;
    propertyName: string;
    fieldSize?: number;
    labelSize?: number;
    style?: IInputWidgetStyle;
    radioButtonLabels?: {first: string, second: string}
    onBlur?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement> | string[] | object[] | boolean | string) => void;
    htmlAttributes?: React.InputHTMLAttributes<HTMLInputElement>
}

class FormInputImpl extends React.Component<IInputProps, {}> {

    static defaultProps: IInputProps = {
        fieldSize: 9,
        labelSize: 3,
        model: '',
        enum: '',
        type: '',
        propertyName: '',
        style: {inputCSS: {}, labelCSS: {}, listCSS: {}, btnCSS: {}},
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
                    <ControlLabel style={{defaultLabelStyle, ...this.props.style.labelCSS}}>
                        {this.props.propertyName}
                    </ControlLabel>
                </Col>
                <Col sm={this.props.fieldSize}>
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
    const data = state.forms || {};

    return {
        propertyValue: getNestedData(data, ownProps.model || ''),
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

const defaultLabelStyle: CSS = {
    textAlign: 'right',
};
