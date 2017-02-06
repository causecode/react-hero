import * as React from 'react';
import {DropDownFilter} from '../../components/PagedList/Filters/DropDownFilter';
import {PagedList} from '../../components-stateful/PagedList';
import {QueryFilter} from '../../components/PagedList/Filters/QueryFilter';
import {RangeFilter} from '../../components/PagedList/Filters/RangeFilter';
import {DateRangeFilter} from '../../components/PagedList/Filters/DateRangeFilter';

export class BlogListPage extends React.Component<{resource: string}, void> {
    static resourceName: string = 'blog';

    render(): JSX.Element {
        return (
            <div>
                <h1>This is a list page</h1>
                <PagedList resource={this.props.resource} max={10}>
                    <DropDownFilter
                            label="status"
                            paramName="status"
                            possibleValues = {[
                                {label: 'Enable', value: 'enable'},
                                {label: 'Disable', value: 'disable'},
                                {label: 'Inactive', value: 'inactive'}
                            ]}
                    />
                    <RangeFilter
                            type="number"
                            label="Bill Amount"
                            paramName="billAmount"
                    />
                    <DateRangeFilter
                            label="Date Created"
                            paramName="dateCreated"
                    />
                    <DropDownFilter
                            label="types"
                            paramName="types"
                            possibleValues = {[
                                {label: 'Zoo', value: 'zoo'},
                                {label: 'Jungle', value: 'jungle'},
                                {label: 'Forest', value: 'forest'}
                            ]}
                    />
                    <QueryFilter
                            label="Search"
                            paramName="query"
                            placeholder="First Name, Last Name, Email"
                    />
                </PagedList>
            </div>
        );
    }
}
