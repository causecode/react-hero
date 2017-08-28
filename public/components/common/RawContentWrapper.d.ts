/// <reference types="react" />
import * as React from 'react';
import { IDispatchProps, CSS } from '../../interfaces';
export interface IRawContentStateProps {
    value?: string;
}
export interface IRawContentProps extends IRawContentStateProps, IDispatchProps {
    model?: string;
    style?: CSS;
    onBlur?: boolean;
}
export declare class RawContentWrapperImpl extends React.Component<IRawContentProps, void> {
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement> | React.FocusEvent<HTMLTextAreaElement>) => void;
    render(): JSX.Element;
}
export declare const RawContentWrapper: React.ComponentClass<IRawContentProps>;
