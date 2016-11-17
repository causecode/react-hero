import {commandLine} from './commandLine';
import {getModelString, isEmpty} from '../utils/appService';
import * as fs from 'fs';
import * as _ from 'underscore';
import * as appService from '../utils/appService';
import {ModelPropTypes} from '../models/ModelPropTypes';
import {BaseModel} from '../models/BaseModel';

require.extensions['.ejs'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};
require.extensions['.css'] = (module, filename) => {
    module.exports = '';
};

let projectRoot = commandLine.development ? '../..' : '../../../..';

let config = require<any>(projectRoot + '/tsconfig.json');
if (!config || !config.compilerOptions) {
    throw new Error('Could not find typescript configuration. ' + 
            'Make sure you have created a tsconfig.json in your project root with a rootDir and outDir. ');
}
let typescriptRoot = '/' + config.compilerOptions.rootDir;
let typescriptOut = '/' + config.compilerOptions.outDir;

if (!typescriptRoot) {
    throw new Error('rootDir not defined in tsconfig.json');
}
if (!typescriptOut) {
    throw new Error('outDir not defined in tsconfig.json');
}

let inputTemplateString = `<FormInput 
                        type="<%= type%>"
                        <% if (enumInstance) { %>enum={<%= enumInstance%>}<% } %>
                        key="<%= key%>"
                        propertyName="<%= propertyName%>"
                        model="<%= model%>"    
                />`;

let inputTemplate = _.template(inputTemplateString);

interface ITemplateData {
    type: string;
    enumInstance: string;
    key: string;
    propertyName: string;
    model: string;
}

function generateSubFormTemplate(propertyName, subPropTypes, model, resourceName) {
    let formControls = {};
    let {modelName} = commandLine;
    Object.keys(subPropTypes).forEach((prop: string, index: number) => {
        if (!subPropTypes.hasOwnProperty(prop)) {
            return;
        }

        let currentPropType = subPropTypes[prop];
        let enumInstance: string = currentPropType.enum ? 
                `${modelName.capitalize()}Model.propTypes[\`${propertyName}\`][\`${prop}\`].enum` : '';
        let templateData: ITemplateData = {
            type: currentPropType.type,
            enumInstance,
            key: `form-control-sub-${resourceName}-${index}`,
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

function generateFormTemplate(ModelClass: typeof BaseModel): string {
    let {resourceName, propTypes} = ModelClass;
    let {modelName} = commandLine;
    let formControls: {[key: string]: string} = {};
    if (!isEmpty(propTypes)) {
        Object.keys(propTypes).forEach((prop: string, index: number) => {
            if (!propTypes.hasOwnProperty(prop)) {
                return;
            }

            let currentPropType = propTypes[prop];

            if (currentPropType.type === 'object') {
                formControls[prop] = generateSubFormTemplate(
                        prop, 
                        currentPropType.propTypes, 
                        getModelString(resourceName, 'properties', prop),
                        resourceName
                );

                return;
            }
            let enumInstance: string = currentPropType.enum ? 
                    `${modelName.capitalize()}Model.propTypes[\`${prop}\`].enum` : ''; 
            let templateData: ITemplateData = {
                type: currentPropType.type,
                enumInstance,
                key: `form-control-${resourceName}-${index}`,
                propertyName: prop,
                model: getModelString(resourceName, 'properties', prop)    
            };

            formControls[prop] = inputTemplate(templateData);
        });
    }

    let editTemplate: (...data: any[]) => string = 
            _.template(require<string>('../../templates/EditTemplate.ejs'));
    return editTemplate({
        modelName, 
        /* tslint:disable */
        modelPath: projectRoot + '/..' + typescriptRoot + commandLine.modelPath, // Assuming the file will always be generated 3 levels deep from the root.
        /* tslint:enable */
        cancelDestination: commandLine.onCancel,
        formControls
    });
}

function generateSubShowPage(propertyName: string, propTypes: any, resourceName: string): string {
    if (appService.isEmpty(propTypes)) {
        throw new Error(`Could not find propTypes while generating show Page for resource ${resourceName}`);
    }
    let subShowTemplate = _.template(require<string>('../../templates/SubShowTemplate.ejs'));
    let tableRowTemplate = _.template(`<tr>
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
        tableRowMap
    });
}

function generateShowTemplate(ModelClass: typeof BaseModel): string {
    let {propTypes, resourceName} = ModelClass;
    if (appService.isEmpty(propTypes)) {
        throw new Error(`Could not find propTypes while generating show Page for resource ${resourceName}`);
    }
    let showTemplate = _.template(require<string>('../../templates/ShowTemplate.ejs'));

    let tableRowTemplate = _.template(`<tr>
                        <td><strong><%= propertyName%></strong></td>
                        <td>{<%= propertyValue%>}</td>
                    </tr>`); 

    let tableRowMap = {};   
    Object.keys(propTypes).forEach((prop: string, index: number) => {
        if (!propTypes.hasOwnProperty(prop)) {
            return;
        }
        let currentPropType = propTypes[prop];
        if (currentPropType.type === ModelPropTypes.objectInputType) {
            tableRowMap[prop] = generateSubShowPage(prop, currentPropType.propTypes, resourceName);
            return;
        }

        tableRowMap[prop] = tableRowTemplate({
            propertyName: prop,
            propertyValue: `instance.properties.${prop}.toString()`
        });
    });
  
    return showTemplate({
        modelName: commandLine.modelName, 
        tableRowMap,
    });
}

export {projectRoot, typescriptOut, generateFormTemplate, generateShowTemplate};
