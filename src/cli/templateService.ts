import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'underscore';
import * as appService from '../utils/appService';
import {commandLine} from './commandLine';
import {getModelString, isEmpty} from '../utils/appService';
import {ModelPropTypes} from '../models/ModelPropTypes';
import {BaseModel} from '../models/BaseModel';
import {INVALID_COMMAND_ERROR} from '../constants';
let mkdirp: any = require<any>('mkdirp');
import './cliInit';

interface IFormTemplateData {
    type: string;
    enumInstance: string;
    propertyName: string;
    model: string;
}

export function writeFile(fpath, contents, cb) {
    mkdirp(path.dirname(fpath), function (err) {
        if (err) { return cb(err); };

        fs.writeFile(fpath, contents, cb);
    });
}

export function parseOptions(...options: string[]) {
    let missingOptions: string[] = [];
    options.forEach((option : string) => {
        if (option.indexOf('--') === 0) {
            option = option.slice(2);
        }
        if (!commandLine[option]) {
            missingOptions.push(option);
        }
    });

    if (missingOptions.length) {
        throw new Error(INVALID_COMMAND_ERROR(...missingOptions));
    }
}

export function getListPage(ModelClass: typeof BaseModel) {
    let {resourceName} = ModelClass;
    let {modelName} = commandLine;
    // TODO figure out the type and remove `any`
    let listTemplate: any = _.template(require<string>('../../templates/ListTemplate.ejs'));

    return listTemplate({
        modelName,
        resourceName 
    });
}

function getSubFormPage(propertyName, subPropTypes, model, resourceName) {
    // type `any` is used because it's a generic object.
    let formControls: any = {};
    let {modelName} = commandLine;
    let inputTemplateString: string = `<FormInput 
                                type="<%= type%>" ` + 
                                `<% if (enumInstance) { %>` + ` 
                                enum={<%= enumInstance%>}<% } %>` + `
                                propertyName="<%= propertyName%>"
                                model="<%= model%>"    
                        />`;

    let inputTemplate = _.template(inputTemplateString);
    Object.keys(subPropTypes).forEach((prop: string, index: number) => {
        if (!subPropTypes.hasOwnProperty(prop)) {
            return;
        }

        let currentPropType = subPropTypes[prop];
        let enumInstance: string = currentPropType.enum ? 
                `${modelName.capitalize()}Model.propTypes.${propertyName}.propTypes[\`${prop}\`].enum` : '';
        let templateData: IFormTemplateData = {
            type: currentPropType.type,
            enumInstance,
            propertyName: prop,
            model: model + '.' + prop    
        };

        formControls[prop] = inputTemplate(templateData);
    });
    let SubFormTemplate: (...data: any[]) => string = 
            _.template(require<string>('../../templates/SubFormTemplate.ejs'));
    return SubFormTemplate({
        propertyName,
        formControls
    });
}

export function generateFormPage(ModelClass: typeof BaseModel, pageType: 'edit' | 'create'): string {
    let {resourceName, propTypes} = ModelClass;
    let {modelName} = commandLine;
    
    let formControls: {[key: string]: string} = {};
    let inputTemplateString: string = `<FormInput 
                        type="<%= type%>" ` + 
                        `<% if (enumInstance) { %>` + ` 
                        enum={<%= enumInstance%>}<% } %>` + `
                        propertyName="<%= propertyName%>"
                        model="<%= model%>"    
                />`;

    // TODO figure out the type and remove `any`
    let inputTemplate: any = _.template(inputTemplateString);
    let formModelString: string = resourceName;
    let componentName: string = modelName;
    if (pageType === 'edit') {
        formModelString += 'Edit';
        componentName += 'Edit';
    } else if (pageType === 'create') {
        formModelString += 'Create';
        componentName += 'Create';
    }

    if (!isEmpty(propTypes)) {
        Object.keys(propTypes).forEach((prop: string, index: number) => {
            if (!propTypes.hasOwnProperty(prop)) {
                return;
            }

            let currentPropType = propTypes[prop];

            let model: string = getModelString(formModelString, 'properties', prop);

            if (currentPropType.type === 'object') {
                formControls[prop] = getSubFormPage(
                        prop, 
                        currentPropType.propTypes, 
                        model,
                        resourceName
                );
                return;
            }
            let enumInstance: string = currentPropType.enum ? 
                    `${modelName.capitalize()}Model.propTypes.${prop}.enum` : ''; 
            let templateData: IFormTemplateData = {
                type: currentPropType.type,
                enumInstance,
                propertyName: prop,
                model    
            };

            formControls[prop] = inputTemplate(templateData);
        });
    }

    let editTemplate: (...data: any[]) => string = 
            _.template(require<string>('../../templates/EditTemplate.ejs'));
    return editTemplate({
        modelName, 
        componentName,
        resourceName,
        /* tslint:disable */
        modelPath: `../..${commandLine.modelPath[0] === '/' ? commandLine.modelPath : `/${commandLine.modelPath}`}`, // Assuming the file will always be generated 3 levels deep from the root.
        /* tslint:enable */
        cancelDestination: commandLine.onCancel,
        formControls
    });
}

function getNestedObjectView(propertyName: string, propTypes: any, resourceName: string): string {
    if (appService.isEmpty(propTypes)) {
        throw new Error(`Could not find propTypes while generating show Page for resource ${resourceName}`);
    }
    // TODO figure out the type and remove `any`
    let subShowTemplate: any = _.template(require<string>('../../templates/SubShowTemplate.ejs'));
    let tableRowTemplate: any = _.template(`<tr>
            <td><strong><%= subPropertyName%></strong></td>
            <td>{<%= subPropertyValue%>}</td>
            </tr>`); 
    let tableRowMap = {};   
    Object.keys(propTypes).forEach((prop: string, index: number) => {
        tableRowMap[prop] = tableRowTemplate({
            subPropertyName: prop,
            subPropertyValue: `instance.properties.${propertyName}.${prop}.toString()`
        });
    });

    return subShowTemplate({
        propertyName,
        tableRowMap
    });
}

export function getShowPage(ModelClass: typeof BaseModel): string {
    let {propTypes, resourceName} = ModelClass;
    if (appService.isEmpty(propTypes)) {
        throw new Error(`Could not find propTypes while generating show Page for resource ${resourceName}`);
    }
    // TODO figure out the type and remove `any`
    let showTemplate: any = _.template(require<string>('../../templates/ShowTemplate.ejs'));

    let tableRowTemplate: any = _.template(`<tr>
            <td><strong><%= propertyName%></strong></td>
            <td>{<%= propertyValue%>}</td>
            </tr>`); 

    // type `any` is used because it's a generic object.
    let tableRowMap: any = {};   
    Object.keys(propTypes).forEach((prop: string, index: number) => {
        if (!propTypes.hasOwnProperty(prop)) {
            return;
        }
        let currentPropType = propTypes[prop];
        if (currentPropType.type === ModelPropTypes.objectInputType) {
            tableRowMap[prop] = getNestedObjectView(prop, currentPropType.propTypes, resourceName);
            return;
        }

        tableRowMap[prop] = tableRowTemplate({
            propertyName: prop,
            propertyValue: `instance.properties.${prop}.toString()`
        });
    });
  
    return showTemplate({
        modelName: commandLine.modelName, 
        /* tslint:disable */
        modelPath: `../..${commandLine.modelPath[0] === '/' ? commandLine.modelPath : `/${commandLine.modelPath}`}`, // Assuming the file will always be generated 3 levels deep from the root.
        /* tslint:enable */
        resourceName,
        tableRowMap,
    });
}
