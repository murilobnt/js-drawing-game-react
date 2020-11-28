import React from 'react'

function Label({ label, isRequired }) {
  return (
    <label className="label">
      {label}
      {isRequired && <span style={{ color: 'red' }}>*</span>}
    </label>
  )
}

function Error({ touched, error }) {
  return (
    <div>
      <div className="error">{touched && error}</div>
    </div>
  )
}

export default function Input({
  type,
  label,
  name,
  placeholder,
  values,
  onChange,
  onBlur,
  isRequired,
  touched,
  error
}) {
  const commonProps = {
    name,
    value: values,
    placeholder,
    onChange,
    onBlur,
    className: error ? 'input-error' : ''
  }
  return (
    <div className="form-item">
      <Label label={label} isRequired={isRequired} />
      <div>
        {
          {
            input: <input type="text" {...commonProps} />,
            textarea: <textarea rows="4" {...commonProps} />
          }[type || 'input']
        }
        <Error touched={touched} error={error} />
      </div>
    </div>
  )
}
