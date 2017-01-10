import * as React from 'react';
import {DropDownFilter} from '../../components/PagedList/Filters/DropDownFilter';
import {PagedList} from '../../components-stateful/PagedList';
import {RangeFilter} from '../../components/PagedList/Filters/RangeFilter';
import {DateRangeFilter} from '../../components/PagedList/Filters/DateRangeFilter';
import {QueryFilter} from '../../components/PagedList/Filters/QueryFilter';

export class UserListPage extends React.Component<{resource: any}, any> {
    static resourceName: string = 'user';
    render() {
        return (
            <div>
                <h1 style={{background : 'red'}}>This is MY user list page</h1>
                <PagedList resource={this.props.resource} max={10}>
                    <DropDownFilter
                        label = "status"
                        paramName = "status"
                        possibleValues = {['enable', 'disable', 'inactive']}
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
                        possibleValues = {['Zoo', 'Jungle', 'Forest']}
                    />
                    <QueryFilter
                        label = "Search"
                        paramName = "query"
                        placeholder = {['First Name', 'Last Name', 'Email']}
                    />
                </PagedList>
            </div>
        );
    }
}
