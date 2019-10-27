import UserBrief from './user-brief';

export default interface Comment {
  text: string;
  datetime: Date;
  user: UserBrief;
}
