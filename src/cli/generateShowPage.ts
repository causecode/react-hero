#! /usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as TemplateService from './TemplateService';
import {commandLine} from './commandLine';
import {INVALID_COMMAND_ERROR, INVALID_MODEL_NAME} from '../constants';
let mkdirp: any = require<any>('mkdirp');

generateShowPage();

export function generateShowPage() {
    let argv = process.argv;

    let missingOptions: string[] = [];
    if (argv.indexOf('--modelName') === -1) {
        missingOptions.push('modelName');
    }

    if (argv.indexOf('--modelPath') === -1) {
        missingOptions.push('modelPath');
    }

    if (missingOptions.length) {
        throw new Error(INVALID_COMMAND_ERROR(...missingOptions));
    }

    let {projectRoot, typescriptOut} = TemplateService;

    let modelModule: any = require<any>(
            projectRoot + typescriptOut + commandLine.modelPath
    );
    let ModelClass = modelModule[`${commandLine.modelName.capitalize()}Model`];

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
            path.join(__dirname, `${projectRoot}/src/components/${ModelClass.resource}/Show.tsx`), 
            TemplateService.generateShowTemplate(ModelClass), () => {}
    );

    /* tslint:disable */
    console.log(`Show.tsx File created at src/components/${ModelClass.resource}/`);
    /* tslint:enable */
}
