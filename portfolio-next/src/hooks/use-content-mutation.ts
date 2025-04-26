// src/hooks/useContentMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContent as apiCreateContent } from '@/api/content';

export const useContentMutation = () => {
  const queryClient = useQueryClient();

  const createContent = useMutation({
    mutationFn: apiCreateContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });

  return { createContent };
};
