# Web Components for el-lowcode

这个项目扩展了el-lowcode渲染引擎，添加了原生HTML表单和表格组件，减少对Element Plus的强依赖。

## 新增组件

### 1. WebFormLcd.vue
原生HTML表单组件，替代ElFormLcd.vue

**特性：**
- 支持原生HTML表单元素
- 兼容el-lowcode的表单数据绑定
- 支持表单验证和提交事件

**使用方式：**
```javascript
{
  "is": "web-form-lcd",
  "model": "{{state.formData}}",
  "onSubmit": "{{e => console.log('Form submitted:', state.formData)}}",
  "children": [
    // 表单项...
  ]
}
```

### 2. WebFormItemRender.vue
原生HTML表单项组件，用于包装表单控件

**特性：**
- 支持标签显示
- 支持必填项标识
- 提供统一的样式

**使用方式：**
```javascript
{
  "is": "WebFormItemRender",
  "label": "用户名",
  "prop": "username",
  "required": true,
  "children": [
    {
      "is": "input",
      "type": "text",
      "placeholder": "请输入用户名"
    }
  ]
}
```

### 3. WebTableLcd.vue
原生HTML表格组件，替代ElTableLcd.vue

**特性：**
- 支持列配置
- 支持行选择
- 支持斑马纹样式
- 支持自定义单元格渲染

**使用方式：**
```javascript
{
  "is": "web-table-lcd",
  "data": "{{state.tableData}}",
  "columns": "{{state.columns}}",
  "rowKey": "id",
  "selectable": true,
  "stripe": true,
  "border": true
}
```

### 4. WebTextarea.vue
原生HTML多行输入组件

**特性：**
- 支持多行文本输入
- 支持行数、列数配置
- 支持最大/最小长度限制
- 支持resize控制

**使用方式：**
```javascript
{
  "is": "WebFormItemRender",
  "label": "个人简介",
  "prop": "bio",
  "children": [
    {
      "is": "WebTextarea",
      "placeholder": "请输入个人简介...",
      "rows": 4,
      "maxlength": 200
    }
  ]
}
```

### 5. WebRadioGroup.vue
原生HTML单选组组件

**特性：**
- 支持选项配置
- 支持垂直/水平布局
- 支持禁用状态
- 支持单选功能

**使用方式：**
```javascript
{
  "is": "WebFormItemRender",
  "label": "选择颜色",
  "prop": "color",
  "children": [
    {
      "is": "WebRadioGroup",
      "options": [
        { "value": "red", "label": "红色" },
        { "value": "green", "label": "绿色" },
        { "value": "blue", "label": "蓝色" }
      ]
    }
  ]
}
```

### 6. WebCheckboxGroup.vue
原生HTML多选组组件

**特性：**
- 支持多选功能
- 支持选项配置
- 支持垂直/水平布局
- 支持禁用状态

**使用方式：**
```javascript
{
  "is": "WebFormItemRender",
  "label": "选择爱好",
  "prop": "hobbies",
  "children": [
    {
      "is": "WebCheckboxGroup",
      "options": [
        { "value": "reading", "label": "阅读" },
        { "value": "music", "label": "音乐" },
        { "value": "sports", "label": "运动" }
      ]
    }
  ]
}
```

### 7. WebRadio.vue
原生HTML单选按钮组件

**特性：**
- 单个单选按钮
- 支持标签显示
- 支持禁用状态

**使用方式：**
```javascript
{
  "is": "WebFormItemRender",
  "label": "是否同意",
  "prop": "agree",
  "children": [
    {
      "is": "WebRadio",
      "value": "yes",
      "label": "同意"
    }
  ]
}
```

### 8. WebCheckbox.vue
原生HTML多选框组件

**特性：**
- 单个多选框
- 支持标签显示
- 支持禁用状态

**使用方式：**
```javascript
{
  "is": "WebFormItemRender",
  "label": "订阅通知",
  "prop": "notifications",
  "children": [
    {
      "is": "WebCheckbox",
      "value": "email",
      "label": "邮件通知"
    }
  ]
}
```

