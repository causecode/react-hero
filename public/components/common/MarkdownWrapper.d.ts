import * as React from 'react';
import { CSS, IDispatchProps } from '../../interfaces';
export interface IMarkdownStateProps {
    value?: string;
}
export interface IMarkdownProps extends IMarkdownStateProps, IDispatchProps {
    model?: string;
    style?: CSS;
}
export declare class MarkdownWrapperImpl extends React.Component<IMarkdownProps, void> {
    handleChange: (value: string) => void;
    render(): JSX.Element;
}
export declare const MarkdownWrapper: React.ComponentClass<IMarkdownProps>;
