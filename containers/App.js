import React, {Component} from 'react';
import Dialog from '../components/Dialog';
import FormInpt from '../components/Form/FormInpt';
import FormSelect from '../components/Form/FormSelect';
import FormRadio from '../components/Form/FormRadio';
import FormCheckbox from '../components/Form/FormCheckbox';
import FormToggle from '../components/Form/FormToggle';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      defaultInpt: '初始值值',
      options: [{id: '1', label: 'aaaaaaaaaaaa'}, {id: '2', label: 'bb'}, {id: '3', label: 'cc'}],
      defaultOpt: '2',
      selArrays: [
        {value: '2'},
        {value: '5'}
      ],
      defaultRadio: true,
      checkboxs: [{id: '1', label: 'aa'}, {id: '2', label: 'bb'}],
      defaultCheckbox: [],
      defaultToggle: false
    };
    this.alert = this.alert.bind(this);
    this.confirm = this.confirm.bind(this);
    this.prompt = this.prompt.bind(this);
    this.changeInpt = this.changeInpt.bind(this);
    this.changeSelect = this.changeSelect.bind(this);
    this.changeRadio = this.changeRadio.bind(this);
    this.changeCheckbox = this.changeCheckbox.bind(this);
    this.changeToggle = this.changeToggle.bind(this);
  }

  changeInpt(value) {
    console.log(value);
  }

  changeSelect(option) {
    console.log(option);
  }

  changeRadio(obj) {
    this.setState({defaultRadio: obj.item.value});
    console.log(obj);
  }

  changeCheckbox(obj) {
    const {defaultCheckbox} = this.state;
    let newArr;
    if (obj.checked) {
      if (defaultCheckbox.some(val => val.id === obj.item.id)) {
        return;
      }
      newArr = [...defaultCheckbox, obj.item];
    } else {
      newArr = defaultCheckbox.filter(val => val.id !== obj.item.id);
    }
    this.setState({defaultCheckbox: newArr});
    console.log(obj);
  }

  changeToggle(obj) {
    this.setState({defaultToggle: obj.checked});
    console.log(obj);
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
    const {
      defaultInpt,
      options,
      defaultOpt,
      selArrays,
      defaultRadio,
      checkboxs,
      defaultCheckbox,
      defaultToggle
    } = this.state;
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
        <div style={{padding: '10px'}}>
          <FormRadio
            name="radio"
            id="radio_yes"
            item={{value: true, label: '是'}}
            isChecked={defaultRadio}
            onChange={this.changeRadio}
          />
          <FormRadio
            name="radio"
            id="radio_no"
            item={{value: false, label: '否'}}
            isChecked={!defaultRadio}
            onChange={this.changeRadio}
          />
        </div>
        <div style={{padding: '10px'}}>
          {
            checkboxs.map((check, index) => {
              const id = `checkbox${check.id}`;
              const isChecked = defaultCheckbox.some((c) => {
                return check.id === c.id;
              });
              return (
                <FormCheckbox
                  key={index}
                  name="checkbox"
                  id={id}
                  item={check}
                  isChecked={isChecked}
                  onChange={this.changeCheckbox}
                />
              );
            })
          }
        </div>
        <div>
          <FormToggle
            name="toggle"
            id="toggle"
            item={{id: '1', value: 'toggle1'}}
            isChecked={defaultToggle}
            onChange={this.changeToggle}
          />
        </div>
      </div>
    );
  }
}
