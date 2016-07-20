jest.unmock('../src/api/server/index');
import { HTTP, BASE_URL } from '../src/api/server/index';
import 'babel-polyfill';
let axios = require('axios');

describe('Test server api methods', () => {
    let successPath: string, failurePath: string, successObject: {success: boolean}, failureObject: {success: boolean},
            data: {id: number, author: string};

    beforeEach(() => {
        successPath = 'successPath';
        failurePath = 'failurePath';
        successObject = {success: true};
        data = {id: 1, author: 'abc'};
        fetch = <any>jest.fn((path, config: any) => {
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

        it('calls getRequest with all the parameters', async () => {
            await HTTP.getRequest(successPath, data);
            expect(fetch).toBeCalledWith(BASE_URL + successPath + '?' + HTTP.serialize(data));
        });

        it('calls getRequest with path and empty data', async () => {
            await HTTP.getRequest(successPath, {});
            expect(fetch).toBeCalledWith(BASE_URL + successPath);
        });

        it('calls getRequest with empty params', async () => {
            await HTTP.getRequest('', {});
            expect(fetch).toBeCalledWith(BASE_URL);
        });

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
                },
                body: JSON.stringify(data)
            };
        });

        it('calls postRequest with all the parameters', async () => {
            await HTTP.postRequest(successPath, data);
            expect(fetch).toBeCalledWith(BASE_URL + successPath, postConfig);
        });

        it('calls postRequest with empty params', async () => {
            postConfig.body = JSON.stringify({});
            await HTTP.postRequest(successPath, {});
            expect(fetch).toBeCalledWith(BASE_URL + successPath, postConfig);
        });

        it('calls postRequest with empty params', async () => {
            postConfig.body = JSON.stringify({});
            await HTTP.postRequest('', {});
            expect(fetch).toBeCalledWith(BASE_URL, postConfig);
        });

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

        it('calls putRequest with empty params and successPath', async () => {
            putConfig.url = BASE_URL + successPath;
            putConfig.data = {};
            await HTTP.putRequest(successPath, {});
            expect(axios).toBeCalledWith(putConfig);
        });

        it('calls putRequest with empty params', async () => {
            putConfig.url = BASE_URL;
            putConfig.data = {};
            await HTTP.putRequest('', {});
            expect(axios).toBeCalledWith(putConfig);
        });

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
