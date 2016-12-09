import * as path from 'path';
import * as TemplateService from './templateService';
import {commandLine} from './commandLine';
import {INVALID_MODEL_NAME} from '../constants';
import {BaseModel} from '../models/BaseModel';
import {projectRoot, typescriptOut} from './projectConfig';

export function generateEditPage(pageType: 'edit' | 'create') {
    TemplateService.parseOptions('modelPath', 'modelName', 'onCancel');

    let modelModule: any = require<any>(
            projectRoot + typescriptOut + commandLine.modelPath
    );

    let ModelClass: typeof BaseModel = modelModule[`${commandLine.modelName.capitalize()}Model`];
    
    if (!ModelClass) {
        throw new Error(INVALID_MODEL_NAME(commandLine.modelName, commandLine.modelPath));
    }

    let {resourceName} = ModelClass;
    let fileName: string = `${resourceName.capitalize()}${pageType === 'create' ? 'Create' : 'Edit'}.tsx`;
    let filePath = `${projectRoot}/src/components/${resourceName}/${fileName}`;

    TemplateService.writeFile(
            path.join(__dirname, filePath), 
            TemplateService.generateFormPage(ModelClass, pageType), () => {}
    );

    /* tslint:disable */
    console.log(`${fileName} File created at src/components/${ModelClass.resourceName}/`);
    /* tslint:enable */
}

export function getListPage() {

    TemplateService.parseOptions('modelName', 'modelPath');

    let modelModule: any = require<any>(
        projectRoot + typescriptOut + commandLine.modelPath
    );

    let ModelClass: typeof BaseModel = modelModule[`${commandLine.modelName.capitalize()}Model`];

    if (!ModelClass) {
        throw new Error(INVALID_MODEL_NAME(commandLine.modelName, commandLine.modelPath));
    }

    let {resourceName} = ModelClass;

    TemplateService.writeFile(
            path.join(__dirname, `${projectRoot}/src/components/${resourceName}/${resourceName.capitalize()}List.tsx`), 
            TemplateService.getListPage(ModelClass), () => {}
    );

    /* tslint:disable */
    console.log(`${resourceName.capitalize()}List.tsx File created at src/components/${resourceName}/`);
    /* tslint:enable */
}

export function getShowPage() {

    TemplateService.parseOptions('modelPath', 'modelName');
    
    let modelModule: any = require<any>(
            projectRoot + typescriptOut + commandLine.modelPath
    );
    let ModelClass: typeof BaseModel = modelModule[`${commandLine.modelName.capitalize()}Model`];

    if (!ModelClass) {
        throw new Error(INVALID_MODEL_NAME(commandLine.modelName, commandLine.modelPath));
    }

    let {resourceName} = ModelClass;

    TemplateService.writeFile(
            path.join(__dirname, `${projectRoot}/src/components/${resourceName}/${resourceName.capitalize()}Show.tsx`), 
            TemplateService.getShowPage(ModelClass), () => {}
    );

    /* tslint:disable */
    console.log(`${resourceName.capitalize()}Show.tsx File created at src/components/${resourceName}/`);
    /* tslint:enable */
}

export function generateAll() {
    generateEditPage('edit');
    generateEditPage('create');
    getShowPage();
    getListPage();
}
