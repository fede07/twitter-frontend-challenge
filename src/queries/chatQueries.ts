import {useInfiniteQuery ,useQuery} from "@tanstack/react-query"
import {useHttpRequestService} from "../service/HttpRequestService"

export function UseGetChat(query:string, enabled: boolean = true) {
  const service = useHttpRequestService();
  return useQuery({
    queryKey: ["chat", query],
    queryFn: async () => await service.getChat(query),
    staleTime: 10 * 6 * 1000,
    enabled: enabled,
  })
}

export function UseGetChatRooms(staleTimeSecs: number = 6,enabled: boolean = true) {
  const service = useHttpRequestService();
  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => await service.getChats(),
    staleTime: 10 * 6 * 1000,
    enabled: enabled,
  })
}

export function UseGetChatMessages(id: string, enabled: boolean = true, staleTimeSecs: number = 6) {
  const service = useHttpRequestService()
  return useQuery({
    queryKey: ["chat-message", id],
    queryFn: async () => await service.getChatMessages(id),
    staleTime: staleTimeSecs * 6 * 1000,
    enabled: enabled,
  })
}

export function UseGetInfiniteChatMessages(id: string, limit: number, query: string, enabled: boolean = true, staleTimeSecs: number = 6) {
  const service = useHttpRequestService()
  return useInfiniteQuery({
    queryKey: ["chat-message-inf", id],
    queryFn: async ({pageParam = null}) => {
      return await service.getChatMessagesPaginated(id, limit, pageParam ?? "")
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage?.length ? lastPage[lastPage.length - 1]?.id : undefined
    },
    enabled: enabled,
    staleTime: staleTimeSecs * 6 * 1000,
  })
}

export function UseGetMutualFollows(enabled: boolean = true) {
  const service = useHttpRequestService();
  return useQuery({
    queryKey: ["mutual-follows"],
    queryFn: async () => await service.getMutualFollows(),
    staleTime: 10 * 6 * 1000,
    enabled: enabled,
  })
}
