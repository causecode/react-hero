#! /usr/bin/env node

import * as path from 'path';
import * as TemplateService from './TemplateService';
import {commandLine} from './commandLine';
import {INVALID_MODEL_NAME} from '../constants';
import {BaseModel} from '../models/BaseModel';
import {projectRoot, typescriptOut} from './projectConfig';
import './init';

generateShowPage();

export function generateShowPage() {

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
            TemplateService.generateShowPage(ModelClass), () => {}
    );

    /* tslint:disable */
    console.log(`${resourceName.capitalize()}Show.tsx File created at src/components/${resourceName}/`);
    /* tslint:enable */
}
