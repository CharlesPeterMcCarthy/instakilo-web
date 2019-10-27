export default interface UserBrief {
  _id: string;
  username: string;
  avatar: {
    _id: string;
    imageURL: string;
  };
}
