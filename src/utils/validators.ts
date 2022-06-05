export const validateEmail = (email: string): string | false => {
  if (!new RegExp(`[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?`).test(email)) {
    return 'Must be a valid e-mail address'
  }
  return false
};

export const validatePassword = (password: string): string | false => {
  if (password.length < 8) {
    return 'Your password must be at least 8 characters'
  }
  return false
};
