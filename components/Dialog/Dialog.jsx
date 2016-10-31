import React, {Component, PropTypes} from 'react';
import cs from 'classnames';

export default class Dialog extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      type: 'alert',
      message: '',
      timeout: 2000,
      min: 0,
      max: 20,
      placeholder: '',
      defaultValue: '',
      callback: null
    };
    this.timer = null;
  }

  submit(){
    const dialog = this.state;
    let result;
    if(dialog.type === 'confirm') {
      result = true;
    } else {
      result = this.refs.inpt.value.trim();
      if(result.length < dialog.min || result.length > dialog.max){
        return;
      }
    }
    dialog.callback.call(null, result);
    this.close();
  }

  enter(event) {
    if(event.which === 13){
      this.submit();
    }
  }

  close() {
    this.refs.wrap.className = "dialog_wrap dialog_show";
    clearTimeout(this.timer);
    this.timer = setTimeout(function() {console.log('dd')
      this.setState({
        show: false
      });
    }.bind(this), 150);
  }

  componentDidUpdate() {
    if(this.state.show) {
      this.refs.inpt.value = this.state.defaultValue;
      this.timer = setTimeout(function() {
        this.refs.wrap.className = "dialog_wrap dialog_show active";
      }.bind(this));
      if(this.state.type === 'alert' && this.state.timeout) {
        this.timer = setTimeout(function() {
          if(this.refs.wrap.className.indexOf('active')<0) {return;}
          this.close();
        }.bind(this), this.state.timeout);
      }
    }
  }

  render() {
    const dialog = this.state;
    const dialogClass = cs({
      dialog_wrap: true,
      dialog_show: dialog.show
    });
    const alertClass = cs({
      dialog_alert: true,
      dialog_message: true,
      dialog_show: dialog.type === 'alert'
    });
    const confirmClass = cs({
      dialog_confirm: true,
      dialog_show: dialog.type === 'confirm'
    });
    const promptClass = cs({
      dialog_prompt: true,
      dialog_show: dialog.type === 'prompt'
    });
    const bottonClass = cs({
      dialog_btn: true,
      dialog_show: dialog.type === 'confirm' || dialog.type === 'prompt'
    });
    return (
      <div ref="wrap" className={dialogClass}>
        <div className="dialog_mask" onClick={this.close.bind(this)}></div>
        <div ref="stop" className="dialog_box">
          <div className={alertClass}>{dialog.message}</div>
          <div className={confirmClass}>
            <div className="dialog_message">{dialog.message}</div>
          </div>
          <div className={promptClass}>
            <div className="dialog_message">{dialog.message}</div>
            <div className="dialog_prompt_inpt">
              <input
                ref="inpt"
                type="text"
                placeholder={dialog.placeholder}
                onKeyUp={this.enter.bind(this)}/>
            </div>
          </div>
          <div className={bottonClass}>
              <button onClick={this.close.bind(this)}>取消</button>
              <button onClick={this.submit.bind(this)}>确定</button>
            </div>
        </div>
      </div>
    );
  }
}

Dialog.PropTypes = {
  show: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  placeholder: PropTypes.string,
  initValue: PropTypes.string,
  callback: PropTypes.func
}
