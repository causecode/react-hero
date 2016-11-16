#! /usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as TemplateService from './TemplateService';
import {commandLine, InvalidCommandError} from './commandLine';
let mkdirp: any = require<any>('mkdirp');

generateEditPage();

export function generateEditPage() {
    let argv = process.argv;
    if (argv.indexOf('--modelPath') === -1) {
        throw InvalidCommandError('modelPath');
    }

    if (argv.indexOf('--resource') === -1) {
        throw InvalidCommandError('resource');
    }

    if (argv.indexOf('--onCancel') === -1) {
        throw InvalidCommandError('onCancel');
    }

    let {projectRoot, typescriptOut} = TemplateService;

    let modelModule: any = require<any>(
            projectRoot + typescriptOut + commandLine.modelPath
    );

    let Model;
    Object.keys(modelModule).forEach((key: string) => {
        if (!modelModule.hasOwnProperty(key)) {
            return;
        }

        if (modelModule[key].resourceName === commandLine.resource) {
            Model = modelModule[key];
        }
    });

    if (!Model) {
        throw new Error('Model Class not found in file specified in modePath');
    }

    let propTypes = modelModule[`${commandLine.resource.capitalize()}Model`].propTypes;

    function writeFile(fpath, contents, cb) {
    mkdirp(path.dirname(fpath), function (err) {
        if (err) { return cb(err); };

        fs.writeFile(fpath, contents, cb);
    });
    }

    writeFile(
            path.join(__dirname, `${projectRoot}/src/components/${commandLine.resource}/Edit.tsx`), 
            TemplateService.generateFormTemplate(propTypes), () => {}
    );

    /* tslint:disable */
    console.log(`Edit.tsx File created at src/components/${commandLine.resource}/`);
    /* tslint:enable */
}

