import * as React from 'react';
import { IBulkUserActionType } from '../../interfaces';
export interface IUserActionStateProps {
    action?: string;
    selectedIds?: number[];
    selectAllOnPage?: boolean;
    selectAll?: boolean;
    totalCount?: number;
}
export interface IUserActionProps extends IUserActionStateProps {
    isDisabled: boolean;
    userActionsMap?: IBulkUserActionType[];
    style?: React.CSSProperties;
}
export interface IState {
    userAction: {
        action: string;
    };
    checkbox: {
        selectedIds: number[];
        selectAll: boolean;
        selectAllOnPage: boolean;
    };
}
export declare class UserActionsImpl extends React.Component<IUserActionProps, void> {
    private listItems;
    componentWillMount: () => void;
    renderDropDownItems: () => JSX.Element[];
    saveAction: (event: React.FormEvent) => void;
    performAction: () => void;
    saveUserActionData: () => void;
    render(): JSX.Element;
}
declare let UserActions: React.ComponentClass<IUserActionProps>;
export { UserActions };
