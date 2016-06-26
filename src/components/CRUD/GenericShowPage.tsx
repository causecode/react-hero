/// <reference path="crudInterfaces.d.ts" />
import * as React from 'react';
import {fetchInstanceData} from "../../actions/data";
import {connect} from "react-redux";
import {Table, Row, Col} from 'react-bootstrap';

class GenericShowPage extends React.Component<IInstancePageProps,{}> {

    componentWillMount() {
        const { resource, resourceID } = this.props.params;
        this.props.fetchInstanceData(resource, resourceID);
    }

    render() {
        const { resource, resourceID } = this.props.params;
        const instanceData = this.props.instanceData;
        let instanceKeys = Object.keys(instanceData);
        return (
            <Table responsive bordered className="data-show-table">
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                {instanceKeys.map(key => {
                    return (
                    <tr key={instanceKeys.indexOf(key)}>
                        <td><strong>{key}</strong></td>
                        <td>{instanceData[key]}</td>
                    </tr>
                        )
                    })}
                </tbody>
            </Table>
        );
    }

    /*render() {
        return (
            <div>
                <h1>{this.props.params.resource} Show Page and id is {this.props.params.resourceID}</h1>
            </div>
        )
    }*/
}

function mapStateToProps(state) {
    return {
        instanceData: state.data.get('blogInstance').toJS()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchInstanceData: (resource: string, resourceID: string) => {dispatch(fetchInstanceData(resource, resourceID))}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GenericShowPage)