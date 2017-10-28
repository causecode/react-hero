import * as React from 'react';
import {FormControl} from 'react-bootstrap';
import {IDropDownFilterData} from '../../../interfaces';

export interface IDropDownSelectProps {
    possibleValues: IDropDownFilterData[];
    input: any; // this field is injected by redux-form
}

export class DropDownSelect extends React.Component<IDropDownSelectProps, void> {

    renderOptions = (): JSX.Element[] => {
        let options: JSX.Element[] = [];
        let possibleValues: IDropDownFilterData[] = this.props.possibleValues;

        if (possibleValues && possibleValues.length > 0) {
            possibleValues.forEach((item: IDropDownFilterData, index: number) => {
                options.push(
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>,
                );
            });
        }
        return options;
    }

    render(): JSX.Element {
        const {input} = this.props;
        return (
            <FormControl componentClass="select" {...input}>
                <option value="">Select One</option>
                {this.renderOptions()}
            </FormControl>
        );
    }
}
