# React
---

## 生命周期

### 初始化 首次render（Mounting）
  
 1. `getDefaultProps or getInitialState： 设置组件属性默认值 or 默认状态`
 2. `constructor`
 3. `componentWillMount: 组件挂载时执行，只执行一次，可以用setState`
 4. `render(): 渲染`
 5. `componentDidMount： 组件(子组件)加载完成后执行，可操作DOM，使用后refs`

### 更新阶段
 1. `componentWillReceiveProps： 父组件render后子组件就会调用此生命周期(不管props有没有更新,父子组件数据有没有交换)`
 2. `shouldComponentUpdate：组件挂在后，每次调用setState setProps后出发，可以通过nextProps和和props来判断是否需要重新render`
 3. `componentWillUpdate：在shouldComponentUpdate 返回true后触发，不可以使用setState操作；fasle则直接返回不做渲染`
 4. `render() 渲染`
 5. `componentDidUpdate： 和componentDidMount声明周期对应(挂载时候只执行一次)，每次更新渲染之后会被调用'`

### 销毁阶段
1. `componentWillUnmount 最后组件销毁`

![react.png-53kB][1]


## 坑

### `Router`
>`Router`下只允许一个节点所以用`div`包裹下
```
<HashRouter>
    <div>
        <Route path="/" component={Login}/>
        <Route path="/Chat" component={Chat}/>
    </div>
</HashRouter>
```
![image_1bu0jnod71skc1v5l177d1huafvo9.png-32.7kB][2]

  ---
  
### `BrowserRouter` Or `HashRouter`
  >`BrowserRouter`需要和后端配合，重定向只能到首页，刷新就到404,兼容性低，可采用`HashRouter`
  

`PropTypes`设置类型判断报错 

> `error: TypeError: Cannot read property 'string' of undefined` 
版本问题：在`react 16`下PropTypes 独立成一个单独的包`prop-types`
```javascript
// React -v 16
import React, { Component ,PropTypes} from 'react';
 Counter.PropTypes = {
    caption: PropTypes.string,
    count: PropTypes.number
 }
```
**安装 year add prop-types -S || npm install prop-types -S**
**再`import PropTypes from 'prop-types';`**


  
  


  [1]: http://static.zybuluo.com/zChange/g6qb1n8v9opyqazbz1bou8ee/react.png
  [2]: http://static.zybuluo.com/zChange/jthbeob19uezxbsfxnjq16ii/image_1bu0jnod71skc1v5l177d1huafvo9.png