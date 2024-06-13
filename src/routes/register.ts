import { Request, Response } from "express";

export default async function register(req: Request, res: Response) {
  const { credentials, loginNow } = req.body.registerRequest;
  const [ username, password ] =
    Buffer.from(credentials, 'base64').toString().split(':');
  // TODO: Validate and add user to database

  res.status(200).send({
    registerResponse: {
      authenticated: true,
      sessionToken: loginNow ? '123' : null
    }
  });
}