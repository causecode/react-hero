/// <reference types="react" />
import * as React from 'react';
import { ButtonProps } from 'react-bootstrap';
export interface IConfirmationModalStateProps {
    show?: boolean;
    modalBody?: string;
    modalFooter?: string;
}
export interface IConfirmationModalProps extends IConfirmationModalStateProps {
    onConfirm: React.EventHandler<React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>>;
    onHide: React.EventHandler<React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>>;
}
export interface IConfirmationModalState {
    confirmationModal: boolean;
}
export declare class ConfirmationModalImpl extends React.Component<IConfirmationModalProps, void> {
    render(): JSX.Element;
}
declare let ConfirmationModal: React.ComponentClass<IConfirmationModalProps>;
export { ConfirmationModal };
