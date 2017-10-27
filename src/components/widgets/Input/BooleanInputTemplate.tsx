import * as React from 'react';
import {RadioProps} from 'react-bootstrap';
import {Col, Row, Radio} from '../../ReusableComponents';
import {IInputProps} from './';

export const BooleanInputTemplate = (props: IInputProps): JSX.Element => {

    const {radioButtonLabels, propertyName, propertyValue, style} = props;

    const handleChange: (e: React.ChangeEvent<RadioProps>) => void = (e: React.ChangeEvent<RadioProps>) => {
        props.onChange((e.target[`value`] === 'option-true'));
    };

    return (
        <Row>
            <Col sm={6}>
                <Radio
                        onChange={handleChange}
                        value="option-true"
                        name={propertyName}
                        checked={propertyValue}
                        style={style && style.inputCSS ? style.inputCSS : {}}
                >
                    {radioButtonLabels && radioButtonLabels.first ? radioButtonLabels.first : 'True'}
                </Radio>
            </Col>
            <Col sm={6}>
                <Radio
                        onChange={handleChange}
                        value="option-false"
                        name={propertyName}
                        checked={!propertyValue}
                        style={style && style.inputCSS ? style.inputCSS : {}}
                >
                    {radioButtonLabels && radioButtonLabels.second ? radioButtonLabels.second : 'False'}
                </Radio>
            </Col>
        </Row>
    );
};
