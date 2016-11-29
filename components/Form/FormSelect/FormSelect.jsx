import React, {Component} from 'react';

export default class FormSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOpt: {
        value: '',
        text: ''
      }
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.resetDefaultValue(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.resetDefaultValue(nextProps);
  }

  onChange(option) {
    return () => {
      const {onChange} = this.props;
      this.setSelectedOpt(option);
      onChange(option);
    };
  }

  setSelectedOpt(option) {
    this.setState({
      selectedOpt: {
        value: option.id || option.value,
        text: option.text || option.label || option.name
      }
    });
  }

  resetDefaultValue(props) {
    const {defaultValue, options} = props;
    let defaultOpt = options[0];
    if (defaultValue) {
      for (let i = 0; i < options.length; i += 1) {
        if (defaultValue === options[i].id || defaultValue === options[i].value) {
          defaultOpt = options[i];
          break;
        }
      }
    }
    this.setSelectedOpt(defaultOpt);
  }

  render() {
    const {name, id, width, options} = this.props;
    const selectedOpt = this.state.selectedOpt;
    return (
      <div className="form_select form_select_over" style={{width}}>
        <div>{selectedOpt.text}</div>
        <i className="tshe-icon icon-tshe-expand-more selector_icon" />
        <input
          type="text"
          name={name}
          id={id}
          value={selectedOpt.value}
          readOnly="true"
        />
        <ul>
          {options.map((option, index) => {
            const optClass = selectedOpt.value === option.id || selectedOpt.value === option.value ? 'active' : '';
            return (
              <li
                className={optClass}
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
