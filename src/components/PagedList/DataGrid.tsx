import * as React from 'react';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router';
import {MissingInstanceListError} from '../../errors/MissingInstanceListError';

export interface IDataGridProps extends React.Props<{}> {
    instanceList: IBaseModel[];
    properties: string[];
    resource?: string;
}

export function DataGrid( { instanceList, properties, resource }: IDataGridProps) {
    if (!instanceList) {
        throw new MissingInstanceListError();
    }
    resource = instanceList[0] ? instanceList[0].resourceName : '';
    if (!properties) {
        properties = Object.keys(instanceList[0].instanceData);
    }
    return (
        <div className="data-grid">
            <br/><br/>
            <Table responsive striped bordered hover>
                <thead>
                    <tr className="data-grid-header">
                        <th>#</th>
                        {properties.map(function(property) {
                            return ( <th key = {properties.indexOf(property)}>{property}</th> );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {instanceList.map((instance) => {
                        let instanceData = instance.instanceData;
                        return (
                        <tr key={instanceData.id} className="data-grid-row">
                            <td>
                                <Link to={`/${resource}/edit/${instanceData.id}`}><i className="fa fa-pencil" />
                                </Link>
                                <Link to={`/${resource}/show/${instanceData.id}`}><i className="fa fa-location-arrow" />
                                </Link>
                            </td>
                            {properties.map(function(property) {
                                return ( <td key={properties.indexOf(property)}>{instanceData[property]}</td> );
                            })}
                        </tr>
                            );
                    })}
                </tbody>
            </Table>
        </div>
    );
}
