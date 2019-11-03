import { Post } from '@instakilo/common';

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

interface PostsResponse extends GenericResponse {
  posts: Post[];
  // success
}
