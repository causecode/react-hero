import * as React from 'react';
import { BaseModel } from '../../models/BaseModel';
import { CustomActionType, IPagedListStyle } from '../../interfaces';
export interface IDataGridStateProps {
    selectedIds?: number[];
    selectAllOnPage?: boolean;
    selectAll?: boolean;
}
export interface IDataGridDispatchProps {
    selectAllRecords?: (isChecked: boolean) => void;
    selectAllRecordsOnPage?: (isChecked: boolean) => void;
    setChecked?: (id: number) => void;
    setUnchecked?: (id: number) => void;
}
export interface IDataGridProps extends IDataGridStateProps, IDataGridDispatchProps {
    instanceList: BaseModel[];
    max?: number;
    offset?: number;
    properties: string[];
    totalCount?: number;
    handleRecordDelete?: Function;
    showDefaultActions?: boolean;
    customActions?: CustomActionType;
    style?: IPagedListStyle;
    isBordered: boolean;
}
export declare class DataGridImpl extends React.Component<IDataGridProps, void> {
    static defaultProps: {
        showDefaultActions: boolean;
    };
    private resource;
    private properties;
    handleChange: (id: number, event: React.FormEvent) => void;
    toggleAllCheckboxes: (isChecked: boolean) => void;
    getInnerHtml: (property: string, instance: BaseModel, instanceProperties: string[]) => string | JSX.Element;
    renderSelectAllRecordsCheckbox: () => JSX.Element;
    renderActions: (instance: any) => JSX.Element | React.ComponentClass<any>;
    renderCount: () => JSX.Element;
    render(): JSX.Element;
}
declare let DataGrid: React.ComponentClass<IDataGridProps>;
export { DataGrid };
