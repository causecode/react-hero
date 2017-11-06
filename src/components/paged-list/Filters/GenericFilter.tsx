import * as React from 'react';
import {FormControl} from 'react-bootstrap';

// Props type is any as any prop can be passed
export class GenericFilter extends React.Component<any> {

    render(): JSX.Element {
        const {input} = this.props;
        return (
            <FormControl {...input} {...this.props} />
        );
    }
}
