import * as React from 'react';
import {CSS, IDropDownFilterData} from '../../interfaces';
import Select = require('react-select');
import 'react-select/dist/react-select.css';

export interface IReactSelectProps {
    multi: boolean;
    options: IDropDownFilterData[];
    style?: CSS;
    label?: string;
    onInputChange?: (value: string) => void;
    input?: {onChange: (value: any) => void, onBlur: (value: any) => void, value: any};
}

export interface ISelectProps extends IReactSelectProps {
    name: string;
    value: string;
}

export class ReactSelect extends React.Component<IReactSelectProps, void> {

    render(): JSX.Element {

        let selectProps: ISelectProps = {
            name: 'select',
            multi: this.props.multi,
            options: this.props.options,
            value: this.props.input.value || '',
            style: this.props.style,
        };

        if (this.props.onInputChange) {
            selectProps.onInputChange = this.props.onInputChange;
        }

        return (
            <Select
                    {...this.props}
                    value={this.props.input.value}
                    onChange={(value: any): void => {
                        if (value && value.constructor === Array) {
                            this.props.input.onChange([...value]);
                        } else {
                            this.props.input.onChange(value);
                        }
                    }}
                    onInputChange={this.props.onInputChange}
                    onBlur={(value: any): void => {
                        if (value && value.constructor === Array) {
                            this.props.input.onBlur([...value]);
                        } else if (value && value.length > 0) {
                            this.props.input.onBlur(value);
                        }
                    }}
                    options={this.props.options}
            />
        );
    }
}
