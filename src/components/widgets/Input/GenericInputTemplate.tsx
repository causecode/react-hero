import * as React from 'react';
import {IInputProps} from './';

export const GenericInputTemplate = (props: IInputProps): JSX.Element => {

    const {type, style, propertyValue} = props;

    const handleChange: (e: React.FormEvent<void>) => void = (e: React.FormEvent<void>): void => {
        props.onChange(e.target[`value`]);
    };

    const inputProps: {onBlur: (e: React.FormEvent<void>) => void} | {onChange: (e: React.FormEvent<void>) => void}
            = props.onBlur ? {onBlur: handleChange} : {onChange: handleChange};

    return (
        <input
                type={type}
                style={style && style.inputCSS ? style.inputCSS : {}}
                className="form-control"
                defaultValue={propertyValue}
                {...inputProps}
        />
    );
};
