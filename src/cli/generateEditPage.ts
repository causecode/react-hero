#! /usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as TemplateService from './TemplateService';
import {commandLine} from './commandLine';
import {INVALID_COMMAND_ERROR, INVALID_MODEL_NAME} from '../constants';
import './init';
import {BaseModel} from '../models/BaseModel';
let mkdirp: any = require<any>('mkdirp');

generateEditPage();

export function generateEditPage() {
    let argv = process.argv;

    let missingOptions: string[] = [];
    if (argv.indexOf('--modelPath') === -1) {
        missingOptions.push('modelPath');
    }

    if (argv.indexOf('--modelName') === -1) {
        missingOptions.push('modelName');
    }

    if (argv.indexOf('--onCancel') === -1) {
        missingOptions.push('onCancel');
    }

    if (missingOptions.length) {
        throw new Error(INVALID_COMMAND_ERROR(...missingOptions));
    }

    let {projectRoot, typescriptOut} = TemplateService;

    let modelModule: any = require<any>(
            projectRoot + typescriptOut + commandLine.modelPath
    );

    let ModelClass: typeof BaseModel = modelModule[`${commandLine.modelName.capitalize()}Model`];
    
    if (!ModelClass) {
        throw new Error(INVALID_MODEL_NAME(commandLine.modelName, commandLine.modelPath));
    }

    function writeFile(fpath, contents, cb) {
        mkdirp(path.dirname(fpath), function (err) {
            if (err) { return cb(err); };

            fs.writeFile(fpath, contents, cb);
        });
    }

    writeFile(
            path.join(__dirname, `${projectRoot}/src/components/${ModelClass.resourceName}/Edit.tsx`), 
            TemplateService.generateFormPage(ModelClass), () => {}
    );

    /* tslint:disable */
    console.log(`Edit.tsx File created at src/components/${ModelClass.resourceName}/`);
    /* tslint:enable */
}

