# el-lowcode 低代码组件库架构文档

## 📋 概述

el-lowcode 是一个基于 Vue 3 的低代码前端渲染引擎，支持插件机制扩展自定义组件功能。它可以将 DSL 配置转换为实际的 Vue 组件，支持条件渲染、循环渲染、数据绑定等高级功能。

## 🏗️ 核心架构

### 1. 渲染引擎 (`browser/packages/render/`)

**核心文件**: `index.ts`

```typescript
// 核心渲染函数工厂
export function createRender({ defaultIs, processProps })

// 默认渲染器
export const Render = createRender({})
```

**主要功能**:
- 将 DSL 配置转换为 Vue VNode
- 支持条件渲染 (`vIf`)
- 支持循环渲染 (`vFor`)
- 支持动态组件 (`is`)
- 支持数据绑定 (`vModels`)
- 支持作用域变量 (`scope`)

**关键类型**:
- `Props`: DSL 配置对象类型
- `ProcessedProps`: 处理后的属性类型
- `CreateRender`: 渲染器配置类型

### 2. 配置提供者 (`browser/packages/el-lowcode/`)

**核心文件**: `ConfigProvider.js`, `index.ts`

```javascript
// 配置提供者组件
export const ConfigProvider = defineComponent({...})

// 配置提供者 Hook
export function useConfigProvider(props)

// 带状态监听的渲染组件
export const RenderWithState = defineComponent({...})
```

**主要功能**:
- 管理全局状态和配置
- 加载插件系统
- 提供数据源管理
- 处理状态变化监听
- 为子组件提供变量作用域

**状态监听机制**:
```javascript
// 状态变化监听
onStateChange: (listener) => { ... }

// 获取当前状态
getCurrentState: () => vars.state

```

## 🔌 插件系统

### 1. Web 插件 (`browser/plugins/web/`)

**特点**: 基于原生 HTML 元素，减少依赖

**组件列表**:
- `WebFormLcd.vue` - 表单容器
- `WebFormItemRender.vue` - 表单项包装器
- `WebInput.vue` - 输入框
- `WebSelect.vue` - 下拉选择
- `WebTextarea.vue` - 多行文本
- `WebRadioGroup.vue` - 单选组
- `WebCheckboxGroup.vue` - 多选组
- `WebRadio.vue` - 单选按钮
- `WebCheckbox.vue` - 复选框
- `WebTableLcd.vue` - 表格容器

**数据绑定机制**:
```javascript
// 数据转换器 (transformer)
const transformer = {
  get() { return formModel[prop] || '' },
  set(value) { formModel[prop] = value }
}
```

### 2. Element Plus 插件 (`browser/plugins/element-plus/`)

**特点**: 基于 Element Plus UI 组件库

**组件列表**:
- `ElFormLcd.vue` - Element Plus 表单
- `ElTableLcd.vue` - Element Plus 表格
- 日期时间组件
- 完整的 Element Plus 组件库

## 📦 包结构

### 1. 核心包

```
browser/packages/
├── el-lowcode/           # 核心低代码引擎
│   ├── ConfigProvider.js # 配置提供者
│   └── index.ts         # 主入口
├── render/              # 渲染引擎
│   └── index.ts        # 渲染核心
└── utils/              # 工具函数
    └── ...
```

### 2. 表单渲染包

```
browser/packages/
├── web-form-render/     # 原生 HTML 表单渲染
│   ├── props.ts        # 属性定义
│   ├── utils.ts        # 工具函数
│   ├── createFormRender.tsx # 表单渲染工厂
│   └── native-html.tsx # 原生 HTML 组件
└── el-form-render/     # Element Plus 表单渲染
    └── ...
```

### 3. 插件包

```
browser/plugins/
├── web/                # 原生 HTML 插件
│   ├── form/          # 表单组件
│   ├── table/         # 表格组件
│   └── index.js       # 插件入口
└── element-plus/      # Element Plus 插件
    ├── ElFormLcd.vue  # 表单组件
    ├── ElTableLcd.vue # 表格组件
    └── index.js       # 插件入口
```

## 🔄 数据流

### 1. DSL 配置 → 渲染

```
DSL 配置 → ConfigProvider → Render → Vue 组件
```

### 2. 状态管理

```
状态变化 → watch 监听 → 触发回调 → 更新 UI
```

### 3. 数据绑定

```
表单输入 → transformer.set() → 更新 formModel → 触发状态变化
```

## 🎯 使用示例

### 1. 基本使用

```javascript
import { Render } from 'el-lowcode'

// 渲染 DSL 配置
h(Render, { schema: mySchema })
```

### 2. 带状态监听

```javascript
import { RenderWithState } from 'el-lowcode'

// 带状态监听的渲染
h(RenderWithState, {
  schema: mySchema,
  onFormDataChange: (formData) => {
    console.log('表单数据变化:', formData)
  }
})
```

### 3. DSL 配置示例

```javascript
const schema = {
  is: 'web-form-lcd',
  model: '{{state.formData}}',
  children: [
    {
      is: 'WebFormItemRender',
      prop: 'name',
      children: [
        {
          is: 'WebInput',
          placeholder: '请输入姓名'
        }
      ]
    }
  ],
  state: {
    formData: {}
  }
}
```

## 🔧 扩展开发

### 1. 创建新组件

```vue
<template>
  <div v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup>
// 组件逻辑
</script>
```

### 2. 注册到插件

```javascript
// plugins/my-plugin/index.js
export default {
  install(app) {
    app.component('MyComponent', defineAsyncComponent(() => import('./MyComponent.vue')))
  }
}
```

### 3. 在 DSL 中使用

```javascript
const schema = {
  is: 'MyComponent',
  // 组件属性
}
```

## 📝 最佳实践

1. **组件设计**: 保持与 Element Plus API 兼容
2. **数据绑定**: 使用 transformer 机制
3. **状态管理**: 通过 ConfigProvider 管理
4. **插件开发**: 遵循插件规范
5. **类型安全**: 使用 TypeScript 类型定义

## 🚀 未来扩展

1. 支持更多 UI 库 (Ant Design, Vuetify 等)
2. 增强数据源管理
3. 支持更复杂的验证规则
4. 提供可视化设计器
5. 支持主题定制

---

这个架构文档展示了 el-lowcode 的完整设计思路和实现细节，帮助开发者理解和使用这个低代码组件库。
