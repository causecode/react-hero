import * as React from 'react';
export interface IOuterFilterProps {
    resource: string;
}
export declare class OuterFilterImpl extends React.Component<IOuterFilterProps, void> {
    sendFilters(resource: string): void;
    handleSubmit: (event: React.FormEvent) => void;
    render(): JSX.Element;
}
export declare function createOuterFilterForm(formName: string): React.ComponentClass<IOuterFilterProps>;
