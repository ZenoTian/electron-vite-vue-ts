let bytenode = require('bytenode')
const fs = require('fs')
const v8 = require('v8')

// 这两个参数非常重要，保证字节码能够被运行。
v8.setFlagsFromString('--no-lazy')
v8.setFlagsFromString('--no-flush-bytecode')

if (fs.existsSync('./dist/main/index.cjs')) {
  console.log('开始处理')
  bytenode
    .compileFile('./dist/main/index.cjs', './dist/main/index.jsc')
    .then(() => {
      console.log('处理完成')
      fs.rmSync('./dist/main/index.cjs')
      process.exit()
    })
} else {
  console.log('未找到目标文件')
}
