import * as React from 'react';
import * as Radium from 'radium';
import {connect, MapStateToProps, MapDispatchToPropsFunction} from 'react-redux';
import {CSS, IDispatchProps, IDispatch} from '../../interfaces';
import {getNestedData} from '../../utils/commonUtils';
const {actions} = require<any>('react-redux-form');
const TinyMCE: any = require<any>('react-tinymce-input');

export interface ITinyMCEWrapperProps extends IDispatchProps {
    model?: string;
    value?: string;
    style?: CSS;
    config?: any;
}

@Radium
export class TinyMCEWrapperImpl extends React.Component<ITinyMCEWrapperProps, void> {

    handleChange = (value: string): void => {
        this.props.saveData(this.props.model, value);
    }

    render(): JSX.Element {
        return (
            <div style={this.props.style || container}>
                <TinyMCE
                        value={this.props.value}
                        tinymceConfig={ this.props.config || {
                            plugins: 'autolink link image lists print',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',
                            height: '190px',
                        }}
                        onChange={this.handleChange}
                />
            </div>
        );
    }
}

let mapStateToProps: MapStateToProps<ITinyMCEWrapperProps, ITinyMCEWrapperProps> =
        (state: {forms}, ownProps: ITinyMCEWrapperProps): {value: string} => {
    let data: string = state.forms || {};

    return {
        value: getNestedData(data, ownProps.model),
    };
};

// Values to save in store can be anything, so type 'any' is given.
let mapDispatchToProps: MapDispatchToPropsFunction<IDispatchProps, ITinyMCEWrapperProps> =
        (dispatch: IDispatch): IDispatchProps => {
           return {
               saveData: (model: string, value: any): void => {
                   dispatch(actions.change(model, value));
               },
    };
};

export const TinyMCEWrapper: React.ComponentClass<ITinyMCEWrapperProps> =
        connect<ITinyMCEWrapperProps, IDispatchProps, ITinyMCEWrapperProps>
                (mapStateToProps, mapDispatchToProps)(TinyMCEWrapperImpl);

const container: CSS = {
    margin: '15px 0px',
    minHeight: '300px',
};
