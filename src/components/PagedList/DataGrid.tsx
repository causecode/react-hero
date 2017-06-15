import * as React from 'react';
import * as Radium from 'radium';
import {Link} from 'react-router-dom';
import {Table, Tooltip, OverlayTrigger} from 'react-bootstrap';
import {MapStateToProps, MapDispatchToPropsFunction, connect} from 'react-redux';
import {IState} from './BulkUserActions';
import {BaseModel} from '../../models/BaseModel';
import {CustomActionType, CSS} from '../../interfaces';
import {getInnerData, getActionComponent} from '../../utils/appService';
import {selectAllRecords, toggleCheckbox} from '../../actions/checkboxActions';
import {SELECT_ALL_RECORDS, SELECT_ALL_RECORDS_ON_PAGE, CHECK_CHECKBOX, UNCHECK_CHECKBOX} from '../../constants';
import FontAwesome = require('react-fontawesome');
const RadiumFontAwesome: React.ComponentClass<any> = Radium(FontAwesome);

export interface IDataGridStateProps {
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
    max?: number;
    offset?: number;
    properties: string[];
    totalCount?: number;
    handleRecordDelete?: Function;
    showDefaultActions?: boolean;
    customActions?: CustomActionType;
    style?: {
        tdStyle: CSS,
        thStyle: CSS,
        trStyle: CSS,
    };
    isBordered: boolean;
}

export class DataGridImpl extends React.Component<IDataGridProps, void> {

    static defaultProps = {
        showDefaultActions: true,
    };

    private resource: string;
    private properties: string[];

