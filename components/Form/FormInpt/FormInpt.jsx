import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class FormInpt extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      errorShow: false
    };
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.verifyText = this.verifyText.bind(this);
  }

  componentDidMount() {
    const {defaultValue} = this.props;
    this.inpt.value = defaultValue || '';
  }

  onChange(e) {
    const {onChange} = this.props;
    onChange(e.target.value);
  }

  onFocus() {
    this.setState({errorShow: false});
  }

  onBlur() {
    const {verify} = this.props;
    if (!verify) { return; }
    const result = this.inpt.value.trim();
    switch (verify.type) {
      case 'text':
        this.verifyText(result, {
          min: verify.min,
          max: verify.max
        });
        break;
      default:
        break;
    }
  }

  verifyText(result, obj) {
    const len = result.length;
    if ((obj.min && len < obj.min) || (obj.max && len > obj.max)) {
      this.setState({errorShow: true});
    } else {
      this.setState({errorShow: false});
    }
  }

  render() {
    const oldState = this.state;
    const {width, name, verify, unit, defaultValue, placeholder} = this.props;
    const error = verify && verify.error ? verify.error : '';
    const wrapClass = classnames('form_inpt', {
      error: oldState.errorShow,
      unit
    });
    return (
      <div
        style={{width}}
        className={wrapClass}
      >
        <input
          ref={(inpt) => { this.inpt = inpt; }}
          type="text"
          className="form_inpt__inpt"
          name={name}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
        <span className="form_inpt__unit">{unit}</span>
        <div className="form_inpt__error">{error}</div>
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
};
/*
verify: {//不传时不校验
  type: 'text',//类型[text,number],（不传时，switch=default）
  min: 1,//最小长度,type=number是为最小最大值,（必传）
  max: 20,//最大长度
  error: '错误信息！'//错误提示信息
}
*/
