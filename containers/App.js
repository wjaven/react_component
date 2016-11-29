import React, {Component} from 'react';
import Dialog from '../components/Dialog';
import FormInpt from '../components/Form/FormInpt';
import FormSelect from '../components/Form/FormSelect';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      defaultInpt: '初始值值',
      options: [{id: '1', label: 'aa'}, {id: '2', label: 'bb'}, {id: '3', label: 'cc'}],
      defaultOpt: '2',
      selArrays: [
        {value: '2'},
        {value: '5'}
      ]
    };
    this.alert = this.alert.bind(this);
    this.confirm = this.confirm.bind(this);
    this.prompt = this.prompt.bind(this);
    this.changeInpt = this.changeInpt.bind(this);
    this.changeSelect = this.changeSelect.bind(this);
  }

  changeInpt(value) {
    console.log(value);
  }

  changeSelect(option) {
    console.log(option);
  }

  alert() {
    this.setState({
      options: [{id: '4', label: 'dd'}, {id: '5', label: 'ee'}, {id: '6', label: 'ff'}]
    });
    const dialog = {
      show: true,
      type: 'alert',
      message: '这个是定时弹窗消息！',
      timeout: 2000
    };
    this.dialog.setState(dialog);
  }

  confirm() {
    const dialog = {
      show: true,
      type: 'confirm',
      message: '确定吗？',
      callback: (result) => {
        console.log(result);
      }
    };
    this.dialog.setState(dialog);
  }

  prompt() {
    const dialog = {
      show: true,
      type: 'prompt',
      message: '请输入内容(1-4位)',
      min: 1,
      max: 4,
      placeholder: '请输入内容(1-4位)',
      defaultValue: '初始值',
      callback: (result) => {
        console.log(result);
      }
    };
    this.dialog.setState(dialog);
  }

  render() {
    const {defaultInpt, options, defaultOpt, selArrays} = this.state;
    const inptVerify = {type: 'text', min: 1, max: 4, error: '错误信息！'};
    return (
      <div>
        <div>
          <button onClick={this.alert}>alert</button>
          <button onClick={this.confirm}>confirm</button>
          <button onClick={this.prompt}>prompt</button>
        </div>
        <Dialog ref={(ref) => { this.dialog = ref; }} />
        <div>
          <FormInpt
            width="200px"
            name="inpt"
            verify={inptVerify}
            onChange={this.changeInpt}
            unit="个"
            defaultValue={defaultInpt}
            placeholder="placeholder"
          />
        </div>
        <div>
          <FormSelect
            name="select"
            options={options}
            defaultValue={defaultOpt}
            onChange={this.changeSelect}
          />
        </div>
        <div>
          {
            selArrays.map((sel, index) => {
              return (
                <FormSelect
                  key={index}
                  name="select[]"
                  options={options}
                  defaultValue={sel.value}
                  onChange={this.changeSelect}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}
