import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

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
    this.submit = this.submit.bind(this);
    this.enter = this.enter.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidUpdate() {
    if (this.state.show) {
      if (this.inpt) {
        this.inpt.value = this.state.defaultValue;
      }
      this.timer = setTimeout(() => {
        this.wrap.className = "dialog_wrap dialog_show active";
      });
      if (this.state.type === 'alert' && this.state.timeout) {
        this.timer = setTimeout(() => {
          if (this.wrap.className.indexOf('active') < 0) { return; }
          this.close();
        }, this.state.timeout);
      }
    }
  }

  submit() {
    const dialog = this.state;
    let result;
    if (dialog.type === 'confirm') {
      result = true;
    } else {
      result = this.inpt.value.trim();
      if (result.length < dialog.min || result.length > dialog.max) {
        return;
      }
    }
    dialog.callback(result);
    this.close();
  }

  enter(event) {
    if (event.which === 13) {
      this.submit();
    }
  }

  close() {
    this.wrap.className = "dialog_wrap dialog_show";
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        show: false
      });
    }, 150);
  }

  render() {
    const dialog = this.state;
    const dialogClass = classnames('dialog_wrap', {
      dialog_show: dialog.show
    });
    return (
      <div ref={(wrap) => { this.wrap = wrap; }} className={dialogClass}>
        <div className="dialog_mask" onClick={this.close} />
        <div className="dialog_box">
          {
            dialog.type === 'alert' &&
              <div className="dialog_alert dialog_message">{dialog.message}</div>
          }
          {
            dialog.type === 'confirm' &&
              <div className="dialog_confirm">
                <div className="dialog_message">{dialog.message}</div>
              </div>
          }
          {
            dialog.type === 'prompt' &&
              <div className="dialog_prompt">
                <div className="dialog_message">{dialog.message}</div>
                <div className="dialog_prompt_inpt">
                  <input
                    ref={(ref) => { this.inpt = ref; }}
                    type="text"
                    placeholder={dialog.placeholder}
                    onKeyUp={this.enter}
                  />
                </div>
              </div>
          }
          {
            (dialog.type === 'confirm' || dialog.type === 'prompt') &&
              <div className="dialog_btn">
                <button onClick={this.close}>取消</button>
                <button onClick={this.submit}>确定</button>
              </div>
          }
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
};
