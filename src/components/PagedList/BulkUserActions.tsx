import * as React from 'react';
import * as Radium from 'radium';
import {Button} from 'react-bootstrap';
import {store} from '../../store';
import {MapStateToProps, connect} from 'react-redux';
import {saveUserAction, saveUserActionData} from '../../actions/userActions';
import {IBulkUserActionType} from '../../interfaces';

export interface IUserActionStateProps {
    action?: string;
    selectedIds?: number[];
    selectAllOnPage?: boolean;
    selectAll?: boolean;
    totalCount?: number; 
}

export interface IUserActionProps extends IUserActionStateProps {
    isDisabled: boolean;
    userActionsMap?: IBulkUserActionType[];
    style?: React.CSSProperties;
}

export interface IState {
    userAction: {action: string};
    checkbox: {selectedIds: number[], selectAll: boolean, selectAllOnPage: boolean};
}

@Radium
export class UserActionsImpl extends React.Component<IUserActionProps, void> {
    
    private listItems: string[] = ['--User Action--'];
    
    componentWillMount = (): void => {
        if (this.props.userActionsMap && this.props.userActionsMap.length > 0) {
            let actionMap: IBulkUserActionType[] = this.props.userActionsMap;
            actionMap.forEach((action: IBulkUserActionType) => {
                if (this.listItems.indexOf(action.label) === -1) {
                    this.listItems.push(action.label);
                }
            });
        }
    }

    renderDropDownItems = (): JSX.Element[] => {
        let list: JSX.Element[] = [];
        this.listItems.forEach((item: string, index: number) => {
            list.push(
                <option value={item} key={index}>
                    {item}
                </option>
            );
        });
        return list;
    }

    saveAction = (event: React.FormEvent): void => {
        store.dispatch(saveUserAction(event.target[`value`]));
    }

    performAction = (): void => {
        const {userActionsMap} = this.props;
        // Using every as we cannot break from forEach loop.
        // http://stackoverflow.com/questions/6260756/how-to-stop-javascript-foreach  
        userActionsMap.every((item: IBulkUserActionType): boolean => {
            if (item.label === this.props.action) {
                this.saveUserActionData();
                item.action();
                return false;
            }
            return true;
        });  
    }

    saveUserActionData = (): void => {
        let records: number = this.props.selectAll ? this.props.totalCount : 
                this.props.selectedIds && this.props.selectedIds.length;
        store.dispatch(saveUserActionData(records));
    }

    render(): JSX.Element {
        return (
            <div style={this.props.style || rightStyle}>
                <select
                        value={this.props.action}
                        onChange={this.saveAction}
                        disabled={this.props.selectedIds.length === 0}
                        style={this.props.selectedIds.length === 0 ? [disabledStyle, dropDownStyle] : dropDownStyle}
                 >
                    {this.renderDropDownItems()}
                </select>
                <Button 
                        disabled={this.props.action === this.listItems[0] || this.props.selectedIds.length === 0}
                        onClick={this.performAction}
                        style={(this.props.action === this.listItems[0] || this.props.selectedIds.length === 0) ?
                                disabledStyle : null}
                 >
                    Go
                </Button>
            </div>
        );
    }
}

let mapStateToProps: MapStateToProps<IUserActionStateProps, IUserActionProps> = 
        (state: IState): IUserActionStateProps => {
    return {
        action: state.userAction.action,
        selectedIds: state.checkbox.selectedIds,
        selectAllOnPage: state.checkbox.selectAllOnPage,
        selectAll: state.checkbox.selectAll,
    };
};

let UserActions: React.ComponentClass<IUserActionProps> = connect(mapStateToProps)(UserActionsImpl);

export {UserActions};

const rightStyle: React.CSSProperties = {
    textAlign: 'right',
};
const dropDownStyle: React.CSSProperties = {
    textAlign: 'center',
    border: '1px solid #d9d9d9',
    borderRadius: '3px',
    display: 'inline-block',
    fontSize: '12px',
    fontFamily: 'Lato, arial, sans-serif',
    maxWidth: '150px',
    minHeight: '35px',
    padding: '5px 10px',
    transition: 'border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s',
    margin: '0px 5px',
};
const disabledStyle: React.CSSProperties = {
    background: '#eee none repeat scroll 0% 0% / auto padding-box border-box',
    cursor: 'not-allowed',
};
