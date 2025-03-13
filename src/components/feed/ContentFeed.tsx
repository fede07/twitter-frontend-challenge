import React from "react";
import Feed from "./Feed";
import { useGetFeed } from "../../hooks/useGetFeed";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll"

const ContentFeed = () => {
  const {posts ,fetchNextPage ,hasNextPage ,isLoading} =
    useGetFeed();

  return (
    <InfiniteScroll onLoadMore={fetchNextPage} hasMore={hasNextPage} loading={isLoading}>
      <Feed posts={posts} loading={isLoading}/>
    </InfiniteScroll>
  )
}

export default ContentFeed;
