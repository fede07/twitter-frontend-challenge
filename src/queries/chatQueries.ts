import {useQuery} from "@tanstack/react-query"
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

export function UseGetChats(enabled: boolean = true) {
  const service = useHttpRequestService();
  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => await service.getChats(),
    staleTime: 10 * 6 * 1000,
    enabled: enabled,
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
