// src/hooks/useContent.ts
import { useQuery } from '@tanstack/react-query';
import { getAllContents, getContentById } from '../api/content';

// Hook for fetching all contents
export const useContents = () => {
  return useQuery({
    queryKey: ['contents'],
    queryFn: getAllContents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for fetching a single content by ID
export const useContent = (id: number) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: () => getContentById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id, // Only run the query if id is provided
  });
};