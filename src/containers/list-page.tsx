import * as React from 'react';
import Container from '../components/Container';
import { Table, Pagination } from 'react-bootstrap';

import PagedListFilters from '../components/PagedList/Filters';
import DataGrid from '../components/PagedList/DataGrid';
import { fetchInstanceList } from '../actions/data';

const connect = require<any>('react-redux').connect;

interface IListPageProps extends React.Props<any> {
    properties: Array<any>;
    instanceList: any;
    totalCount: number;
    fetchInstanceList: (resource: string, filter: IFilter) => void;
}

export interface IFilter {
    offset?: number;
    sort?: 'asc' | 'desc';
}

interface IListPageState {
    activePage: number;
}

function mapStateToProps(state) {
    return {
        properties: state.data.get('properties', []),
        instanceList: state.data.get('instanceList', []),
        totalCount:  state.data.get('totalCount', 0),
        router: state.router,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchInstanceList: (resource: string, filter: IFilter) => dispatch(fetchInstanceList(resource, filter)),
    };
}

class ListPage extends React.Component<IListPageProps, IListPageState> {

    itemsPerPage: number;
    constructor() {
        super();
        this.state = {activePage : 1}
    }

    componentWillMount() {
        this.props.fetchInstanceList('blog', {offset: 0});
    };

    setItemsPerPage(itemsPerPage: number) {
        if (!this.itemsPerPage) {
            this.itemsPerPage = itemsPerPage;
        }
    }

    render() {
        const { instanceList, properties, totalCount } = this.props;
        const { activePage } = this.state;
        this.setItemsPerPage(instanceList.size);
        const setPage = (pageNumber: number) => {
            this.props.fetchInstanceList('blog', {offset: (( pageNumber - 1 ) * this.itemsPerPage)});
            this.setState({activePage: pageNumber});
        };

        return (
            <Container size={4} center>
                <h2 className="caps">Page List</h2>

                <PagedListFilters
                    clazz="blog"
                    dropdown={[{name: 'status', possibleValues: ['enable', 'disable', 'inactive']}, {name: 'types', possibleValues: ['poopopo', 'momomo', 'chohchocho']}]}
                />
                <DataGrid
                    instanceList={ instanceList }
                    properties={ properties }
                    totalCount={ totalCount }
                    clazz="blog" />

                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={Math.ceil(totalCount / this.itemsPerPage)}
                    maxButtons={5}
                    activePage={activePage}
                    onSelect={setPage} />

            </Container>
        );
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPage);