/// <reference types="react" />
import { IInputProps, IInputWidgetStyle } from './';
import { IDropDownFilterData } from '../../../interfaces';
import 'react-select/dist/react-select.css';
export interface IReactSelectProps {
    multi?: boolean;
    creatable?: boolean;
    autoBlur?: boolean;
    autofocus?: boolean;
    value?: string;
    options?: IDropDownFilterData[];
    onInputChange?: (value: string) => void;
    onInputKeyDown?: (value: string) => void;
    style?: IInputWidgetStyle;
}
export declare const DropDownInputTemplate: (props: IInputProps) => JSX.Element;
