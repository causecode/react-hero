import * as React from 'react';
import {Table, Row, Col} from 'react-bootstrap';
import {MissingInstanceError} from '../../errors/MissingInstanceError';
import {IInstancePageProps} from '../../interfaces/interfaces';
import {BaseModel} from '../../models/BaseModel';

export class GenericShowPage extends React.Component<IInstancePageProps, {}> {
    static defaultProps: IInstancePageProps = {
        instance: new BaseModel({})
    };

    render(): JSX.Element {
        const { instance } =  this.props;
        let resource: string = this.props.resource || instance.resourceName;
        const instanceData = instance.instanceData;
        let instanceKeys: string[] = Object.keys(instanceData);
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
