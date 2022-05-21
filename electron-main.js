// 这个文件可以直接用 electron 命令运行。

const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const { compile } = require('./bytecode')

async function main() {
  // 输入目录，用于存放待编译的 js bundle
  const inputPath = path.resolve(__dirname, './test/main')
  // 输出目录，用于存放编译产物，也就是字节码，文件名对应关系：main.js -> main.bin
  const outputPath = path.resolve(__dirname, './dist/main')

  // 清理并重新创建输出目录
  rimraf.sync(outputPath)
  fs.mkdirSync(outputPath)

  // 读取原始 js 并生成字节码
  const code = fs.readFileSync(path.resolve(inputPath, 'index.cjs'))
  fs.writeFileSync(path.resolve(outputPath, 'index.bin'), compile(code))
}

main()
