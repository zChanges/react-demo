import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../action';

class AddTodo extends Component {
  constructor(props, context) {
    super(props, context);
  }

  onSubmit = ev => {
    ev.preventDefault();
    const input = this.input;
    if (!input.value.trim()) {
      return;
    }

    this.props.onAdd(input.value);
    input.value = '';
  };

  refInput = node => {
    this.input = node;
  };

  render() {
    return (
      <div className="add-todo">
        <form onSubmit={this.onSubmit}>
          <input className="new-todo" type="text" ref={this.refInput} />
          <button className="add-btn" type="submit" >
          添加
          </button>
        </form>
      </div>
    );
  }

}


const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (text) => {
      dispatch(addTodo(text));
    }
  }
};

export default connect(null, mapDispatchToProps)(AddTodo);

// connect连接映射state、dispath组件内部;
// mapDispatchToProps将组件中Action进行统一管理