import React, {Component} from 'react';
import Dialog from '../components/Dialog';

export default class App extends Component {

  alert() {
    let dialog = {
      show: true,
      type: 'alert',
      message: '这个是定时弹窗消息！',
      timeout: 2000
    };
    this.refs.dialog.setState(dialog);
  }

  confirm() {
    let dialog = {
      show: true,
      type: 'confirm',
      message: '确定吗？',
      callback: function(result) {
        console.log(result);
      }
    };
    this.refs.dialog.setState(dialog);
  }

  prompt() {
    let dialog = {
      show: true,
      type: 'prompt',
      message: '请输入内容(1-4位)',
      min: 1,
      max: 4,
      placeholder: '请输入内容(1-4位)',
      defaultValue: '初始值',
      callback: function(result) {
        console.log(result);
      }
    };
    this.refs.dialog.setState(dialog);
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.alert.bind(this)}>alert</button>
          <button onClick={this.confirm.bind(this)}>confirm</button>
          <button onClick={this.prompt.bind(this)}>prompt</button>
        </div>
        <Dialog ref="dialog" />
      </div>
    );
  }
}
