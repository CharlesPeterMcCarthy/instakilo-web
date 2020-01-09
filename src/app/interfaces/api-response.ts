import { Post, PostBrief } from '@instakilo/common';

export interface GenericResponse {
  success: boolean;
}

export interface GetPostsResponse extends PostsResponse {
  lastKey: string;
  moreAvailable: boolean;
  // posts
  // success
}

export interface GetOwnPostsResponse extends PostsResponse {
  // posts
  // success
}

export interface GetPostResponse extends GenericResponse {
  post: Post;
  // success
}

export interface PostsResponse extends GenericResponse {
  posts: Post[];
  // success
}

export interface PostsBriefResponse extends GenericResponse {
  posts: PostBrief[];
  // success
}

export interface PostsByLocationResponse extends GenericResponse {
  posts: PostBrief[];
  locationName: string;
  // success
}

export interface MatchingHashTagsResponse extends GenericResponse {
  hashtags: Array<{ _tag: string }>;
  // success
}

export interface MatchingLocationsResponse extends GenericResponse {
  locations: Array<{ locationName: string; _placeId: string }>;
  // success
}
