import * as React from 'react';
import { CSS, IDropDownFilterData } from '../../interfaces';
import 'react-select/dist/react-select.css';
export interface IReactSelectProps {
    multi: boolean;
    options: IDropDownFilterData[];
    style?: CSS;
    label?: string;
    onInputChange?: (value: string) => void;
    input?: {
        onChange: (value: any) => void;
        onBlur: (value: any) => void;
        value: any;
    };
}
export interface ISelectProps extends IReactSelectProps {
    name: string;
    value: string;
}
export declare class ReactSelect extends React.Component<IReactSelectProps, void> {
    handleChange: (value: any) => void;
    handleBlur: (value: any) => void;
    render(): JSX.Element;
}
