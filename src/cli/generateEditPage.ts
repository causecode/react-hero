#! /usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as TemplateService from './TemplateService';
import {commandLine} from './commandLine';
import {INVALID_COMMAND_ERROR} from '../constants';
let mkdirp: any = require<any>('mkdirp');

generateEditPage();

export function generateEditPage() {
    let argv = process.argv;
    if (argv.indexOf('--modelPath') === -1) {
        throw new Error(INVALID_COMMAND_ERROR('modelPath'));
    }

    if (argv.indexOf('--modelName') === -1) {
        throw new Error(INVALID_COMMAND_ERROR('modelName'));
    }

    if (argv.indexOf('--onCancel') === -1) {
        throw new Error(INVALID_COMMAND_ERROR('onCancel'));
    }

    let {projectRoot, typescriptOut} = TemplateService;

    let modelModule: any = require<any>(
            projectRoot + typescriptOut + commandLine.modelPath
    );

    let ModelClass = modelModule[`${commandLine.modelName.capitalize()}Model`]
    // let propTypes = ModelClass.propTypes;

    function writeFile(fpath, contents, cb) {
    mkdirp(path.dirname(fpath), function (err) {
        if (err) { return cb(err); };

        fs.writeFile(fpath, contents, cb);
    });
    }

    writeFile(
            path.join(__dirname, `${projectRoot}/src/components/${ModelClass.resourceName}/Edit.tsx`), 
            TemplateService.generateFormTemplate(ModelClass), () => {}
    );

    /* tslint:disable */
    console.log(`Edit.tsx File created at src/components/${ModelClass.resourceName}/`);
    /* tslint:enable */
}

