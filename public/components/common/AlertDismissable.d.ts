import * as React from 'react';
import { IAlertType, CSS } from '../../interfaces';
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
export declare class AlertDismissableImpl extends React.Component<IAlertDismissableProps, void> {
    render(): JSX.Element;
}
declare let AlertDismissable: React.ComponentClass<IAlertDismissableProps>;
export { AlertDismissable };
