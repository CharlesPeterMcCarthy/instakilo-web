import { Post, PostBrief, HashTagSearchResult, LocationSearchResult } from '@instakilo/common';

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
  hashtags: HashTagSearchResult[];
  // success
}

export interface MatchingLocationsResponse extends GenericResponse {
  locations: LocationSearchResult[];
  // success
}
