import * as React from 'react';
import { CSS } from '../../../interfaces';
export interface IOuterFilterProps {
    resource: string;
    style?: CSS;
}
export declare class OuterFilterImpl extends React.Component<IOuterFilterProps, void> {
    sendFilters(resource: string): void;
    handleSubmit: (event: React.FormEvent) => void;
    render(): JSX.Element;
}
export declare function createOuterFilterForm(formName: string): React.ComponentClass<IOuterFilterProps>;
