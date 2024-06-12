export default async function login(req, res) {
  const { credentials } = req.body.loginRequest;
  const [ username, password ] =
    Buffer.from(credentials, 'base64').toString().split(':');

  // TODO: Validate user from database

  res.status(200).send({
    loginResponse: {
      authenticated: true,
      sessionToken: '123'
    }
  });
}