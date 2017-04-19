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
}
export declare let FormInput: React.ComponentClass<IInputProps>;
