import { Request, Response } from 'express';

class BasicController {
  request: Request;
  response: Response;
  model!: string;

  public constructor(req: Request, res: Response) {
    this.request = req;
    this.response = res;
  }
}

export default BasicController;
