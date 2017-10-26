/// <reference types="react" />
import * as React from 'react';
export interface IInputStateProps {
    propertyValue?: any;
}
export interface IInputDispatchProps {
    change?: (model: string, value: any) => void;
}
export interface IInputProps extends IInputStateProps, IInputDispatchProps {
    model: string;
    enum?: any;
    type: string;
    propertyName: string;
    fieldSize?: number;
    labelSize?: number;
    style?: React.CSSProperties;
    radioButtonLabels?: {
        first: string;
        second: string;
    };
    onBlur?: boolean;
}
export declare const FormInput: React.ComponentClass<IInputProps>;
