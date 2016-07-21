import * as React from 'react';
import {Table, Row, Col} from 'react-bootstrap';
import {MissingInstanceError} from '../../errors/missingInstanceError';
import {IInstancePageProps} from '../../interfaces/interfaces';

export class GenericShowPage extends React.Component<IInstancePageProps, {}> {

    render(): JSX.Element {
        const { instance } =  this.props;
        let resource = this.props.resource;
        if (!resource) {
            resource = instance ? instance.resourceName : '';
        }
        const instanceData = (instance && instance.instanceData) ? instance.instanceData : {};
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
                                <td className={`${resource}-property`}><strong>{key}</strong></td>
                                <td className={`${resource}-value`}>{instanceData[key]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}
