import * as React from 'react';
import {DefaultModel, BaseModel} from '../models/BaseModel';
import {ComponentService} from '../utils/componentService';
const connect: any = require<any>('react-redux').connect;
import {ModelService} from '../utils/modelService';
import {IInstanceContainerProps} from '../interfaces';
import {PAGE_NOT_FOUND} from '../constants';
import {ErrorPage} from '../components/ErrorPage';
import {store} from '../store';

export class ShowPageImpl extends React.Component<IInstanceContainerProps, void> {

    static defaultProps: IInstanceContainerProps = {
        instance: new DefaultModel({}),
        params: {resource: '', resourceID: ''}
    };

    fetchInstanceData(resource: string , resourceID: string): void {
        ModelService.getModel(resource).get(resourceID, false, {}, () => {}, () => {}, store.getState(), 'edit');
    }

    componentWillMount(): void {
        const {resource, resourceID} = this.props.params;
        this.fetchInstanceData(resource, resourceID);
    }

    render(): JSX.Element {
        if (!(this.props.instance instanceof BaseModel)) {
            return (
                <ErrorPage message={PAGE_NOT_FOUND} />
            );
        }
        const resource: string = this.props.params.resource;
        const childProps = {instance: this.props.instance, resource: resource};
        let Page: React.ComponentClass<void> = ComponentService.getShowPage(resource) as React.ComponentClass<void>;
        return (
            <Page {...childProps}/>
        );
    }
}

function mapStateToProps(state, ownProps): {instance: BaseModel} {
    let instance: BaseModel = ModelService.getModel(ownProps.params.resource)
            .get<BaseModel>(ownProps.params.resourceID, true, {}, () => {}, () => {}, state, 'edit');
    return {
        instance
    };
}

let ShowPage = connect(
    mapStateToProps
)(ShowPageImpl);

export {ShowPage};
