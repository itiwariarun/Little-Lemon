export const validateEmail = (email) => {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // Case-insensitive pattern
  return emailPattern.test(email);
};
