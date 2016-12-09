jest.unmock('../src/cli/TemplateService');

import * as TemplateService from '../src/cli/templateService';
import {ModelPropTypes} from '../src/models/ModelPropTypes';
import {BaseModel} from '../src/models/BaseModel';

const unroll = require<any>('unroll');
let _ = require<any>('underscore');
let commandLine = require<any>('../src/cli/commandLine');

unroll.use(it);

let testResourceName: string = 'test';
let testPropTypes: any = {
    id: ModelPropTypes.NUMBER(),
    name: ModelPropTypes.STRING()
};
let testModelName: string = 'Test';
let testModelPath: string = 'testModelPath';
let testCancelDestination: string = 'testCancelDestination';
commandLine = {
    modelName: testModelName, 
    modelPath: testModelPath,
    onCancel: testCancelDestination
};
let testPage: string = 'testPage';

describe('Test generateFormTemplate method of TemplateService', () => {
    let testTemplateFunction: jest.Mock<Function>;
    beforeEach(() => {
        require = jest.fn((path: string) => {
            return testPage;
        }) as any;

        testTemplateFunction = jest.fn<Function>();
        _.template = (template: string) => testTemplateFunction;
    });
    
    it('should call the template function returned by underscore when an appropriate model class is mentioned', () => {
        class TestModel extends BaseModel {
            static resourceName: string = testResourceName; 
            static propTypes: any = testPropTypes;
            static defaultProps: any = {
                id: 1,
                name: 'abc'
            };
            constructor(props) {
                super(props);
            }
        }

        let resultantPage: string = TemplateService.generateFormTemplate(TestModel);

        expect(resultantPage).toEqual(testPage);
        let propTypes = TestModel.propTypes;
        let formControls = Object.keys(propTypes).map((prop: string, index: number) => {
            expect(testTemplateFunction).toBeCalledWith({
                type: propTypes[prop],
                enumInstance: '',
                key: `form-control-${testResourceName}-${index}`,
                propertyName: prop,
                model: `RHForms.${testResourceName}.properties.${prop}`
            });
            return testPage;
        });
        expect(testTemplateFunction).toBeCalledWith({
            modelName: testModelName,
            modelPath: TemplateService.projectRoot + '/..' + TemplateService.typescriptOut + testModelPath,
            cancelDestination: testCancelDestination,
            formControls
        });
    });

    it('should call the template function with the appropriate form controls and input widget types', () => {
        class TestModel extends BaseModel {
            static defaultProps = {};
            static resourceName = testResourceName;
            static propTypes = {
                id: ModelPropTypes.NUMBER(),
                guests: ModelPropTypes.ARRAY(),
                address: ModelPropTypes.OBJECT({
                    flatNo: ModelPropTypes.NUMBER()
                })
            };
        }

        let resultantPage: string = TemplateService.generateFormTemplate(TestModel);

        expect(resultantPage).toEqual(testPage);
        let propTypes = TestModel.propTypes;
        let formControls = Object.keys(TestModel.propTypes).map((prop: string, index: number) => {
            if (propTypes[prop].type === ModelPropTypes.objectInputType) {
                let subPropTypes = propTypes[prop].propTypes;
                Object.keys(subPropTypes).forEach((subProp: string, subIndex: number) => {
                    let enumInstance = subPropTypes[subProp].enum ? 
                            `${testModelName.capitalize()}Model.propTypes[\`${prop}\`][\`${subProp}\`].enum` : '';
                    expect(testTemplateFunction).toBeCalledWith({
                        type: subPropTypes[subProp],
                        enumInstance,
                        key: `form-control-sub-${testResourceName}-${subIndex}`, 
                        propertyName: subProp,
                        model: `RHForms.${testResourceName}.properties.${prop}.${subProp}`
                    });
                });

            }
            let enumInstance = propTypes[prop].enum ? 
                    `${testModelName.capitalize()}Model.propTypes[\`${prop}\`].enum` : '';
            expect(testTemplateFunction).toBeCalledWith({
                type: propTypes[prop],
                enumInstance,
                key: `form-control-${testResourceName}-${index}`,
                propertyName: prop,
                model: `RHForms.${testResourceName}.properties.${prop}`
            });
            return testPage;
        });

        expect(testTemplateFunction).toBeCalledWith({
            modelName: testModelName,
            modelPath: testModelPath,
            cancelDestination: testCancelDestination,
            formControls
        });
    });

    class TestModelInvaidPropTypes extends BaseModel {
        static defaultProps = 'qwe';
        static propTypes = '123';
        static resourceName = 'test';
        constructor(props) {
            super(props);
        }
    }
    class TestModelEmptyPropTypes extends BaseModel {}

    unroll('should call the template function without any formcontrols when #title', 
            (done, testArgs) => {

        let resultantPage = TemplateService.generateFormTemplate(testArgs.modelClass);

        expect(resultantPage).toEqual(testPage);
        expect(testTemplateFunction).toBeCalledWith({
            modelName: testModelName,
            modelPath: testModelPath,
            onCancel: testCancelDestination,
            formControls: {}
        });
        done();
    }, [
            ['modelClass', 'title'],
            [TestModelInvaidPropTypes, 'propTypes are invalid']
            [TestModelEmptyPropTypes, 'propTypes are undefined']
    ]);

});

