import * as React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';

export interface IDataGridProps extends React.Props<any> {
    totalCount: number;
    instanceList: any;
    properties: Array<string>;
    resource: string;
};

export default function DataGrid( { totalCount, instanceList, properties, resource}: IDataGridProps) {
    return (
        <div className="flex">
            <br/><br/>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
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
                        <tr key={instanceData.id}>
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
