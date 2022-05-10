import openAboutWindow from 'about-window' 
import * as path from 'path'

export default () => openAboutWindow({
  icon_path: path.join(__dirname, '../../../resources/logo.png'),
  package_json_dir: path.resolve(__dirname  + '../../../'),
  copyright: 'copyright',
  homepage: 'https://www.idss-cn.com/',
  bug_report_url: 'https://www.idss-cn.com/'
})
