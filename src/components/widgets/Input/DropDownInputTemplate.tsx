import * as React from 'react';
import {IInputProps} from './';
import {isEmpty} from '../../../utils/appService';

const DropDownInputTemplate = (props: IInputProps): JSX.Element => {

    const handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void =
            (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.onChange(e.target[`value`]);
    };

    return (
        <select
                value={props.propertyValue}
                className="form-control"
                style={props.style && props.style.inputCSS ? props.style.inputCSS : {}}
                onChange={handleChange}
        >
            <option value="" style={{color: 'grey', pointerEvents: 'none'}}>
                Select One
            </option>
            {(() => {
                const enumInstance = props.enum;
                if (isEmpty(enumInstance)) {
                    return;
                }
                let optionElements: JSX.Element[] = [];
                enumInstance.forEach((element, index) => {
                    optionElements.push(
                        <option
                                key={index}
                                value={element.value}
                        >
                            {element.label}
                        </option>
                    );
                });
                return optionElements;
            })()}
        </select>
    );
};

export default DropDownInputTemplate;
