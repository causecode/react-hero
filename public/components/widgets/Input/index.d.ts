/// <reference types="react" />
import * as React from 'react';
import { IReactSelectProps } from './DropDownInputTemplate';
export interface IInputWidgetStyle {
    inputCSS?: React.CSSProperties;
    labelCSS?: React.CSSProperties;
    listCSS?: React.CSSProperties;
    btnCSS?: React.CSSProperties;
}
export interface IInputStateProps {
    propertyValue?: any;
}
export interface IInputDispatchProps {
    change?: (model: string, value: any) => void;
}
export interface IInputProps extends IReactSelectProps, IInputStateProps, IInputDispatchProps {
    model: string;
    enum?: any;
    type: string;
    propertyName: string;
    fieldSize?: number;
    labelSize?: number;
    style?: IInputWidgetStyle;
    radioButtonLabels?: {
        first: string;
        second: string;
    };
    onBlur?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement> | string[] | object[] | boolean) => void;
}
export declare const FormInput: React.ComponentClass<IInputProps>;
