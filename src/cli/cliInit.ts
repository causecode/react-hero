import * as fs from 'fs';
import '../init';

require.extensions['.ejs'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

require.extensions['.css'] = (module, filename) => {
    module.exports = '';
};
