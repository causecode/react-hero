export default class InstanceLoader {
    static instantiate<T>(ctor: { new(...args: any[]): T }, args): T {
        return new ctor(...args);
    }
}
