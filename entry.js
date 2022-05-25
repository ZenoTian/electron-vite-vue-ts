require('bytenode')
let { app } = require('electron')
const v8 = require('v8')
v8.setFlagsFromString('--no-lazy')

if (app.isPackaged || process.env.NODE_ENV === 'production') {
  console.log('dist/main/index.jsc')
  require('./dist/main/index.jsc')
} else {
  require('./dist/main/index.cjs')
}
