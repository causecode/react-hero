/// <reference types="react" />
import * as React from 'react';
import { FormControlProps, ButtonProps } from 'react-bootstrap';
import { IInputProps } from './';
export interface IListInputState {
    newListItem: number | string | string[];
}
export declare class ListInputTemplate extends React.Component<IInputProps, IListInputState> {
    constructor(props: any);
    handleTextChange: (e: React.ChangeEvent<FormControlProps>) => void;
    addListItem: (e: React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>) => void;
    render(): JSX.Element;
}
