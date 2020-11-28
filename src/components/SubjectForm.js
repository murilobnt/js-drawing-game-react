import React from 'react'
import Input from '../forms/Input'
import { requiredValidation, minLengthValidation } from '../forms/validations'

const validate = {
  subject: (value) => minLengthValidation(3, value)
}

export default class SubjectForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      error: null,
      touched: false
    }

    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onChange(event) {
    const { name, value } = event.target
    this.setState((state) => ({
      ...state,
      [name] : value,
      touched : true
    }))
  }

  onBlur(event) {
    const { name, value } = event.target
    const error = validate[name] ? validate[name](value) : null
    const nameError = this.state.touched ? error : null

    this.setState((state) => ({
      ...state,
      error: nameError
    }))

    console.log(this.state)
  }

  onSubmit(event) {
    event.preventDefault()
    const subject = this.state.subject
    const m_error = validate['subject'] && validate['subject'](subject)
    this.setState((state) => ({
      ...state,
      error: m_error,
      touched: true
    }))

    if(!this.state.error && this.state.touched){
      console.log("Good to go!")
    }
  }

  onCancel(event) {
    this.props.onCancel()
  }

  render() {
    const commonProps = {
      values: this.state.subject,
      error: this.state.error,
      touched: this.state.touched,
      onChange: this.onChange,
      onBlur: this.onBlur
    }
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Add subject</h2>
        <Input
          type="textarea"
          label="Subject"
          name="subject"
          placeholder="Type the drawing subject"
          isRequired={true}
          {...commonProps}
        />
        <input type="submit" value="Add" />
        <button onClick={this.onCancel}>Cancel</button>
      </form>
    )
  }
}
