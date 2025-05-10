import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContent, updateContent, deleteContent } from '../api/content';
import type { Content } from '../types/content'; // ili gde god da ti je definisan `Content`

export const useContentMutation = () => {
  const queryClient = useQueryClient();

  const createContentMutation = useMutation({
    mutationFn: createContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });

  const updateContentMutation = useMutation({
    mutationFn: ({ id, formData }: { id: number | string; formData: FormData }) =>
      updateContent(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });

  const deleteContentMutation = useMutation({
    mutationFn: deleteContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });

  return {
    createContent: createContentMutation,
    updateContent: updateContentMutation,
    deleteContent: deleteContentMutation,
  };
};