describe('Test generateShowTemplate method of TemplateService', () => {
    let testTemplateFunction: jest.Mock<Function>;
    beforeEach(() => {
        require = jest.fn((path: string) => {
            return testPage;
        }) as any;

        testTemplateFunction = jest.fn<Function>();
        _.template = (template: string) => testTemplateFunction;
    });
    
    it('should call the template function returned by underscore when an appropriate model class is mentioned', () => {
        class TestModel extends BaseModel {
            static resourceName: string = testResourceName; 
            static propTypes: any = testPropTypes;
            static defaultProps: any = {
                id: 1,
                name: 'abc'
            };
            constructor(props) {
                super(props);
            }
        }

        let resultantPage: string = TemplateService.generateFormTemplate(TestModel);

        expect(resultantPage).toEqual(testPage);
        let propTypes = TestModel.propTypes;
        let tableRowMap = Object.keys(propTypes).map((prop: string, index: number) => {
            expect(testTemplateFunction).toBeCalledWith({
                propertyName: prop,
                propertyValue: `instance.properties.${prop}.toString()`
            });
            return testPage;
        });
        expect(testTemplateFunction).toBeCalledWith({
            modelName: testModelName,
            tableRowMap
        });
    });

    it('should call the template function with the appropriate form controls and input widget types', () => {
        class TestModel extends BaseModel {
            static defaultProps = {};
            static resourceName = testResourceName;
            static propTypes = {
                id: ModelPropTypes.NUMBER(),
                guests: ModelPropTypes.ARRAY(),
                address: ModelPropTypes.OBJECT({
                    flatNo: ModelPropTypes.NUMBER()
                })
            };
        }

        let resultantPage: string = TemplateService.generateFormTemplate(TestModel);

        expect(resultantPage).toEqual(testPage);
        let propTypes = TestModel.propTypes;
        // generating a dummy object for tableRowMap so as to apply an expectation.
        let tableRowMap = {};
        Object.keys(TestModel.propTypes).map((prop: string, index: number) => {
            if (propTypes[prop].type === ModelPropTypes.objectInputType) {
                let subPropTypes = propTypes[prop].propTypes;
                Object.keys(subPropTypes).forEach((subProp: string, subIndex: number) => {
                    expect(testTemplateFunction).toBeCalledWith({
                        subPropertyName: subProp,
                        subPropertyValue: `instance.properties.${subProp}.${prop}.toString()`
                    });
                });

            }
            expect(testTemplateFunction).toBeCalledWith({
                propertyName: prop,
                propertyValue: `instance.properties.${prop}.toString()`
            });
            tableRowMap[prop] = testPage;
        });

        expect(testTemplateFunction).toBeCalledWith({
            modelName: testModelName,
            tableRowMap
        });
    });

    class TestModelInvaidPropTypes extends BaseModel {
        static defaultProps = 'qwe';
        static propTypes = '123';
        static resourceName = 'test';
        constructor(props) {
            super(props);
        }
    }
    class TestModelEmptyPropTypes extends BaseModel {}

    unroll('should call the template function without any formcontrols when #title', 
            (done, testArgs) => {

        let resultantPage = TemplateService.generateFormTemplate(testArgs.modelClass);

        expect(resultantPage).toEqual(testPage);
        expect(testTemplateFunction).toBeCalledWith({
            modelName: testModelName,
            tableRowMap: {}
        });
        done();
    }, [
            ['modelClass', 'title'],
            [TestModelInvaidPropTypes, 'propTypes are invalid']
            [TestModelEmptyPropTypes, 'propTypes are undefined']
    ]);

});
