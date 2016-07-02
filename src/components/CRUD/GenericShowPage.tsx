import * as React from 'react';
import {Table, Row, Col} from 'react-bootstrap';

export interface IGenericShowPage {
    resource: string;
    instance: IBaseModel;
}

export default class GenericShowPage extends React.Component<IGenericShowPage,{}> {

    render() {
        const {instance, resource} =  this.props;
        const instanceData = instance.instanceData || {} as JSON;
        let instanceKeys = Object.keys(instanceData);
        return (
            <Table responsive bordered className="data-show-table">
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {instanceKeys.map(key => {
                        return (
                        <tr key={instanceKeys.indexOf(key)}>
                            <td><strong>{key}</strong></td>
                            <td>{instanceData[key]}</td>
                        </tr>
                            )
                        })}
                </tbody>
            </Table>
        );
    }
}