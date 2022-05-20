/* eslint-disable @typescript-eslint/no-unused-vars */
export default {
  // eslint
  '*.{js,ts,tsx,vue}': 'eslint --fix',
  // typecheck
  'packages/main/**/{*.ts}': ({ filenames }) => 'npm run typecheck',
  'packages/preload/**/{*.ts}': ({ filenames }) => 'npm run typecheck',
  'packages/renderer/**/{*.ts,*.tsx,*.vue,tsconfig.json}': ({ filenames }) =>
    'npm run typecheck',
}
