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
    input?: {onChange: (value: string) => void, onBlur: (value: string) => void, value: any};
}

export interface ISelectProps {
    name: string;
    multi: boolean;
    options: IDropDownFilterData[];
    value: string;
    onInputChange?: (value: string) => void;
    style?: CSS;
    input?: {onChange: (value: string) => void, onBlur: (value: string) => void, value: any};
}

export class ReactSelect extends React.Component<IReactSelectProps, void> {
    
    render(): JSX.Element {
        
        let selectProps: ISelectProps = {
            name: 'select',
            multi: this.props.multi,
            options: this.props.options,
            value: this.props.input.value || '',
            style: this.props.style
        };
       
        if (this.props.onInputChange) {
            selectProps.onInputChange = this.props.onInputChange;
        }

        return (
            <Select 
                    {...this.props}
                    value={this.props.input.value || ''}
                    onChange={(value) => {
                        this.props.input.onChange(value);
                    }}
                    onInputChange={this.props.onInputChange}
                    onBlur={() => {
                        this.props.input.onBlur(this.props.input.value);
                    }}
                    options={this.props.options}        
            />
        );
    }
}
