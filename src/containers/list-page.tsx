import * as React from 'react';
import Container from '../components/Container';
import { Table } from 'react-bootstrap';

import DataGrid from '../components/DataGrid';
import { fetchInstanceList } from '../actions/data';

const connect = require<any>('react-redux').connect;

interface IListPageProps extends React.Props<any> {
    session: any;
    data: any;
    instanceList: Array<any>;
    fetchInstanceList: () => void;
};

function mapStateToProps(state) {
    return {
        session: state.session,
        data: state.data,
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

    componentDidMount() {
        console.log('<<<<<<componentDidMount');
        this.props.fetchInstanceList();
    };

    render() {
        // const { instanceList } = this.props;
        const { data, instanceList } = this.props;
        //const instanceList = data.get('instanceList', []);

        console.log('<<<inital instanceList', instanceList);
        console.log('<<<inital data', data);
        const properties = ["author", "blogImgSrc", "body", "id", "lastUpdated", "numberOfComments", "publishedDate", "subTitle", "title"];
        const totalCount = 10;

        return (
            <Container size={4} center>
                <h2 className="caps">Page List</h2>
                <p>
                    data: {data}<br/>
                    instanceList1: {instanceList}<br/>
                    instanceList2: {instanceList[0]}<br/>
                </p>
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