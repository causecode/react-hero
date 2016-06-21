import * as React from 'react';
import Container from '../components/Container';
import { Table } from 'react-bootstrap';

import DataGrid from '../components/DataGrid';
import { fetchInstanceList } from '../actions/data';

const connect = require<any>('react-redux').connect;

interface IListPageProps extends React.Props<any> {
    session: any;
    data: any;
    properties: Array<any>;
    instanceList: Array<any>;
    fetchInstanceList: () => void;
};

function mapStateToProps(state) {
    return {
        session: state.session,
        data: state.data,
        properties: state.data.get('properties', []),
        instanceList: state.data.get('instanceList', []),
        router: state.router,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchInstanceList: () => dispatch(fetchInstanceList()),
    };
}

class ListPage extends React.Component<IListPageProps, void> {

    componentWillMount() {
        this.props.fetchInstanceList();
    };

    render() {
        const { data, instanceList, properties } = this.props;
        const totalCount = 10;

        return (
            <Container size={4} center>
                <h2 className="caps">Page List</h2>
                <DataGrid
                    instanceList={ instanceList }
                    properties={ properties }
                    totalCount={ totalCount }
                    clazz="user" />
            </Container>
        );
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPage);