#! /usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as TemplateService from './TemplateService';
import {commandLine, InvalidCommandError} from './commandLine';
let mkdirp: any = require<any>('mkdirp');
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

