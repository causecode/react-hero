import * as React from 'react';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router';
import {BaseModel} from '../../models/BaseModel';

export interface IDataGridProps extends React.Props<{}> {
    instanceList: BaseModel[];
    properties: string[];
    resource?: string;
}

export function DataGrid( { instanceList, properties, resource }: IDataGridProps): JSX.Element {
    if (!instanceList || !instanceList.length) {
        return <div></div>;
    }
    resource = instanceList[0] ? instanceList[0].resourceName : '';
    if (!properties.length) {
        // TODO Better names for the properties array which is supposed to be send by the server.
        properties = instanceList[0].columnNames || Object.keys(instanceList[0].properties);
    }
    return (
        <div className="data-grid">
            <br/><br/>
            <Table responsive striped bordered hover>
                <thead>
                    <tr className="data-grid-header">
                        <th>#</th>
                        {properties.map(function(property) {
                            return ( <th key = {properties.indexOf(property)}>{property.capitalize()}</th> );
                        })}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {instanceList.map((instance, index) => {
                        let instanceProperties = instance.properties;
                        return (
                        <tr key={instanceProperties.id} className="data-grid-row">
                            <td>{index}</td>
                            {properties.map(function(property) {
                                return ( 
                                        <td key={properties.indexOf(property)}>
                                            {(() => {
                                                if (property.indexOf('.') > 0) {
                                                    return instanceProperties.getNestedData(property);
                                                } else {
                                                    return instanceProperties[property];
                                                }
                                            })()}
                                        </td> 
                                    );
                            })}
                            <td>
                                <Link to={`/${resource}/edit/${instanceProperties.id}`}>
                                    <i className="fa fa-pencil" />
                                </Link>
                                <Link to={`/${resource}/show/${instanceProperties.id}`}>
                                    <i className="fa fa-location-arrow" />
                                </Link>
                            </td>
                        </tr>
                            );
                    })}
                </tbody>
            </Table>
        </div>
    );
}
