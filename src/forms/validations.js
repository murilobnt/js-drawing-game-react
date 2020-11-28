export function minLengthValidation(minLength, value) {
  if (value.trim().length < minLength) {
    return `This field requires ${minLength} characters`
  }
  return null
}

export function requiredValidation(value) {
  if (value.trim() === '') {
    return 'This field is required'
  }
  return null
}
