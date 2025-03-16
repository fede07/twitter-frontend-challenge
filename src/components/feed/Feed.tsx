import React from "react";
import { Post } from "../../service";
import { StyledContainer } from "../common/Container";
import Tweet from "../tweet/Tweet";
import Loader from "../loader/Loader";
import {UseGetMyProfile} from "../../queries/userQueries"

interface FeedProps {
  posts: Post[];
  loading: boolean;
}

const Feed = ({ posts, loading }: FeedProps) => {
  const {data: user} = UseGetMyProfile()
  if (!posts) {
    return <StyledContainer width={"100%"} alignItems={"center"}>No posts yet!</StyledContainer>
  }

  return (
    <StyledContainer width={"100%"} alignItems={"center"}>
      {posts
        .filter((post, index, self) => {
          return self.findIndex((p) => p.id === post.id) === index;
        })
        .map((post: Post) => (
          <Tweet key={post.id} post={post} user={user} />
        ))}
      {loading && <Loader />}
    </StyledContainer>
  );
};

export default Feed;
