import React, {Component} from 'react';

export default class FormRadio extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const {item, onChange} = this.props;
    onChange({
      item,
      checked: e.target.checked
    });
  }

  render() {
    const {name, id, item, isChecked} = this.props;
    return (
      <div className="form_radio">
        <input
          type="radio"
          name={name}
          id={id}
          value={item.id || item.value}
          checked={isChecked}
          onChange={this.onChange}
        />
        <label
          htmlFor={id}
        >
          {item.text || item.label || item.name}
        </label>
      </div>
    );
  }
}
