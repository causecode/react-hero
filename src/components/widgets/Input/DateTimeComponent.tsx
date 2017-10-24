import * as React from 'react';
import * as moment from 'moment';
import {FormControl, FormControlProps} from 'react-bootstrap';
import {IInputProps} from './index';

class DateTimeComponent extends React.Component<IInputProps, void> {

    handleChange = (e: React.FormEvent<React.Component<FormControlProps, {}>>): void => {
        this.props.change(this.props.model, e.target[`value`]);
    }

    render(): JSX.Element {
        return(
            <FormControl
                    type="date"
                    style={this.props.style ? this.props.style.inputCSS : {}}
                    onChange={this.handleChange}
                    value={this.props.propertyValue ?
                        moment(this.props.propertyValue).format('YYYY-MM-DD') : ''}
            />
        );
    }

}

export default DateTimeComponent;
