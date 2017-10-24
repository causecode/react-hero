import * as React from 'react';
import {IInputProps} from './';
import {
    Col,
    Row,
    Radio,
} from 'react-bootstrap';

const BooleanInputTemplate = (props: IInputProps): JSX.Element => {

    const handleChange: (e: React.FormEvent<Radio>) => void = (e: React.FormEvent<Radio>) => {
        props.onChange((e.target[`value`] === 'option-true'));
    };

    return (
        <Row>
            <Col sm={6}>
                <Radio
                        onChange={handleChange}
                        value="option-true"
                        name={props.propertyName}
                        checked={props.propertyValue}
                        style={props.style && props.style.inputCSS ? props.style.inputCSS : {}}
                >
                    {props.radioButtonLabels && props.radioButtonLabels.first ? props.radioButtonLabels.first : 'True'}
                </Radio>
            </Col>
            <Col sm={6}>
                <Radio
                        onChange={handleChange}
                        value="option-false"
                        name={props.propertyName}
                        checked={!props.propertyValue}
                        style={props.style && props.style.inputCSS ? props.style.inputCSS : {}}
                >
                    {
                        props.radioButtonLabels && props.radioButtonLabels.second
                            ? props.radioButtonLabels.second
                            : 'False'
                    }
                </Radio>
            </Col>
        </Row>
    );
};

export default BooleanInputTemplate;
