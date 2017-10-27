import * as React from 'react';
import {IInputProps, IStyle} from './';
import {IDropDownFilterData} from '../../../interfaces';

const Select = require<any>('react-select');
const Creatable = require<any>('react-select').Creatable;
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
    style?: IStyle;
}

export const DropDownInputTemplate = (props: IInputProps): JSX.Element => {

    const handleChange = (e: IDropDownFilterData & IDropDownFilterData[]): void => {
        props.onChange(e);
    };

    const {multi, creatable, autoBlur, autofocus, propertyValue, options, style} = props;

    let selectProps: IReactSelectProps = {
        multi: multi || false,
        creatable: creatable || false,
        autoBlur: autoBlur || false,
        autofocus: autofocus || false,
        value: propertyValue || '',
        options: options || [],
        style: style && style.inputCSS ? style.inputCSS : {},
    };

    if (props.onInputChange) {
        selectProps.onInputChange = props.onInputChange;
    }
    if (props.onInputKeyDown) {
        selectProps.onInputKeyDown = props.onInputKeyDown;
    }

    if (creatable) {
        return (
            <Creatable
                onChange={handleChange}
                {...selectProps}
            />
        );
    } else {
        return (
            <Select
                onChange={handleChange}
                {...selectProps}
            />
        );
    };
};
