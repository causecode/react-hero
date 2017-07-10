import * as React from 'react';
export interface IUser {
    age: string;
    firstName: string;
    lastName: string;
    id: number;
}
export declare class UserListPage extends React.Component<{
    resource: any;
}, any> {
    static resourceName: string;
    renderCustomAction: (instance: IUser) => JSX.Element;
    render(): JSX.Element;
}
export declare class TestAction extends React.Component<{
    instance: IUser;
}, void> {
    exportDetails: () => void;
    render(): JSX.Element;
}
