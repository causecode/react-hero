import * as React from 'react';
export interface IConfirmationModalStateProps {
    show?: boolean;
    modalBody?: string;
    modalFooter?: string;
}
export interface IConfirmationModalProps extends IConfirmationModalStateProps {
    onConfirm: React.EventHandler<React.MouseEvent>;
    onHide: React.EventHandler<React.MouseEvent>;
}
export interface IConfirmationModalState {
    confirmationModal: boolean;
}
export declare class ConfirmationModalImpl extends React.Component<IConfirmationModalProps, void> {
    render(): JSX.Element;
}
declare let ConfirmationModal: React.ComponentClass<IConfirmationModalProps>;
export { ConfirmationModal };
