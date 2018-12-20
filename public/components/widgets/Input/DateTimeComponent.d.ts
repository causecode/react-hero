/// <reference types="react" />
import * as React from 'react';
import { FormControlProps } from 'react-bootstrap';
import { IInputProps } from './index';
export declare class DateTimeComponent extends React.Component<IInputProps, {}> {
    handleChange: (e: React.ChangeEvent<FormControlProps>) => void;
    render(): JSX.Element;
}
