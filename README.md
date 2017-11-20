# React

标签（空格分隔）： React

---

## flux

### Jq模式
>在一个文件中进行操作dom，逻辑判断，获取数据然后重新渲染页面。

 - 优点：简便的通过一些api去操作dom，方便快捷，易于理解
 - 缺点：都集中一个文件，当功能复杂下，代码杂乱不能快速定位问题，不易于维护，结构复杂。

### MVC
>MVC: M(数据层) V(控制层) C(视图层)
把整个系统分层，M数据层、V视图层、C控制层。每个层相互独立，互不影响，每一层都向外开放一些接口(interface)，供其他层去调用，就实现了模块化。

- 优点：结构明了，一层调用另外一层方法，不需要知道内部实现，只需要能得到结果，相互不影响，单一职责。（如一接口地址改变，只需要在M层中修改对应地址即可，其他层无需改变）
- 缺点：当项目庞大时，难以扩展。视图和模型可能出现双向数据流，数据流错综复杂，不可预测性，难以调试维护

### Flux模式
> view(视图层)、Active(动作)、Dispatcher(派发器)、Store(数据层)。
用户访问view，触发事件，发出active，Dispatcher接收到后，要求store对应更新，发出change事件，view接受到change事件触发更新。

- 单向数据流。

### Flux例子
```javascript
// ActionTypes.js
// 声明动作类型
export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';

//AppDispatcher.js
import { Dispatcher } from 'flux';
export default new Dispatcher();

// Active.js
// 执行的动作，然后通过dispatcher去派发
import AppDispatcher from './AppDispatcher.js';
import * as ActionTypes from './ActionTypes';
export const increment = (counterCaption) => {
    AppDispatcher.dispatch({
        type: ActionTypes.INCREMENT,
        counterCaption: counterCaption
    })
}

export const decrement = (counterCaption) => {
    AppDispatcher.dispatch({
        type: ActionTypes.DECREMENT,
        counterCaption: counterCaption
    })
}
```

```javascript
// CounterStore.js
import { EventEmitter } from "events";
import AppDispatcher from '../AppDispatcher';
import * as ActionTypes from '../ActionTypes';
// listener type值
const CHANGE_EVENT = 'changed';
// 初始化参数
const counterValues = {
  First: 0,
  Tow: 10
};

//通过Object.assign克隆EventEmitter原型上的方法，
//添加监听方法的，发送消息方法，删除监听方法，获取初始化值。
const CounterStore = Object.assign({}, EventEmitter.prototype, {
  getCounterValues: () => {
    return counterValues;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removerChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// 登记各种action回调，当dispatch收到ActionTypes动作后就执行相应的回调
CounterStore.dispatchToken = AppDispatcher.register((action) => {
    if(action.type === ActionTypes.INCREMENT){
        counterValues[action.counterCaption] ++;
        CounterStore.emitChange();
    }else if(action.type === ActionTypes.DECREMENT){    
        counterValues[action.counterCaption] --;
        CounterStore.emitChange();
    }
})
export default CounterStore;
```
 > 1.初始化获取count的值`CounterStore.getCounterValues()[this.props.caption]`
 2.渲染完成后添加监听和添加回调`CounterStore.addChangeListener(this.onChange);`
 3.点击按钮执行动作，并派发`Actions.increment(this.props.caption)`
 4.派发后进入`dispatcher.register`登记，执行对应的发送消息`emitChage()`
 5.一开始监听的消息被触发，触发后执行回调`onChange()`,先从CounterStore中获取改变后的count，然后更新`this.setState({count: newCount});`
 **整体流程：点击按钮后执行Active => (dispather)派发 => Store对应更新数据(触发change) => 页面监听到更新render** 
```javascript
//Counter.js
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import * as Actions from '../flux/Actions';
import CounterStore from '../flux/stores/CounterStore';
class Counter extends Component {
    constructor(props) {
        console.log('constructor');
        super(props)
        this.state = {
            count : CounterStore.getCounterValues()[this.props.caption]
        }
    }

    onClickIncrementButton = () => {
        Actions.increment(this.props.caption)
        // this.setState({ count: this.state.count + 1})
    }

    onClickDecrementButton = () => {
        Actions.decrement(this.props.caption)
        // this.setState({ count: this.state.count - 1})
    }
    
    // 初始化渲染触发
    render() {
        const { caption } = this.props
        return (
         <div>
            <button style={buttonStyle} onClick={this.onClickIncrementButton}> + </button> 
            <button style={buttonStyle} onClick={this.onClickDecrementButton}> - </button> 
            {caption}   {this.state.count}
         </div> 
        )
    }
  
    // 初始化渲染
    componentDidMount() {
        CounterStore.addChangeListener(this.onChange);
    }

    onChange = () => {
        const newCount = CounterStore.getCounterValues()[this.props.caption];
        this.setState({count: newCount});
    }
  }
  
  export default Counter
```

 
 

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
  

### `PropTypes`设置类型判断报错 
![image_1bv4fi1taef115r96ro1hpo1sct25.png-31.4kB][3]
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
  [3]: http://static.zybuluo.com/zChange/qv7aa2qgxadswqlg6p2cfs0y/image_1bv4fi1taef115r96ro1hpo1sct25.png