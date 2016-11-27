const path = require('path')

module.exports = {
  entry: {
    app: ['./sample/main.js']
  },
  output: {
    path: path.resolve(__dirname, '/'),
    publicPath: '/sample',
    filename: 'bundle.js'
  }
}
