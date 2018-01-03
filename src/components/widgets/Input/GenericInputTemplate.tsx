import * as React from 'react';
import {IInputProps} from './';

export const GenericInputTemplate = (props: IInputProps): JSX.Element => {

    const {type, style, propertyValue, htmlAttributes} = props;

    const handleChange = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>): void => {
        props.onChange(e.target[`value`]);
    };

    const inputProps: {onBlur: (e: React.FocusEvent<HTMLInputElement>) => void} |
            {onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}
            = props.onBlur ? {onBlur: handleChange} : {onChange: handleChange};

    return (
        <input
                type={type}
                style={style && style.inputCSS ? style.inputCSS : {}}
                className="form-control"
                defaultValue={propertyValue}
                {...inputProps}
                {...htmlAttributes}
        />
    );
};
