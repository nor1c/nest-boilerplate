export class UserToken {
  static readonly User: unique symbol = Symbol('User');

  static readonly UserServiceInterface: unique symbol = Symbol('UserServiceInterface');
  static readonly UserRepositoryInterface: unique symbol = Symbol('UserRepositoryInterface');
}
