import * as path from 'path';
import * as TemplateService from './templateService';
import {commandLine} from './commandLine';
import {INVALID_MODEL_NAME} from '../constants';
import {BaseModel} from '../models/BaseModel';
import {projectRoot, typescriptOut} from './projectConfig';

export function getEditPage(pageType: 'edit' | 'create') {
    TemplateService.parseOptions('modelPath', 'modelName', 'onCancel');

    let modelModule: any = require<any>(`${projectRoot}${typescriptOut}${commandLine.modelPath}`);

    let ModelClass: typeof BaseModel = modelModule[`${commandLine.modelName.capitalize()}Model`];

    if (!ModelClass) {
        throw new Error(INVALID_MODEL_NAME(commandLine.modelName, commandLine.modelPath));
    }

    let {resourceName} = ModelClass;
    let fileName: string = `${resourceName.capitalize()}${pageType === 'create' ? 'Create' : 'Edit'}.tsx`;
    let filePath: string = `${projectRoot}/app/containers/${resourceName}/${fileName}`;

    TemplateService.writeFile(
            path.join(__dirname, filePath),
            TemplateService.generateFormPage(ModelClass, pageType), () => {}
    );

    /* tslint:disable */
    console.log(`${fileName} File created at app/containers/${ModelClass.resourceName}/`);
    /* tslint:enable */
}

export function getListPage() {

    TemplateService.parseOptions('modelName', 'modelPath');

    let modelModule: any = require<any>(`${projectRoot}${typescriptOut}${commandLine.modelPath}`);

    let ModelClass: typeof BaseModel = modelModule[`${commandLine.modelName.capitalize()}Model`];

    if (!ModelClass) {
        throw new Error(INVALID_MODEL_NAME(commandLine.modelName, commandLine.modelPath));
    }

    let {resourceName} = ModelClass;

    TemplateService.writeFile(
            path.join(__dirname, `${projectRoot}/app/containers/${resourceName}/${resourceName.capitalize()}List.tsx`),
            TemplateService.getListPage(ModelClass), () => {}
    );

    /* tslint:disable */
    console.log(`${resourceName.capitalize()}List.tsx File created at app/containers/${resourceName}/`);
    /* tslint:enable */
}

export function getShowPage() {

    TemplateService.parseOptions('modelPath', 'modelName');

    let modelModule: any = require<any>(`${projectRoot}${typescriptOut}${commandLine.modelPath}`);
    let ModelClass: typeof BaseModel = modelModule[`${commandLine.modelName.capitalize()}Model`];

    if (!ModelClass) {
        throw new Error(INVALID_MODEL_NAME(commandLine.modelName, commandLine.modelPath));
    }

    let {resourceName} = ModelClass;

    TemplateService.writeFile(
            path.join(__dirname, `${projectRoot}/app/containers/${resourceName}/${resourceName.capitalize()}Show.tsx`),
            TemplateService.getShowPage(ModelClass), () => {}
    );

    /* tslint:disable */
    console.log(`${resourceName.capitalize()}Show.tsx File created at app/containers/${resourceName}/`);
    /* tslint:enable */
}

export function generateAll(): void {
    getEditPage('edit');
    getEditPage('create');
    getShowPage();
    getListPage();
}
