import Location from './location';
import Comment from './comment';

export default interface Post {
  _id?: string;
  description: string;
  imageURL: string;
  datetime?: Date;
  location: Location;
  hashTags: string[];
  comments?: Comment[];
}
