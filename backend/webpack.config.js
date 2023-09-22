const path = require('path');
module.exports = {
  mode: 'production',
  entry: './server.js',
  externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'final.js',
  },
  target: 'node',
};