import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class FormInpt extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      inptErrorShow: false
    };
    this.onBlur = this.onBlur.bind(this);
    this.verifyText = this.verifyText.bind(this);
  }

  componentDidMount() {
    const {defaultValue} = this.props;
    this.inpt.value = defaultValue ? defaultValue : '';
  }

  onBlur() {
    const {verify} = this.props;
    if (!verify) { return; }
    const result = this.inpt.value.trim();
    switch (verify.type){
      case 'text':
        this.verifyText(result, verify.min, verify.max);
    }
  }

  verifyText(result, min, max) {
    const len = result.length;
    if (len < min || max&&len > max) {
      this.setState({inptErrorShow: true});
    } else {
      this.setState({inptErrorShow: false});
    }
  }

  render() {
    const oldState = this.state;
    const {inptWidth, inptHeight, name, placeholder, defaultValue, verify} = this.props;
    const inptClass = classnames('form_inpt',{
      'form_inpt_${inptWidth}': inptWidth,
      'form_inpt_${inptHeight}': inptHeight,
    });
    const error = verify&&verify.inptError ? verify.inptError : '';
    const errorClass = classnames('form_inpt_error',{
      active: oldState.inptErrorShow
    });
    return (
      <div className="form_inpt_wrap">
        <input
          ref={(inpt) => { this.inpt = inpt; }}
          className={inptClass}
          name={name}
          type='text'
          placeholder={placeholder}
          onBlur={this.onBlur}
        />
        <div className={errorClass}>{error}</div>
      </div>
    );
  }
}

FormInpt.PropTypes = {
  inptWidth: PropTypes.string,
  inptHeight: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  verify: PropTypes.object
}
/*
verify: {//不传时不校验
  type: 'text',//类型[text,number],（不传时，switch=default）
  min: 1,//最小长度,type=number是为最小最大值,（必传）
  max: 20,//最大长度
  inptError: '错误信息！'//错误提示信息
}
*/
