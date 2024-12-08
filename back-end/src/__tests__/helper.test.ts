import { isEmailValid } from '../validators/basic.validator';
import ValidatorError from '../error/ValidatorError';

it('checando se o e-mail teste@gmail.com é válido', () => {
  expect(isEmailValid('teste@gmail.com')).toBe(true);
});

test('checando se o e-mail testegmail.com é inválido', () => {
  expect(() => isEmailValid('testegmail.com')).toThrow(ValidatorError);
});
