/// <reference path="crudInterfaces.d.ts" />
import * as React from 'react';
import {fetchInstanceData} from "../../actions/instanceActions";
import {connect} from "react-redux";
import {Table, Row, Col} from 'react-bootstrap';
import BaseModel from "../../models/BaseModel";

class GenericShowPage extends React.Component<IInstancePageProps,{}> {

    componentWillMount() {
        const { resource, resourceID } = this.props.params;
        this.props.fetchInstanceData(resource, resourceID);
    }

    render() {
        const { resource, resourceID } = this.props.params;
        const instanceData: JSON = this.props.instances[resource] ? this.props.instances[resource].instanceData : {};
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
}

function mapStateToProps(state) {
    let instances: JSON = state.instances.toJS();
    return {
        instances: instances
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