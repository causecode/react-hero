import * as fs from 'fs';

require.extensions['.ejs'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

require.extensions['.css'] = (module, filename) => {
    module.exports = '';
};

