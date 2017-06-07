import * as React from 'react';
import {DropDownFilter} from '../../components/PagedList/Filters/DropDownFilter';
import {PagedList} from '../../components-stateful/PagedList';
import {RangeFilter} from '../../components/PagedList/Filters/RangeFilter';
import {DateRangeFilter} from '../../components/PagedList/Filters/DateRangeFilter';
import {QueryFilter} from '../../components/PagedList/Filters/QueryFilter';
import {Link} from 'react-router-dom';

export interface IUser {
    age: string;
    firstName: string;
    lastName: string;
    id: number;
}

export class UserListPage extends React.Component<{resource: any}, any> {
    static resourceName: string = 'user';

    renderCustomAction = (instance: IUser): JSX.Element => {
        return (
            <button>testAction</button>
        );
    }

    render(): JSX.Element {
        return (
            <div>
                <h1 style={{background : '#eea303'}}>This is my user list page</h1>
                <PagedList
                        resource={this.props.resource}
                        max={10}
                        customActions={TestAction}>
                    <DropDownFilter
                            label = "status"
                            paramName = "status"
                            possibleValues = {[
                                {label: 'Enable', value: 'enable'},
                                {label: 'Disable', value: 'disable'},
                                {label: 'Inactive', value: 'inactive'},
                            ]}
                    />
                    <RangeFilter
                            label = "Bill Amount"
                            paramName = "billAmount"
                    />
                    <DateRangeFilter
                            label = "Date Created"
                            paramName = "dateCreated"
                    />
                    <DropDownFilter
                            label = "types"
                            paramName = "types"
                            possibleValues = {[
                                {label: 'Zoo', value: 'zoo'},
                                {label: 'Jungle', value: 'jungle'},
                                {label: 'Forest', value: 'forest'},
                            ]}
                    />
                    <QueryFilter
                            label = "Search"
                            paramName = "query"
                            placeholder = "First Name, Last Name, Email"
                    />
                </PagedList>
            </div>
        );
    }
}

export class TestAction extends React.Component<{instance: IUser}, void> {

    exportDetails = (): void => {
        alert(this.props.instance.firstName + ' ' + this.props.instance.lastName);
    }

    render() {
        return (
            <div>
                <button onClick={this.exportDetails}>Show Name</button>&nbsp;&nbsp;
                <Link to={`/user/show/${this.props.instance.id}`}>View</Link>
            </div>
        );
    }
}
