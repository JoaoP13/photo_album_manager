import { Request, Response } from 'express';

class BasicController {
  request: Request;
  response: Response;
  model!: string;

  public constructor(req: Request, res: Response) {
    this.request = req;
    this.response = res;
  }

  async list(): Promise<object[] | object> {
    try {
      this.response.status(200).send({ message: 'teste controller' });

      return {};
    } catch (err: any) {
      this.response.status(err.status || 400).send({
        message: 'Ocorreu um erro ao listar os dados.',
      });

      return {
        errors: err.erros || [],
        message: err.message,
        status: 400,
        errorType: err?.errorType,
      };
    }
  }
}

export default BasicController;
