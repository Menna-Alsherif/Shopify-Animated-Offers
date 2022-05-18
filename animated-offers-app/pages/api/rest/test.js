export default function test(req, res) {

  const users = [
    {id:1, login: 'test 1'},
    {id:2, login: 'test 2'},
    {id:3, login: 'test 3'},
  ];


  res.status(200).json(users);
}
