import * as React from 'react';
import { Table } from 'react-bootstrap';

export interface IDataGridProps extends React.Props<any> {
    totalCount: number;
    //instanceList: Array<any>;
    instanceList: Array<any>;
    properties: Array<string>;
    clazz: any;
};

/*

*/

export default function DataGrid( { totalCount, instanceList, properties, clazz }: IDataGridProps) {
    return (
        <div className="flex">
            <br/><br/>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        {properties.map(function(property) {
                            return <th>{property}</th>
                        })},
                    </tr>
                </thead>
                <tbody>

                    {instanceList.map(function(instance) {
                        {
                            return (
                            <tr key={instance.id}>
                                <td>#</td>
                                {properties.map(function(property) {
                                    return <td key={properties.indexOf(property)}>{instance[property]}</td>
                                    })}
                            </tr>
                                )
                            }
                        })}
                </tbody>
            </Table>
        </div>
    );
};