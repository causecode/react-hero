declare interface IRouteParams {
    resource: string;
    resourceID?: string;
}

declare interface IInstanceContainerProps {
    params: IRouteParams;
    fetchInstanceData: (resource: string, resourceID: string) => void;
    instances: IBaseModel[];
}

declare interface IGenericEditPageState {
    instance: IBaseModel;
}

declare interface IInstancePageProps {
    instance: IBaseModel;
    resource?: string;
}
