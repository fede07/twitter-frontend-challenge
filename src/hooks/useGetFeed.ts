import { useEffect, useState } from "react";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {UseGetInfinitePosts } from "../queries/postQueries"

export const useGetFeed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const posts = useAppSelector((state) => state.user.feed);
  const query = useAppSelector((state) => state.user.query);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = UseGetInfinitePosts(5, query, !!query)

  const dispatch = useAppDispatch();

  // const service = useHttpRequestService();

  // const { data } = UseGetPosts(query, !!query)

  useEffect(() => {
    try {
      setLoading(true);
      setError(false);
      if (data) {
        // const updatedPosts = Array.from(new Set([...posts, ...(data || [])]));
        const updatedPosts = data?.pages?.flatMap((page) => page) || [];
        dispatch(updateFeed(updatedPosts));
        dispatch(setLength(updatedPosts.length));
        setLoading(false);
      }
    } catch (e) {
      setError(true);
      console.log(e);
    }
  }, [query]);

  useEffect(() => {
    if(isLoading){
      setLoading(true);
    } else {
      setLoading(false);
    }
  } ,[isLoading]);

  return { posts, loading, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError };
};
