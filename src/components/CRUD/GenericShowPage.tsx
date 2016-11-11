import * as React from 'react';
import {Table} from 'react-bootstrap';
import {IInstancePageProps} from '../../interfaces/interfaces';
import {DefaultModel} from '../../models/BaseModel';

export class GenericShowPage extends React.Component<IInstancePageProps, {}> {
    static defaultProps: IInstancePageProps = {
        instance: new DefaultModel({})
    };

    render(): JSX.Element {
        const { instance } =  this.props;
        let resource: string = this.props.resource || instance.resourceName;
        const instanceProperties = instance.properties;
        let instanceKeys: string[] = Object.keys(instanceProperties);
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
                                <td className={`${resource}-value`}>{instanceProperties[key]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}
