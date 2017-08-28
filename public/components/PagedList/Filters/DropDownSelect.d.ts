/// <reference types="react" />
import * as React from 'react';
import { IDropDownFilterData } from '../../../interfaces';
export interface IDropDownSelectProps {
    possibleValues: IDropDownFilterData[];
    input: any;
}
export declare class DropDownSelect extends React.Component<IDropDownSelectProps, void> {
    renderOptions: () => JSX.Element[];
    render(): JSX.Element;
}