    handleChange = (id: number, event: React.FormEvent): void => {
        // For selectAllOnPage id will be -1
        if (id === -1) {
            if (event.target[`checked`]) {
                this.toggleAllCheckboxes(event.target[`checked`]);
            } else {
                this.props.selectAllRecords(false);
                this.toggleAllCheckboxes(event.target[`checked`]);
            }
            this.props.selectAllRecordsOnPage(event.target[`checked`]);
            return;
        }
        // For selectAll id will be -2
        if (id === -2) {
            this.props.selectAllRecords(event.target[`checked`]);
            return;
        }
        if (event.target[`checked`]) {
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

    getInnerHtml = (property: string, instance: BaseModel, instanceProperties: string[]): JSX.Element | string => {
        if (property.indexOf('.') > 0) {
            let method: Function = instance['getHTML' + property.capitalize().substring(0, property.indexOf('.'))];
            if (method) {
                return method(instanceProperties);
            }
            return getInnerData(instanceProperties, property);
        } else {
            if (instance['getHTML' + property.capitalize()]) {
                return instance['getHTML' + property.capitalize()](instanceProperties);
            }
            if (!instanceProperties[property]) {
                return instanceProperties[property];
            }
            return instanceProperties[property].toString();
        }
    }

    renderSelectAllRecordsCheckbox = (): JSX.Element => {
        let style = this.props.style;

        return (
            <tr style={style.trStyle}>
                <th style={style.thStyle}>
                    <input
                            type="checkbox"
                            onChange={this.handleChange.bind(this, -2)}
                            checked={this.props.selectAll}
                    />
                </th>
                <td colSpan={this.properties.length + 2} style={style.tdStyle}>
                    All <strong>{this.props.instanceList.length}</strong> records visible on this page are selected.
                    Click to select all <strong>{this.props.totalCount}</strong> records.
                </td>
            </tr>
        );
    }

    // type 'any' is intentional.
    renderActions = (instance: any): JSX.Element | React.ComponentClass<any> => {
        let {showDefaultActions, customActions, handleRecordDelete, style} = this.props;
        // TODO: Figure out the type and remove any
        let CustomAction: any = customActions;
        let ActionComponent: React.ComponentClass<any> = getActionComponent(`${this.resource}Action`);

        const tooltip: JSX.Element = (
            <Tooltip id="tooltip"><strong>Remove from List</strong></Tooltip>
        );

        if (CustomAction && typeof CustomAction === 'function') {
            return (
                <td style={style.tdStyle}><CustomAction instance={instance} /></td>
            );
        }

        if (CustomAction && typeof CustomAction === 'object') {
            return <td style={style.tdStyle}>{React.cloneElement(CustomAction, {instance: instance})}</td>;
        }

        if (ActionComponent && React.isValidElement(<ActionComponent/>)) {
            return <td style={style.tdStyle}><ActionComponent instance={instance}/></td>;
        }

        if (showDefaultActions) {
            return (
                <td>
                    <Link style={style.tdStyle} to={`/${this.resource}/edit/${instance.id}`}>
                        <RadiumFontAwesome name="pencil" />
                    </Link>
                    <Link style={style.tdStyle} to={`/${this.resource}/show/${instance.id}`}>
                        <RadiumFontAwesome name="location-arrow" />
                    </Link>
                    <OverlayTrigger placement="top" overlay={tooltip}>
                        <a
                                onClick={handleRecordDelete && handleRecordDelete.bind(this, instance.id)}
                                style={style.tdStyle}
                                id={`delete${instance.id}`}>
                            <RadiumFontAwesome name="trash-o" />
                        </a>
                    </OverlayTrigger>
                </td>
            );
        }

        return null;
    }

    renderCount = (): JSX.Element => {
        let {max, offset, totalCount, style} = this.props;
        if (!max  || !totalCount) {
            return null;
        }

        return (
            <tr style={style.trStyle} id="totalCount">
                <td style={style.tdStyle} colSpan={this.properties.length + 3}>
                    Showing <strong>{offset + 1} - {(totalCount <= offset + max) ? totalCount : offset + max}</strong>
                    &nbsp;of <strong>{totalCount}</strong>
                </td>
            </tr>
        );
    }

    render(): JSX.Element {
        if (!this.props.instanceList || !this.props.instanceList.length) {
            return <div style={{margin: '40px 0px 0px 0px'}}>Sorry, No entry found.</div>;
        }

        this.resource = this.props.instanceList[0] ? this.props.instanceList[0].resourceName : '';

        if (!this.props.properties || !this.props.properties.length) {
        // TODO Better names for the properties array which is supposed to be send by the server.
            this.properties = this.props.instanceList[0].columnNames ||
                    Object.keys(this.props.instanceList[0].properties);
        } else {
            this.properties = this.props.properties;
        }

        let {showDefaultActions, customActions, style, isBordered} = this.props;
        let listIndex: number = this.props.offset + 1;

        return (
            <div className="data-grid">
                <br/><br/>
                <Table responsive striped bordered={isBordered} hover>
                    <thead>
                        {this.props.selectAllOnPage ? this.renderSelectAllRecordsCheckbox() : null}
                        <tr style={style.trStyle} className="data-grid-header">
                            <th style={style.thStyle}>
                                <input
                                        type="checkbox"
                                        checked={this.props.selectAllOnPage &&
                                                this.props.selectedIds.length === this.props.instanceList.length}
                                        onChange={this.handleChange.bind(this, -1)}
                                />
                            </th>
                            <th style={style.thStyle}>#</th>
                            {this.properties.map((property: string, index: number) => {
                                return (<th style={style.thStyle} key={index}>{property.capitalize()}</th>);
                            })}
                            {showDefaultActions || customActions ? <th style={style.thStyle}>Actions</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.instanceList.map((instance, index) => {
                            let instanceProperties = instance.properties;
                            return (
                                <tr style={style.trStyle} key={index} className="data-grid-row">
                                    <td style={style.tdStyle}>
                                        <input
                                                type="checkbox"
                                                checked={this.props.selectedIds &&
                                                        this.props.selectedIds.indexOf(instanceProperties.id) !== -1}
                                                onChange={this.handleChange.bind(this, instanceProperties.id)}/>
                                    </td>
                                    <td style={style.tdStyle}>{listIndex++}</td>
                                    {this.properties.map((property: string, key: number) => {
                                        return (
                                            <td style={style.tdStyle} key={`property-${key}`}>
                                                {this.getInnerHtml(property, instance, instanceProperties)}
                                            </td>
                                        );
                                    })}
                                    {this.renderActions(instanceProperties)}
                                </tr>
                                );
                            })}
                            {this.renderCount()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

let mapStateToProps: MapStateToProps<IDataGridStateProps, IDataGridProps> = (state: IState): IDataGridStateProps => {
    return {
        selectedIds: state.checkbox.selectedIds,
        selectAllOnPage: state.checkbox.selectAllOnPage,
        selectAll: state.checkbox.selectAll,
    };
};

let mapDispatchToProps: MapDispatchToPropsFunction<IDataGridDispatchProps, IDataGridProps> =
        (dispatch): IDataGridDispatchProps => {
    return {
        selectAllRecords: (isChecked: boolean): void => {
            dispatch(selectAllRecords(SELECT_ALL_RECORDS, isChecked));
        },
        selectAllRecordsOnPage: (isChecked: boolean): void => {
            dispatch(selectAllRecords(SELECT_ALL_RECORDS_ON_PAGE, isChecked));
        },
        setChecked: (id: number): void => {
            dispatch(toggleCheckbox(CHECK_CHECKBOX, id));
        },
        setUnchecked: (id: number): void => {
            dispatch(toggleCheckbox(UNCHECK_CHECKBOX, id));
        },
    };
};

let DataGrid: React.ComponentClass<IDataGridProps> = connect(mapStateToProps, mapDispatchToProps)(DataGridImpl);

export {DataGrid};
