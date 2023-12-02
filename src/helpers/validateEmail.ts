const validateEmail = (mail: string) => {
  if (
    /^[0-9a-zA-Z-]+(?:\.[a-zA-Z0-9-]+)*@[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-.]{2,})+$/.test(
      mail
    )
  ) {
    return true
  } else {
    return false
  }
}

export default validateEmail
