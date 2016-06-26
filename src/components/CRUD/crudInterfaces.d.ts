interface IInstancePageProps {
    params?: {
        resource: string;
        resourceID: string;
    };
    fetchInstanceData: (resource: string, resourceID: string) => void;
    instanceData: {}
}