## 配置示例

### 表单配置 (FormDemo.ts)
```javascript
export const FormDemo = {
  "children": [
    {
      "is": "web-form-lcd",
      "model": "{{state.formData}}",
      "onSubmit": "{{e => console.log('Form submitted:', state.formData)}}",
      "children": [
        {
          "is": "WebFormItemRender",
          "label": "选择题",
          "prop": "radio1",
          "children": [
            {
              "is": "select",
              "children": [
                { is: 'option', value: 'a', children: '选项A' },
                { is: 'option', value: 'b', children: '选项B' }
              ]
            }
          ]
        }
      ]
    }
  ],
  "state": {
    "formData": {}
  },
  "plugins": ["/plugins/web"]
}
```

### 表格配置 (TableDemo.ts)
```javascript
export const TableDemo = {
  "children": [
    {
      "is": "web-table-lcd",
      "data": "{{state.tableData}}",
      "columns": "{{state.columns}}",
      "rowKey": "id",
      "selectable": true,
      "stripe": true
    }
  ],
  "state": {
    "tableData": [
      { id: 1, name: "张三", age: 25 },
      { id: 2, name: "李四", age: 30 }
    ],
    "columns": [
      { prop: "name", label: "姓名", width: "120px" },
      { prop: "age", label: "年龄", width: "80px", align: "center" }
    ]
  },
  "plugins": ["/plugins/web"]
}
```

## 测试页面

1. `test-web-form.html` - 测试原生HTML表单
2. `test-web-table.html` - 测试原生HTML表格
3. `test-web-components.html` - 综合测试页面
4. `test-form-fixed.html` - 修复后的表单测试（带数据绑定）
5. `test-prop-binding.html` - Prop绑定方式测试（与Element Plus对比）
6. `test-extended-form.html` - 扩展表单组件测试（单选、多选、多行输入等）
7. `ai_confirm_form_demo.html` - 对比测试（Element Plus vs 原生HTML）

## 数据绑定说明

### Prop绑定方式（推荐）
原生HTML组件支持通过`prop`字段进行数据绑定，与Element Plus表单保持一致：

```javascript
{
  "is": "WebFormItemRender",
  "label": "用户名",
  "prop": "username",
  "children": [
    {
      "is": "WebInput",
      "type": "text",
      "placeholder": "请输入用户名"
    }
  ]
}
```

### vModels配置（兼容）
也支持el-lowcode的vModels机制：

```javascript
{
  "is": "WebInput",
  "type": "text",
  "placeholder": "请输入内容",
  "vModels": {
    "modelValue": ["{{state.formData.fieldName}}"]
  }
}
```


### 数据绑定机制
- **WebFormLcd**: 提供`formModel`上下文
- **WebFormItemRender**: 创建`transformer`处理数据绑定
- **WebInput/WebSelect**: 使用`transformer`进行双向数据绑定

## 插件注册

在`browser/plugins/web/index.js`中已自动注册以下组件：

### 表单组件
- `web-form-lcd` - 原生HTML表单
- `WebFormItemRender` - 表单项渲染器

### 输入组件
- `WebInput` - 文本输入框
- `WebSelect` - 下拉选择框
- `WebTextarea` - 多行输入框
- `WebRadioGroup` - 单选组
- `WebCheckboxGroup` - 多选组
- `WebRadio` - 单选按钮
- `WebCheckbox` - 多选框

### 表格组件
- `web-table-lcd` - 原生HTML表格

## 样式说明

所有组件都包含内置样式，模拟Element Plus的外观和交互效果：
- 表单样式：输入框、选择框、按钮等
- 表格样式：表头、行选择、斑马纹等
- 响应式设计：适配不同屏幕尺寸

## 兼容性

- 完全兼容el-lowcode的DSL配置
- 支持Vue 3 Composition API
- 支持TypeScript
- 支持现代浏览器（ES2020+）
