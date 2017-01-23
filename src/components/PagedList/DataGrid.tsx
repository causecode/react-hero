import * as React from 'react';
import {Table, Tooltip, OverlayTrigger} from 'react-bootstrap';
import {Link} from 'react-router';
import {MapStateToProps, MapDispatchToPropsFunction, connect} from 'react-redux';
import {IState} from './BulkUserActions';
import {BaseModel} from '../../models/BaseModel';
import {getInnerData} from '../../utils/appService';
import {
    selectAllRecords, 
    selectAllRecordsOnPage, 
    setCheckboxChecked, 
    setCheckboxUnchecked
} from '../../actions/userActions';

export interface IDataGridStateProps {
    selectedIdsLength?: number;
    selectedIds?: number[];
    selectAllOnPage?: boolean;
    selectAll?: boolean; 
};

export interface IDataGridDispatchProps {
    selectAllRecords?: (isChecked: boolean) => void;
    selectAllRecordsOnPage?: (isChecked: boolean) => void;
    setChecked?: (id: number) => void;
    setUnchecked?: (id: number) => void;
}

export interface IDataGridProps extends IDataGridStateProps, IDataGridDispatchProps {
    instanceList: BaseModel[];
    properties: string[];
    totalCount?: number;
    handleRecordDelete?: Function;
}

export class DataGridImpl extends React.Component<IDataGridProps, void> {

    private resource: string;
    private properties: string[];

    // TODO More specific type for event.
    handleChange = (id: number, event: any): void => {
        // For selectAllOnPage id will be -1
        if (id === -1) {
            if (event.target.checked) {
                this.toggleAllCheckboxes(event.target.checked);
            } else {
                this.props.selectAllRecords(false);
                this.toggleAllCheckboxes(event.target.checked);
            }
            this.props.selectAllRecordsOnPage(event.target.checked);
            return;
        }  
        // For selectAll id will be -2
        if (id === -2) {
            this.props.selectAllRecords(event.target.checked);
            return;
        }
        if (event.target.checked) {
            this.props.setChecked(id);
        } else {
            this.props.setUnchecked(id);
            this.props.selectAllRecordsOnPage(false);
            this.props.selectAllRecords(false);
        }
    }

    toggleAllCheckboxes = (isChecked: boolean): void => {
        let instances: BaseModel[] = this.props.instanceList;
        if (isChecked) {
            for (let i: number = 0; i < instances.length; i++) {
                if (this.props.selectedIds && this.props.selectedIds.indexOf(instances[i].properties.id) === -1) {
                    this.props.setChecked(instances[i].properties.id);
                }
            }
        } else {
            for (let i: number = 0; i < instances.length; i++) {
                this.props.setUnchecked(instances[i].properties.id);
            }
        }
    }

