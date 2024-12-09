import { Request, Response } from 'express';
import BasicController from './basic.controller';
import UserService from '../services/user.service';
import { User } from '../database/models/User';

class UserController extends BasicController {
  userService: UserService;

  public constructor(req: Request, res: Response) {
    super(req, res);
    this.model = 'User';
    this.userService = new UserService();
  }

  async listUsers(): Promise<User[] | undefined> {
    try {
      const result: User[] | undefined = await this.userService.list();

      this.response.status(200).send(result);

      return result;
    } catch (err: any) {
      this.response.status(err.status || 400).send({
        message: 'Ocorreu um erro ao listar os dados.',
      });

      return [];
    }
  }
}

export default UserController;
