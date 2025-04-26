import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContent as apiCreateContent } from '../api/content';
import type { Content } from '../types/content'; // ili gde god da ti je definisan `Content`

export const useContentMutation = () => {
  const queryClient = useQueryClient();

  const createContent = useMutation<unknown, unknown, Content>({
    mutationFn: (formData) => apiCreateContent(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    }
  });

  return { createContent };
};
