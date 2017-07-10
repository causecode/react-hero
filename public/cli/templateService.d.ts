import { BaseModel } from '../models/BaseModel';
import './cliInit';
export declare function writeFile(fpath: any, contents: any, cb: any): void;
export declare function parseOptions(...options: string[]): void;
export declare function getListPage(ModelClass: typeof BaseModel): any;
export declare function generateFormPage(ModelClass: typeof BaseModel, pageType: 'edit' | 'create'): string;
export declare function getShowPage(ModelClass: typeof BaseModel): string;
