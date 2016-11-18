import * as path from 'path';
import * as TemplateService from './TemplateService';
import {projectRoot, typescriptOut} from './projectConfig';
import {commandLine} from './commandLine';
import {BaseModel} from '../models/BaseModel';
import {INVALID_MODEL_NAME} from '../constants';
import './init';

generateListPage();

export function generateListPage() {

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
            TemplateService.generateListPage(ModelClass), () => {}
    );

    /* tslint:disable */
    console.log(`${resourceName.capitalize()}List.tsx File created at src/components/${resourceName}/`);
    /* tslint:enable */
}
