import * as React from 'react';
import {IInputProps, IInputWidgetStyle} from './';
import {IDropDownFilterData} from '../../../interfaces';

const Select = require<any>('react-select').default;
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
    style?: IInputWidgetStyle;
}

export const DropDownInputTemplate = (props: IInputProps): JSX.Element => {

    const handleChange = (e: IDropDownFilterData & IDropDownFilterData[]): void => {
        if (e.constructor === Array) {
            props.onChange(e.map((item: IDropDownFilterData) => item.value));
        } else {
            props.onChange(e.value);
        }
    };

    const {multi, creatable, autoBlur, autofocus, propertyValue, enum:options, style} = props;

    const selectProps: IReactSelectProps = {
        multi: multi || false,
        creatable: creatable || false,
        autoBlur: autoBlur || false,
        autofocus: autofocus || false,
        value: propertyValue || '',
        options: options || [],
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
                style={style && style.inputCSS || {}}
                {...selectProps}
            />
        );
    } else {
        return (
            <Select
                onChange={handleChange}
                style={style && style.inputCSS || {}}
                {...selectProps}
            />
        );
    }
};
