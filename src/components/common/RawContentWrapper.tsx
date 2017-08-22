import * as React from 'react';
import {connect, MapDispatchToPropsFunction, MapStateToProps} from 'react-redux';
import {IDispatchProps, CSS, IDispatch} from '../../interfaces';
import {getNestedData} from '../../utils/commonUtils';
const {actions} = require<any>('react-redux-form');

export interface IRawContentStateProps {
    value?: string;
}

export interface IRawContentProps extends IRawContentStateProps, IDispatchProps {
    model?: string;
    style?: CSS;
    onBlur?: boolean;
};

export class RawContentWrapperImpl extends React.Component<IRawContentProps, void> {

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement> | React.FocusEvent<HTMLTextAreaElement>): void => {
        this.props.saveData(this.props.model, event.target[`value`]);
    }

    render(): JSX.Element {
        const eventHandlerProps = this.props.onBlur ? {onBlur: this.handleChange} : {onChange: this.handleChange};
         return(
            <div style={this.props.style ? this.props.style : container}>
                <textarea
                        className="form-control"
                        defaultValue={this.props.value}
                        style={rawContentTextArea}
                        {...eventHandlerProps}
                />
            </div>
        );
    }
}

let mapStateToProps: MapStateToProps<IRawContentStateProps, IRawContentProps> =
    (state: {forms}, ownProps: IRawContentProps): {value: string} => {
    let data: string = state.forms || {};

    return {
        value: getNestedData(data, ownProps.model),
    };
};

let mapDispatchToProps: MapDispatchToPropsFunction<IDispatchProps, IRawContentProps> =
        (dispatch: IDispatch): IDispatchProps => {
    return {
        saveData(model: string, value: string): void {
            dispatch(actions.change(model, value));
        },
    };
};

export const RawContentWrapper: React.ComponentClass<IRawContentProps> =
        connect(mapStateToProps, mapDispatchToProps)(RawContentWrapperImpl);

const rawContentTextArea: CSS = {
    height: '300px',
    zIndex: 'auto',
    position: 'relative',
    lineHeight: '1.35em',
    fontSize: '14px',
    transition: 'none',
    background: '#292929',
    fontFamily: 'monospace',
    padding: '10px',
    color: '#ddd',
};
const container: CSS = {
    minHeight: '300px',
};
