import React, { Component } from "react";
import SummaryStore from '../flux/stores/SummaryStore';

import store from '../redux/Store';



class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = this.setValue();

    this.onChange = this.onChange.bind(this);
  }

  // 初始化渲染触发
  render() {
    return <div>Total Count: {this.state.sum}</div>;
  }

  // 初始化渲染
  componentDidMount() {
    // SummaryStore.addChangeListener(this.onUpdate);
    store.subscribe(this.onChange)
  }

  setValue() {
      const state  = store.getState();
      let sum = 0;

      for(const key in state){
          if(state.hasOwnProperty(key)){
              sum += state[key];
          }
      }

    return {sum: sum};
  }


  onChange () {
      this.setState(this.setValue)
  }

  onUpdate() {
    this.setState({sum: SummaryStore.getSynnary()});
  }
}

export default Summary;
