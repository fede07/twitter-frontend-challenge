import { useEffect, useState } from "react";
import { updateFeed } from "../redux/user";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { UseGetPostsFromProfile} from "../queries/postQueries"

export const useGetProfilePosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const posts = useAppSelector((state) => state.user.feed);
  const dispatch = useAppDispatch();
  const id = useParams().id;
  // const service = useHttpRequestService();

  const { data } = UseGetPostsFromProfile(id!, !!id)

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);
    try{
      if (data) {
        const updatedPosts = Array.from(new Set([...posts, ...(data || [])])).filter(
          (post) => post.authorId === id
        );
        dispatch(updateFeed(updatedPosts));
        setLoading(false);
      }
    } catch {
        setError(true);
        setLoading(false);
    }
  }, [id]);

  return { posts, loading, error };
};
