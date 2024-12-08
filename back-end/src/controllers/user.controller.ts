import { Request, Response } from 'express';
import BasicController from './basic.controller';

class UserController extends BasicController {
  public constructor(req: Request, res: Response) {
    super(req, res);
    this.model = 'User';
  }
}

export default UserController;
