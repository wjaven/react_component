import React, {Component} from 'react';
import Dialog from '../components/Dialog';
import FormInpt from '../components/Form/FormInpt'

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.alert = this.alert.bind(this);
    this.confirm = this.confirm.bind(this);
    this.prompt = this.prompt.bind(this);
  }

  alert() {
    let dialog = {
      show: true,
      type: 'alert',
      message: '这个是定时弹窗消息！',
      timeout: 2000
    };
    this.dialog.setState(dialog);
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
    this.dialog.setState(dialog);
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
    this.dialog.setState(dialog);
  }

  render() {
    const inptVerify = {type: 'text', min: 1,max: 4, inptError: '错误信息！'};
    return (
      <div>
        <div>
          <button onClick={this.alert}>alert</button>
          <button onClick={this.confirm}>confirm</button>
          <button onClick={this.prompt}>prompt</button>
        </div>
        <Dialog ref={(dialog) => { this.dialog = dialog; }} />
        <div>
          <FormInpt
            inptWidth="w200"
            inptHeight="h50"
            name="name"
            placeholder="placeholder"
            defaultValue="初始值"
            verify={inptVerify}
          />
        </div>
      </div>
    );
  }
}
