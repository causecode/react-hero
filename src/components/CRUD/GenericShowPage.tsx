import * as React from 'react';
import {Table} from 'react-bootstrap';
import {IInstancePageProps} from '../../interfaces/interfaces';
import {DefaultModel} from '../../models/BaseModel';
import {ModelPropTypes} from '../../models/ModelPropTypes';

export class GenericShowPage extends React.Component<IInstancePageProps, void> {
    static defaultProps: IInstancePageProps = {
        instance: new DefaultModel({})
    };

    render(): JSX.Element {
        const {instance} =  this.props;
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
                    {instanceKeys.map((key: string, index: number) => {
                        let currentPropType = instance.propTypes[key]; 
                        if (
                                currentPropType.type === ModelPropTypes.objectInputType 
                        ) {
                            return (
                                <tr key={index}>
                                    <td><strong>{key}</strong></td>
                                    <td style={{padding: '0px'}}>
                                        <Table>
                                            <tbody>
                                                {Object.keys(instanceProperties[key])
                                                        .map((subKey: string, subIndex: number) => {
                                                    return (
                                                        <tr key={subIndex}>
                                                            <td><strong>{subKey}</strong></td>
                                                            <td>{instanceProperties[key][subKey].toString()}</td>
                                                        </tr>
                                                    );
                                                })}        
                                            </tbody>
                                        </Table>
                                    </td>
                                </tr>
                            );
                        }
                        return (
                            <tr key={index}>
                                <td><strong>{key}</strong></td>
                                <td>{instanceProperties[key].toString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}
