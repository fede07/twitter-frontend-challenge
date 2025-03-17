import {useHttpRequestService} from "../service/HttpRequestService"
import {useInfiniteQuery ,useQuery} from "@tanstack/react-query"

export function UseGetPosts(query: string,enabled: boolean = true, id?: string) {
  const service = useHttpRequestService();

  return useQuery({
    queryKey: id ? ["posts", id] : ["posts", query],
    queryFn: async () => id ? await service.getCommentsByPostId(id) : await service.getPosts(query),
    staleTime: 10 * 6 * 1000,
    enabled: enabled,
    refetchOnWindowFocus: true,
  })
}

export function UseGetInfinitePosts(limit: number, query: string,enabled: boolean = true) {
  const service = useHttpRequestService()

  return useInfiniteQuery({
    queryKey: ['infinite-posts', query],
    queryFn: async ({pageParam = null}) => {
      return await service.getPaginatedPosts(limit, pageParam ?? '', query)
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage?.length ? lastPage[lastPage.length - 1]?.id : undefined
    },
    enabled: enabled,
  })
}

export function UseGetInfinitePostsFromProfile(id: string, limit: number, query: string, enabled: boolean = true) {
  const service = useHttpRequestService()

  return useInfiniteQuery({
    queryKey: ['infinite-posts-id', query],
    queryFn: async ({pageParam = null}) => {
      return await service.getPaginatedPostsFromProfile(limit, pageParam ?? '', id)
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage?.length ? lastPage[lastPage.length - 1]?.id : undefined
    },
    enabled: enabled,
  })
}

export function UseGetPostsFromProfile(id: string, enabled: boolean = true) {
  const service = useHttpRequestService();
  return useQuery({
    queryKey: ["postsFromProfile", id],
    queryFn: async () => await service.getPostsFromProfile(id),
    staleTime: 10 * 6 * 1000,
    enabled: enabled,
    refetchOnWindowFocus: true,
  })
}

export function UseGetPostById(id: string, enabled: boolean = true) {
  const service = useHttpRequestService();
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => await service.getPostById(id),
    staleTime: 10 * 6 * 1000,
    enabled: enabled,
  })
}

export function UseIsReacted(id: string, reaction: string, enabled: boolean = true) {
  const service = useHttpRequestService()
  return useQuery({
    queryKey: ["reactions", id],
    queryFn: async () => await service.isReacted(id, reaction),
    staleTime: 10 * 6 * 1000,
    enabled: enabled,
  })
}
