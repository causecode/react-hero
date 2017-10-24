import * as React from 'react';
import {IInputProps} from './';

const GenericInputTemplate = (props: IInputProps): JSX.Element => {
    const handleChange: (e: React.FormEvent<void>) => void = (e: React.FormEvent<void>) => {
        props.onChange(e.target[`value`]);
    };

    const inputProps: {
        onBlur: (e: React.FormEvent<void>) => void;
    } | {
        onChange: (e: React.FormEvent<void>) => void;
    } = props.onBlur ? {onBlur: handleChange} : {onChange: handleChange};

    return (
        <input
                type={props.type}
                style={props.style && props.style.inputCSS ? props.style.inputCSS : {}}
                className="form-control"
                defaultValue={props.propertyValue}
                {...inputProps}
        />
    );
};

export default GenericInputTemplate;
