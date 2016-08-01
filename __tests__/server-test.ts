jest.unmock('../src/api/server/index');
import { HTTP, BASE_URL } from '../src/api/server/index';
import 'babel-polyfill';
let axios = require('axios');
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Test server api methods', () => {
    let successPath: string = 'successPath';
    let data: {id: number, author: string} = {id: 1, author: 'abc'};
    let failurePath: string = 'failurePath';
    let successObject: {success: boolean} = {success: true};
    let failureObject: {success: boolean} = {success: false};

    beforeEach(() => {
        fetch = jest.fn((path, config) => {
            return new Promise((resolve, reject) => {
                if (path.toLowerCase().indexOf('failure') > -1) {
                    reject({failureObject});
                } else {
                    resolve({successObject, json: () => {}});
                }
            });
        });
    });

    describe('Test getRequest method', () => {

        unroll('calls getRequest with #title', async (done, testArgs) => {
            await HTTP.getRequest(testArgs.path, testArgs.data);
            expect(fetch).toBeCalledWith(testArgs.expectedURL);
            done();
        }, [
            ['title', 'path', 'data', 'expectedURL'],
            ['all parameters', successPath, data, BASE_URL + successPath + '?' + HTTP.serialize(data)],
            ['path and empty data', successPath, {}, BASE_URL + successPath],
            ['empty params', '', {}, BASE_URL]
        ]);

        it('calls getRequest with url', async () => {
            await HTTP.getRequest('');
            expect(fetch).toBeCalledWith(BASE_URL);
        });

    });

    describe('Test postRequest method', () => {
        let postConfig: {method: string, headers: {'Accept': string, 'Content-Type': string}, body?: string};
        beforeEach(() => {
            postConfig = {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
        });

        unroll('calls postRequest with #title', async (done, testArgs) => {
            postConfig.body = JSON.stringify(testArgs.data);
            await HTTP.postRequest(testArgs.path, testArgs.data);
            expect(fetch).toBeCalledWith(BASE_URL + testArgs.path, postConfig);
            done();
        }, [
            ['title', 'path', 'data'],
            ['all parameters', successPath, data],
            ['empty data', successPath, {}],
            ['empty params', '', {}],
        ]);

        it('calls postRequest with url', async() => {
            postConfig.body = JSON.stringify({});
            await HTTP.postRequest('');
            expect(fetch).toBeCalledWith(BASE_URL, postConfig);
        });
    });

    describe('Test putRequest method', () => {
        let putConfig;
        beforeEach(() => {
            putConfig = {
                method: 'put',
                url: '',
                data: data
            };
        });

        it('calls putRequest with all the parameters', async () => {
            putConfig.url = BASE_URL + successPath;
            await HTTP.putRequest(successPath, data).then((resp) => {
                expect(resp).toEqual(successObject);
            });
            expect(axios).toBeCalledWith(putConfig);
        });

        unroll('calls putRequest with #title', async (done, testArgs) => {
            putConfig.url = BASE_URL + testArgs.path;
            putConfig.data = testArgs.data;
            await HTTP.putRequest(testArgs.path, testArgs.data);
            expect(axios).toBeCalledWith(putConfig);
            done();
        }, [
            ['title', 'path', 'data'],
            ['empty data and successPath', successPath, data],
            ['empty params', '', {}],
        ]);

        it('calls putRequest with url', async() => {
            putConfig.url = BASE_URL;
            putConfig.data = {};
            await HTTP.putRequest('');
            expect(axios).toBeCalledWith(putConfig);
        });
    });

    describe('Test deleteRequest Method', () => {
        let deleteConfig;
        beforeEach(() => {
            deleteConfig = {
                method: 'delete',
                url: ''
            };
        });

        it('calls deleteRequest with all params', async () => {
            deleteConfig.url = BASE_URL + successPath;
            await HTTP.deleteRequest(successPath).then((response) => {
                expect(response).toEqual(successObject);
            });

            expect(axios).toBeCalledWith(deleteConfig);
        });

        it('calls deleteRequest with empty params', async () => {
            deleteConfig.url = BASE_URL;
            await HTTP.deleteRequest('');
            expect(axios).toBeCalledWith(deleteConfig);
        });

    });

});
