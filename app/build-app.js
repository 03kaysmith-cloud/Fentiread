const fs = require('fs');
const path = require('path');

const appDir = __dirname;
const sourcePath = path.join(appDir, 'app.jsx');
const outputPath = path.join(appDir, 'app.compiled.js');
const babelPath = path.join(appDir, 'vendor', 'babel.min.js');

try {
  const Babel = require(babelPath);
  const source = fs.readFileSync(sourcePath, 'utf8');
  const result = Babel.transform(source, { presets: ['env', 'react'] });
  const wrapped = [
    '(function (React, ReactDOM, FRStore) {',
    result.code,
    '})(window.React, window.ReactDOM, window.FRStore);',
    '',
  ].join('\n');
  fs.writeFileSync(outputPath, wrapped);
  console.log(`Built ${path.basename(outputPath)}`);
} catch (error) {
  console.error(error && error.stack ? error.stack : error);
  process.exit(1);
}
