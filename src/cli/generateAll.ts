import {generateEditPage} from './generateEditPage';
import {generateShowPage} from './generateShowPage';
import {generateListPage} from './generateListPage';

export function generateAll() {
    generateEditPage();
    generateShowPage();
    generateListPage();
}
