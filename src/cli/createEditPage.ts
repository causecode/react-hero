#! /usr/bin/env node

import * as _ from 'underscore';
import * as fs from 'fs';
import * as path from 'path';
import {commandLine} from './commandLine';
import {ModelPropTypes} from '../models/BaseModel';
let mkdirp: any = require<any>('mkdirp');

function writeFile(fpath, contents, cb) {
  mkdirp(path.dirname(fpath), function (err) {
    if (err) { return cb(err); };

    fs.writeFile(fpath, contents, cb);
  });
}

Object.prototype.each = (callback: (key: string, value: any) => void) => {
    for (let key in this) {
        if (this.hasOwnProperty(key)) {
            callback(key, this[key]);
        }
    }
};

let projectRoot = commandLine.development ? '../../../..' : '../..';
let config = require<any>(projectRoot + '/tsconfig.json');
if (!config || !config.compilerOptions) {
    throw new Error('Could not find typescript configuration. ' + 
            'Make sure you have created a tsconfig.json in your project root with a rootDir and outDir. ');
}
let typescriptRoot = '/' + config.compilerOptions.rootDir;
let typescriptOut = '/' + config.compilerOptions.outDir;

if (!typescriptRoot) {
    throw new Error('rootDir not defined in tsconfig.json')
}
if (!typescriptOut) {
    throw new Error('outDir not defined in tsconfig.json')
}

let modelModule: any = require<any>(projectRoot + typescriptOut + commandLine.modelPath);

require.extensions['.ejs'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let propTypes = modelModule[`${commandLine.resource.capitalize()}Model`].propTypes;

let inputTemplateString = `<<%= inputType %>Input 
                onChange={this.handleChange}
                instance={instance}
                propertyValue={instance.properties[<%= propertyName %>]}    
                propertyName="<%= propertyName %>"    
            />`;

let inputTemplate = _.template(inputTemplateString);
let widgetMap = {};
for (let key in propTypes) {
    if (propTypes.hasOwnProperty(key)) {
        let templateData : {
            inputType?: string,
            propertyName?: string
        } = {
            propertyName: key
        };
        let inputType : string = '';

        switch (propTypes[key].type) {
            case ModelPropTypes.dateType:
                inputType = 'Date';
                break;
            case ModelPropTypes.arrayType:
                inputType = 'List';
                break;
            case ModelPropTypes.numberType:
                inputType = 'Number';
                break;
                // case ModelPropTypes.objectType:     inputType = 'Object';     break;
            case ModelPropTypes.booleanType:
                inputType = 'Boolean';
                break;
            case ModelPropTypes.enumType:
                inputType = 'DropDown';
                break;
            default:
                inputType = 'String';
                break;
        }

        templateData.inputType = inputType;
        widgetMap[key] = inputTemplate(templateData);
    }
}

let EditTemplate: (...data: any[]) => string = _.template(require<string>('../../templates/EditTemplate.ejs'));
let EditPage = EditTemplate({
    resource: commandLine.resource, 
    modelPath: projectRoot + typescriptRoot + commandLine.modelPath,
    cancelDestination: commandLine.onCancel,
    formControls: widgetMap
});

/* tslint:disable */
console.log(`Edit.tsx File created at src/components/${commandLine.resource}/`);
/* tslint:enable */

writeFile(path.join(__dirname, `${projectRoot}/src/components/${commandLine.resource}/Edit.tsx`), EditPage, () => {});
