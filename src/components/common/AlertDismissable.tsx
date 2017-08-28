import * as React from 'react';
import * as Radium from 'radium';
import {connect, MapStateToProps} from 'react-redux';
import {hideAlert} from '../../utils/commonUtils';
import {Alert} from '../ReusableComponents';
import {IAlertType, CSS} from '../../interfaces';

export interface IAlertDismissableProps {
    show?: boolean;
    type?: string;
    message?: string;
    alertStyle?: CSS;
    alertFontStyle?: CSS;
}

export interface IAlertDismissableState {
    alertDismissable: IAlertType;
}

@Radium
export class AlertDismissableImpl extends React.Component<IAlertDismissableProps, void> {

    render(): JSX.Element {
        if (!this.props.show) {
            return null;
        }

        return (
            <Alert style={this.props.alertStyle || alertStyle} bsStyle={this.props.type} onDismiss={hideAlert}>
                <strong>
                    <span style={this.props.alertFontStyle || fontStyle}>{this.props.message}</span>
                </strong>
            </Alert>
        );
    }
}


let mapStateToProps: MapStateToProps<IAlertDismissableProps, IAlertDismissableProps> =
        (state: IAlertDismissableState): IAlertDismissableProps => {
            return {
                show: state.alertDismissable.show,
                type: state.alertDismissable.type,
                message: state.alertDismissable.message,
            };
};

let AlertDismissable: React.ComponentClass<IAlertDismissableProps> = connect(mapStateToProps)(AlertDismissableImpl);

export {AlertDismissable};

const alertStyle: CSS = {
    position: 'fixed',
    height: 'auto',
    textAlign: 'center',
    width: '100%',
    verticalAlign: 'middle',
    zIndex: 887,
    marginTop: '-20px',
};
const fontStyle: CSS = {
    fontSize: '16px',
    fontWeight: 'bold',
};