    render(): JSX.Element {
        if (!this.props.instanceList || !this.props.instanceList.length) {
            return <div></div>;
        }

        this.resource = this.props.instanceList[0] ? this.props.instanceList[0].resourceName : '';
        
        if (!this.props.properties || !this.props.properties.length) {
        // TODO Better names for the properties array which is supposed to be send by the server.
            this.properties = this.props.instanceList[0].columnNames || 
                    Object.keys(this.props.instanceList[0].properties);
        } else {
            this.properties = this.props.properties;
        }

        const tooltip: JSX.Element = (
            <Tooltip id="tooltip"><strong>Remove from List</strong></Tooltip>
        );

        const selectAllRecordsCheckbox = (
            <tr>
                <th>
                    <input 
                            type="checkbox" 
                            onChange={this.handleChange.bind(this, -2)}
                            checked={this.props.selectAll}            
                    />
                </th>
                <td colSpan={this.properties.length + 2}>
                    All <strong>{this.props.instanceList.length}</strong> records visible on this page are selected. 
                    Click to select all <strong>{this.props.totalCount}</strong> records.
                </td>
            </tr>
        );

        return (
            <div className="data-grid">
                <br/><br/>
                <Table responsive striped bordered hover>
                    <thead>
                        {this.props.selectAllOnPage ? selectAllRecordsCheckbox : null}
                        <tr className="data-grid-header">
                            <th><input 
                                        type="checkbox"
                                        checked={this.props.selectAllOnPage && 
                                                this.props.selectedIdsLength === this.props.instanceList.length} 
                                        onChange={this.handleChange.bind(this, -1)}
                                />
                            </th>
                            <th>#</th>
                            {this.properties.map(function(property: string, index: number) {
                               return (<th key={index}>{property.capitalize()}</th>);
                            })}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.instanceList.map((instance, index) => {
                            let instanceProperties = instance.properties;                        
                            return (
                                <tr key={index} className="data-grid-row">
                                    <td><input 
                                                type="checkbox" 
                                                checked={this.props.selectedIds && 
                                                        this.props.selectedIds.indexOf(instanceProperties.id) !== -1} 
                                                onChange={this.handleChange.bind(this, instanceProperties.id)}/>
                                    </td>
                                    <td>{index}</td>
                                    {this.properties.map(function(property: string, index: number) {
                                        return (
                                            <td key={`property-${index}`}>
                                                {(() => {
                                                    if (property.indexOf('.') > 0) {
                                                        let method: any = instance['getHTML' + 
                                                            property.capitalize().substring(0, property.indexOf('.'))];
                                                        if (method) {
                                                            return method(instanceProperties);
                                                        }
                                                        return getInnerData(instanceProperties, property);
                                                    } else {
                                                        if (instance['getHTML' + property.capitalize()]) {
                                                            return instance['getHTML' + 
                                                                    property.capitalize()](instanceProperties);
                                                        }
                                                        if (!instanceProperties[property]) {
                                                            return instanceProperties[property];    
                                                        }
                                                        return instanceProperties[property].toString();
                                                    }
                                                })()}
                                            </td> 
                                        );
                                    })}
                                    <td>
                                        <Link to={`/${this.resource}/edit/${instanceProperties.id}`}>
                                            <i className="fa fa-pencil" />
                                        </Link>
                                        <Link to={`/${this.resource}/show/${instanceProperties.id}`}>
                                            <i className="fa fa-location-arrow" />
                                        </Link>
                                        <OverlayTrigger placement="top" overlay={tooltip}>
                                            <a 
                                                    onClick={this.props.handleRecordDelete &&
                                                            this.props.handleRecordDelete.bind(this, 
                                                            instanceProperties.id)} 
                                                    style={trashIconStyle}>
                                                        <i className="fa fa-trash-o" />
                                            </a>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

let mapStateToProps: MapStateToProps<IDataGridStateProps, IDataGridProps> = (state: IState): IDataGridStateProps => {
    return {
        selectedIds: state.checkbox.selectedIds,
        selectedIdsLength: state.checkbox.selectedIds.length,
        selectAllOnPage: state.checkbox.selectAllOnPage,
        selectAll: state.checkbox.selectAll
    };
};

let mapDispatchToProps: MapDispatchToPropsFunction<IDataGridDispatchProps, IDataGridProps> = 
        (dispatch): IDataGridDispatchProps => {
    return {
        selectAllRecords: (isChecked: boolean) => {
            dispatch(selectAllRecords(isChecked));
        },
        selectAllRecordsOnPage: (isChecked: boolean) => {
            dispatch(selectAllRecordsOnPage(isChecked));
        },
        setChecked: (id: number) => {
            dispatch(setCheckboxChecked(id));
        },
        setUnchecked: (id: number) => {
            dispatch(setCheckboxUnchecked(id));
        }
    };
};

let DataGrid: React.ComponentClass<IDataGridProps> = connect(mapStateToProps, mapDispatchToProps)(DataGridImpl);

export {DataGrid};

const trashIconStyle: React.CSSProperties = {
    color: '#337ab7',
    cursor: 'pointer', 
    textDecoration: 'none'
};
