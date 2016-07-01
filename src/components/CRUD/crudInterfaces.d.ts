interface IRouteParams {
    resource: string;
    resourceID?: string;
}
interface IInstancePageProps {
    params: IRouteParams;
    fetchInstanceData: (resource: string, resourceID: string) => void;
    instances: JSON
}