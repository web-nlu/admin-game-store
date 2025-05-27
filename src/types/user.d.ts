type UserInfo = {
  id: number;
  email: string;
  username: string,
  phoneNumber: string,
  address: string,
  avatar: string,
  activeRoles: [
    {
      id: number,
      name: string,
      deleted: boolean
    }
  ]
}