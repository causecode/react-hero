import * as React from 'react';
import * as moment from 'moment';
import {FormControlProps} from 'react-bootstrap';
import {FormControl} from '../../ReusableComponents';
import {IInputProps} from './index';

export class DateTimeComponent extends React.Component<IInputProps, void> {

    handleChange = (e: React.ChangeEvent<FormControlProps>): void => {
        this.props.change(this.props.model, e.target[`value`]);
    }

    render(): JSX.Element {
        const {style, propertyValue} = this.props;

        return(
            <FormControl
                    type="date"
                    style={style ? style.inputCSS : {}}
                    onChange={this.handleChange}
                    value={propertyValue ? moment(propertyValue).format('YYYY-MM-DD') : ''}
            />
        );
    }

}
