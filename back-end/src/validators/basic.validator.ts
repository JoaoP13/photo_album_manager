import ValidatorError from '../error/ValidatorError';

function isEmailValid(email: string) {
  const isEmail = /\S+@\S+\.\S+/.test(email);

  if (!isEmail) {
    throw new ValidatorError('O e-mail informado não é válido', 400);
  }

  return true;
}

export { isEmailValid };
