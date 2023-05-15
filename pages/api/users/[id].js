// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { userRepo } from 'helpers/users-repo';

export default handler;

function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getUserById();
    case 'PUT':
      return updateUser();
    case 'DELETE':
      return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} not Allowed`);
  }
  function getUserById() {
    const user = userRepo.getById(req.query.id);
    return res.status(200).json(user);
  }
  function updateUser(){
    try {
      userRepo.update(req.query.id, req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({message:error})
}
  }
  function deleteUser() {
    userRepo.delete(req.query.id);
    return res.status(200).json();
  }
}