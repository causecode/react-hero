import * as React from 'react';
import {Table, Row, Col} from 'react-bootstrap';
import {MissingInstanceError} from '../../errors/MissingInstanceError';

export default class GenericShowPage extends React.Component<IInstancePageProps, {}> {

    constructor(props: IInstancePageProps) {
        super();
        if (!props.instance) {
            throw new MissingInstanceError();
        }
    }

    render() {
        const { instance } =  this.props;
        const resource = instance.resourceName;
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
