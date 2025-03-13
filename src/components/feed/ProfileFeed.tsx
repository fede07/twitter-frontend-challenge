import React from "react";
import Feed from "./Feed";
import { useGetProfilePosts } from "../../hooks/useGetProfilePosts";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll"

const ProfileFeed = () => {
  const { posts, loading, hasNextPage, fetchNextPage } = useGetProfilePosts();

  return (
    <InfiniteScroll loading={loading} onLoadMore={fetchNextPage} hasMore={hasNextPage}>
      <Feed posts={posts} loading={loading} />
    </InfiniteScroll>
  );
};
export default ProfileFeed;
