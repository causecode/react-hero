import * as React from 'react';
import { CSS, IDispatchProps } from '../../interfaces';
export interface ITinyMCEWrapperProps extends IDispatchProps {
    model?: string;
    value?: string;
    style?: CSS;
    config?: any;
}
export declare class TinyMCEWrapperImpl extends React.Component<ITinyMCEWrapperProps, void> {
    handleChange: (value: string) => void;
    render(): JSX.Element;
}
export declare const TinyMCEWrapper: React.ComponentClass<ITinyMCEWrapperProps>;
