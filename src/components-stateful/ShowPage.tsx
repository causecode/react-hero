import * as React from 'react';
import {BaseModel} from '../models/BaseModel';
import {GenericShowPage} from './../components/CRUD/GenericShowPage';
import {ComponentService} from '../utils/componentService';
const connect: any = require<any>('react-redux').connect;
import {ModelService} from '../utils/modelService';
import {IInstanceContainerProps} from '../interfaces/interfaces';
import {ComponentType} from '../utils/componentService';
import {PAGE_NOT_FOUND} from '../constants';
import {ErrorPage} from '../components/ErrorPage';

export class ShowPageImpl extends React.Component<IInstanceContainerProps, void> {

    static defaultProps: IInstanceContainerProps = {
        instance: new BaseModel({}),
        params: {resource: '', resourceID: ''}
    };

    fetchInstanceData(resource: string , resourceID: string) {
        ModelService.getModel(resource).get(resourceID);
    }

    componentWillMount() {
        const { resource, resourceID } = this.props.params;
        this.fetchInstanceData(resource, resourceID);
    }

    render() {
        if (!(this.props.instance instanceof BaseModel)) {
            return (
                <ErrorPage message={PAGE_NOT_FOUND} />
            );
        }
        const resource = this.props.params.resource;
        const childProps = {instance: this.props.instance, resource: resource};
        let Page: React.ComponentClass<void> = ComponentService.getShowPage(resource) as React.ComponentClass<void>;
        return (
            <Page {...childProps}/>
        );
    }
}

function mapStateToProps(state, ownProps): {instance: BaseModel} {
    let instance: BaseModel = state.instances.get(`${ownProps.params.resource}Edit`);
    return {
        instance
    };
}

let ShowPage = connect(
    mapStateToProps
)(ShowPageImpl);

export {ShowPage};