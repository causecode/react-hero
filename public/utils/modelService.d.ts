import { BaseModel } from '../models/BaseModel';
declare module ModelService {
    function register(model: typeof BaseModel): void;
    function registerAll(): void;
    function getModel(name: string): typeof BaseModel;
    function hasModel(name: string): boolean;
}
export { ModelService };
