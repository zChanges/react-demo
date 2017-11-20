import React, { Component } from "react";
import SummaryStore from '../flux/stores/SummaryStore';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: SummaryStore.getSynnary()
    };

    this.onUpdate = this.onUpdate.bind(this);
  }

  // 初始化渲染触发
  render() {
    return <div>Total Count: {this.state.sum}</div>;
  }

  // 初始化渲染
  componentDidMount() {
    SummaryStore.addChangeListener(this.onUpdate);
  }

  onUpdate() {
    this.setState({sum: SummaryStore.getSynnary()});
  }
}

export default Summary;
