import * as React from 'react';
import { IDispatchProps, CSS } from '../../interfaces';
export interface IRawContentStateProps {
    value?: string;
}
export interface IRawContentProps extends IRawContentStateProps, IDispatchProps {
    model?: string;
    style?: CSS;
}
export declare class RawContentWrapperImpl extends React.Component<IRawContentProps, void> {
    handleChange: (event: React.FormEvent) => void;
    render(): JSX.Element;
}
export declare const RawContentWrapper: React.ComponentClass<IRawContentProps>;
