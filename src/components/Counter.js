import React, { Component} from 'react';
import PropTypes from 'prop-types';
const buttonStyle  = {
    margin: '10px'
}

class Counter extends Component {
    constructor(props) {
        console.log('constructor');
        super(props)
        this.state = {
            count : this.props.initValue
        }
        // this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
        // this.onClickDecrementButton = this.onClickDecrementButton.bind(this);
        var a = {List:[1,2,-1,-2]};  
        var newa = [];
        a.List.forEach((item)=>{
            item = item < 1 ? 0 : item;
            newa.push(item);
        }); 
        a.List = newa;
        console.log(a)
        
    }

    onClickIncrementButton = () => {
        this.setState({ count: this.state.count + 1})
    }

    onClickDecrementButton = () => {
        this.setState({ count: this.state.count - 1})
    }

    
    // 初始化渲染触发
    componentWillMount() {
        console.log('componentWillMount  组件挂载的时候执行，只执行一次，可以使用setState')
    }


    // 更新触发
    componentWillReceiveProps() {
        console.log('componentWillReceiveProps 父组件render后子组件就会调用此生命周期(不管props有没有更新,父子组件数据有没有交换)')
    }


    // setSetat触发
    shouldComponentUpdate(nextProps, nextState) {
        // 组件挂在后，每次调用setState setProps后出发，可以通过nextProps和和props来判断是否需要重新render
        console.log(JSON.stringify(nextProps)+'————'+ JSON.stringify(this.props));
        console.log(JSON.stringify(nextState)+'————'+ JSON.stringify(this.state));
        console.log((nextProps.caption !== this.props.caption) || (nextState.count !== this.state.count))
        return (nextProps.caption !== this.props.caption) || (nextState.count !== this.state.count);
    }
    
    componentWillUpdate() {
        // 在shouldComponentUpdate 返回true后触发，不可以使用setState操作
        console.log('componentWillUpdate 在shouldComponentUpdate 返回true后触发，不可以使用setState操作')
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
        // render之后
        console.log('componentDidmount 组件(及子组建)加载完成后执行，可在其中操作DOM 使用Refs')
    }

    
    componentDidUpdate()  {
        // 和componentDidMount声明周期对应。
        console.log('componentDidUpdate   和componentDidMount声明周期对应(挂载时候只执行一次)，每次更新渲染之后会被调用')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount 组件被销毁时触发')
    }



  }
  

  Counter.PropTypes = {
    caption: PropTypes.string.isRequired,
    count: PropTypes.number
  }

  Counter.defaultProps = {
    initValue: 0
  }

  export default Counter