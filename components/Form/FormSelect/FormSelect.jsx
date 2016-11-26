import React, {Component} from 'react';

export default class FormSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
  /*  const defaultOpt = this.props.options[0];
    this.setState({
      value: defaultOpt.text || defaultOpt.label || defaultOpt.name
    });*/
  }

  onChange(option) {
    return (e) => {
      const {onChange} = this.props;
      this.setState({
        value: option.text || option.label || option.name
      });
      onChange({
        option,
        checked: e.target.checked
      });
    };
  }

  componentUpdate() {
    console.log(this.props);
  }

  render() {
    const {id, width, options} = this.props;
    const value = this.state.value;
    const widthStyle = {width};
    return (
      <div className="form_select form_select_over" style={widthStyle}>
        <div>{value}</div>
        <i className="tshe-icon icon-tshe-expand-more selector_icon" />
        <input id={id} type="text" readOnly="true" value={value} />
        <ul>
          {options.map((option, index) => {
            return (
              <li
                key={index}
                onMouseDown={this.onChange(option)}
              >
                {option.text || option.label || option.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
