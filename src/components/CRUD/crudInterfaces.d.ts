interface IInstancePageProps<T> {
    params?: {
        resource: string;
        resourceID: string;
    };
    fetchInstanceData: (resource: string, resourceID: string) => void;
    model: T
}