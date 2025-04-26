import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_PATHS } from '../path';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// API Function
const createContentApi = async (formData: any): Promise<any> => {
  const response = await axios.post(`${API_URL}${API_PATHS.CONTENTS}`, formData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  return response.data.data;
};

export const useContentMutation = () => {
    console.log('useContentMutation hook called');
    const queryClient = useQueryClient();
  
    const mutation = useMutation(createContentApi, {
      onSuccess: () => {
        queryClient.invalidateQueries(['contents']);
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
    const response = await axios.get(`${API_URL}${API_PATHS.CONTENTS}`, {
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    return response.data.data;
  };

  return useQuery({
    queryKey: ['contents'],
    queryFn: getAllContents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
