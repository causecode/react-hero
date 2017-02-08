import * as React from 'react';
import { BaseModel } from '../../models/BaseModel';
export interface IDataGridProps extends React.Props<{}> {
    instanceList: BaseModel[];
    properties: string[];
    resource?: string;
}
export declare function DataGrid({instanceList, properties, resource}: IDataGridProps): JSX.Element;
