export const validateEmail = (email: string) => {
  // TODO(XXX): change this simple regexp to an actual email regexp
  return /.+@.+\..+/.test(email);
};

// validatePassword checks if password is strong enough
export const validatePassword = (password: string) => {
  const errors = [];
  if (password.length < 8) {
    errors.push('Your password must be at least 8 characters');
  }
  return errors;
};
