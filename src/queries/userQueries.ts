import { useHttpRequestService } from '../service/HttpRequestService';
import { useQuery} from '@tanstack/react-query';

export function UseGetMyProfile(enabled: boolean = true) {
  const service = useHttpRequestService();
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => await service.me(),
    staleTime: 10 * 6 * 1000,
    enabled: enabled,
  });
}

export function UseGetProfileById(id: string, enabled: boolean = true) {
  const service = useHttpRequestService();
  return useQuery({
    queryKey: ['profile', id],
    queryFn: async () => await service.getProfile(id),
    staleTime: 10 * 6 * 1000,
    enabled: enabled,
  });
}

export function UseGetProfileView (id: string, enabled: boolean = true) {
  const service = useHttpRequestService();
  return useQuery({
    queryKey: ['profile-view', id],
    queryFn: async () => await service.getProfileView(id),
    staleTime: 10 * 6 * 1000,
    enabled: enabled,
  })
}

export function UseGetRecommendedUsers(limit: number, page: number, enabled: boolean = true) {
  const service = useHttpRequestService();
  return useQuery({
    queryKey: ['recommended-users', limit, page],
    queryFn: async () => await service.getRecommendedUsers(limit, page),
    staleTime: 10 * 6 * 1000,
    enabled: enabled,
  })
}
