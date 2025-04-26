// src/hooks/useContent.ts
import { useQuery } from '@tanstack/react-query';
import { getAllContents, getContentById } from '@/api/content';

export const useContents = () => {
  return useQuery({
    queryKey: ['contents'],
    queryFn: getAllContents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useContent = (id: number) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: () => getContentById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id, // only fetch if id exists
  });
};
