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
 return (
 <tr key={instance.id}>
 <td>#</td>
 {properties.map(function(property) {
 return <td key={properties.indexOf(property)}>{instance[property]}</td>
 })}
 </tr>
 )
 return <td>{instance.author} fooooo</td>
*/

export default function DataGrid( { totalCount, instanceList, properties, clazz }: IDataGridProps) {
    let test = () => {
        let instances = instanceList.map(function(instance) {
            return (
                <tr>
                    <td>#</td>
                    {properties.map(function(property) {
                        return <td >{instance} mooooo</td>
                        })}
                </tr>
            )
        })
        console.log("instances", instances);
        console.log('<<<inital instance', instanceList[0]);
        console.log("instanceList", instanceList);
        console.log("properties", properties);
        return instances
    }
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
                    <tr>
                        <td>#</td>
                        instanceList.map(function(instance) {
                            return <td>{instance} mooooo</td>
                        }

                    </tr>
                </tbody>
            </Table>
        </div>
    );
};