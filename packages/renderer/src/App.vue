<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
      </el-aside>
      <el-container l-container>
        <el-main>
          <HelloWorld msg="Hello Vue 3.0 + Element Plus + Vite" />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<style>
body,
html {
  width: 100%;
  height: 100%;
  display: flex;
}
#app {
  display: flex;
  flex: 1;
  text-align: center;
  color: var(--el-text-color-primary);
}
</style>

<style lang="scss" scoped>
.app-layout {
  flex: 1;
}
</style>
