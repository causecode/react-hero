import {commandLine} from './commandLine';
import {getModelString} from '../utils/appService';
import * as fs from 'fs';
import * as _ from 'underscore';
import * as appService from '../utils/appService';
import { ModelPropTypes } from '../models/ModelPropTypes';

require.extensions['.ejs'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};
require.extensions['.css'] = (module, filename) => {
    module.exports = '';
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
let {resource} = commandLine;

interface ITemplateData {
    type: string;
    enumInstance: string;
    key: string;
    propertyName: string;
    model: string;
}

function generateSubFormTemplate(propertyName, subPropTypes, model) {
    let formControls = {};
    Object.keys(subPropTypes).forEach((prop: string, index: number) => {
        if (!subPropTypes.hasOwnProperty(prop)) {
            return;
        }

        let currentPropType = subPropTypes[prop];
        let enumInstance: string = currentPropType.enum ? 
                `${resource.capitalize()}Model.propTypes[\`${propertyName}\`][\`${prop}\`].enum` : '';
        let templateData: ITemplateData = {
            type: currentPropType.type,
            enumInstance,
            key: `form-control-sub-${commandLine.resource}-${index}`,
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

function generateFormTemplate(propTypes: any): string {
    let formControls: {[key: string]: string} = {};
    Object.keys(propTypes).forEach((prop: string, index: number) => {
        if (!propTypes.hasOwnProperty(prop)) {
            return;
        }

        let currentPropType = propTypes[prop];

        if (currentPropType.type === 'object') {
            formControls[prop] = generateSubFormTemplate(
                    prop, 
                    currentPropType.propTypes, 
                    getModelString(resource, 'properties', prop)
            );

            return;
        }
        let enumInstance: string = currentPropType.enum ? 
                `${resource.capitalize()}Model.propTypes[\`${prop}\`].enum` : ''; 
        let templateData: ITemplateData = {
            type: currentPropType.type,
            enumInstance,
            key: `form-control-${resource}-${index}`,
            propertyName: prop,
            model: getModelString(resource, 'properties', prop)    
        };

        formControls[prop] = inputTemplate(templateData);
    });

    let editTemplate: (...data: any[]) => string = 
            _.template(require<string>('../../templates/EditTemplate.ejs'));
    return editTemplate({
        resource: resource, 
        /* tslint:disable */
        modelPath: projectRoot + '/..' + typescriptRoot + commandLine.modelPath, // Assuming the file will always be generated 3 levels deep from the root.
        /* tslint:enable */
        cancelDestination: commandLine.onCancel,
        formControls
    });
}

function generateSubShowPage(propertyName: string, propTypes: any): string {
    if (appService.isEmpty(propTypes)) {
        throw new Error(`Could not find propTypes while generating show Page for resource ${resource}`);
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

function generateShowTemplate(propTypes: any): string {
    if (appService.isEmpty(propTypes)) {
        throw new Error(`Could not find propTypes while generating show Page for resource ${resource}`);
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
            tableRowMap[prop] = generateSubShowPage(prop, currentPropType.propTypes);
            return;
        }

        tableRowMap[prop] = tableRowTemplate({
            propertyName: prop,
            propertyValue: `instance.properties.${prop}.toString()`
        });
    });
  
    return showTemplate({
        resource, 
        tableRowMap,
    });
}

export {projectRoot, typescriptOut, generateFormTemplate, generateShowTemplate};
