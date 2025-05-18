import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/axios';
import { API_PATHS } from '../path';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// API Function
const createContentApi = async (formData: FormData): Promise<any> => {
  const response = await api.post(`${API_URL}${API_PATHS.CONTENTS}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};

export const useContentMutation = () => {
    console.log('useContentMutation hook called');
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: createContentApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contents'] });
      },
      onError: (error) => {
        console.error('Error creating content:', error);
      },
    });
  
    return mutation;
  };
  

// API Function for fetching all contents
export const useContents = () => {
  const getAllContents = async (): Promise<any> => {
    const response = await api.get(`${API_URL}${API_PATHS.CONTENTS}`);

    return response.data.data;
  };

  return useQuery({
    queryKey: ['contents'],
    queryFn: getAllContents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
