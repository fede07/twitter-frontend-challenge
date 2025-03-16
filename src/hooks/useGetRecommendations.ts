import { useEffect, useState } from "react";
import { Author } from "../service";
import {UseGetRecommendedUsers} from "../queries/userQueries"

interface UseGetRecommendationsProps {
  page: number;
}

export const useGetRecommendations = ({ page }: UseGetRecommendationsProps) => {
  const [users, setUsers] = useState<Author[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Nuevo estado para verificar si hay más elementos
  // const service = useHttpRequestService();

  const {data: recommendedUsers, isLoading, error: errorFetch} = UseGetRecommendedUsers(10, page, true)

  useEffect(() => {
    if(recommendedUsers?.length !== undefined) {
      if(recommendedUsers.length === 0) {
        setHasMore(false)
      } else {
        setUsers((prev) => {
          const uniqueIds = new Set(prev.map((user) => user.id));
          const filteredUsers = recommendedUsers.filter(
            (user: Author) => !uniqueIds.has(user.id)
          );
          return [...prev, ...filteredUsers];
        })
      }
    }
  } ,[recommendedUsers]);

  return { users, loading: isLoading, error: errorFetch, hasMore}

  // const getUsers = async () => {
  //   // return await service.getRecommendedUsers(10, page);
  //   await refetch()
  // };
  //
  // useEffect(() => {
  //   if (page !== undefined && hasMore) {
  //     setLoading(true);
  //     getUsers()
  //       .then((response) => {
  //         if (response.length === 0) {
  //           setHasMore(false);
  //         } else {
  //           setUsers((prev) => {
  //             const uniqueIds = new Set(prev.map((user) => user.id));
  //             const filteredUsers = response.filter(
  //               (user: Author) => !uniqueIds.has(user.id)
  //             );
  //             return [...prev, ...filteredUsers];
  //           });
  //         }
  //         setLoading(false);
  //       })
  //       .catch((e) => {
  //         setError(e);
  //         setLoading(false);
  //       });
  //   }
  // }, [page, hasMore]);

  // return { users, loading, error };
};
