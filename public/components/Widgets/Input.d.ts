import * as React from 'react';
export interface IInputProps {
    model: string;
    propertyValue?: any;
    enum?: any;
    type: string;
    propertyName: string;
}
export declare let FormInput: React.ComponentClass<IInputProps>;
