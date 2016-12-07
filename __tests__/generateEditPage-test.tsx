jest.unmock('../src/cli/generatorService');
jest.unmock('../src/cli/commandLine');
jest.unmock('../src/cli/templateService');
import {generateEditPage} from '../src/cli/generatorService';
import {ModelPropTypes} from '../src/models/ModelPropTypes';
import {INVALID_COMMAND_ERROR, INVALID_MODEL_NAME} from '../src/constants';
import {BaseModel} from '../src/models/BaseModel';
import * as fs from 'fs';
import * as path from 'path';
let TemplateService = require<any>('../src/cli/templateService');

let {projectRoot, typescriptOut} = TemplateService;

const unroll = require<any>('unroll');

unroll.use(it);

let testPropTypes = {
    id: ModelPropTypes.NUMBER()
};
let testResource: string = 'test';

class TestModel extends BaseModel {
    static resourceName: string = testResource;
    static defaultProps = {};
    static propTypes = testPropTypes;
    
    constructor(props) {
         super(props);
    }
}

let testModelPath: string = 'test/Model';
let testModelName: string = 'Test'; 
let testOnCancelRoute: string = 'test/ModelName'; 

describe('Test generateEditPage function', () => {

    require = jest.fn((path: string) => {
        return {TestModel};
    }) as any;

    unroll(`should throw an Error with the missing commandLine arguments #missingArgs in the error message`, 
            (done, testArgs) => {
        process.argv = testArgs.argv;

        expect(() => {
            generateEditPage();
        }).toThrow(new Error(INVALID_COMMAND_ERROR(...testArgs.missingArgs)));
        done();
    }, [
        ['argv', 'missingArgs'],
        [[], ['modelPath', 'modelName', 'onCancel']],
        [['--modelPath', testModelPath], ['modelName', 'onCancel']],
        [['--modelPath', testModelPath, '--modelName', testModelName], ['onCancel']],
    ]);

    it('should throw an error if invalid model name is specified', () => {
        let invalidModelName = 'abcc';
        process.argv = ['--modelPath', testModelPath, '--modelName', invalidModelName, '--onCancel', testOnCancelRoute];
        
        expect(() => generateEditPage()).toThrow(new Error(INVALID_MODEL_NAME(invalidModelName, testModelPath)));
    }); 

    it('should call the method write file method of fs with the correct file path and form content', () => {
        let testForm = 'testForm';
        process.argv = ['--modelPath', testModelPath, '--modelName', testModelName, '--onCancel', testOnCancelRoute];
        __dirname = '';
        TemplateService.generateFormTemplate = () => testForm;
        generateEditPage();

        expect(require).toBeCalledWith(projectRoot + typescriptOut + testModelPath);
        expect(fs.writeFile).toBeCalledWith(
                path.join(__dirname, `${projectRoot}/src/components/${testResource}/Edit.tsx`),
                testForm
        );
    });

});
