// src/api/content.ts
import axiosInstance from './axiosInstance';
import { API_PATHS } from './path';
import { Content } from '@/types/content';

export type ContentInput = Omit<Content, 'id'>;

export const formatTechnologies = (techs: string | string[] | undefined): string => {
  if (!techs) return '';
  return Array.isArray(techs) ? techs.join(', ') : techs;
};

export const getAllContents = async (): Promise<Content[]> => {
  const { data } = await axiosInstance.get(API_PATHS.CONTENTS);
  if (data?.data && Array.isArray(data.data)) {
    return data.data;
  }
  throw new Error('Unexpected data format received from server');
};

export const getContentById = async (id: number): Promise<Content> => {
  const { data } = await axiosInstance.get(API_PATHS.CONTENT(id));
  if (data?.data) {
    return data.data;
  }
  throw new Error('Content not found');
};

export const createContent = async (formData: FormData): Promise<Content> => {
  const { data } = await axiosInstance.post(API_PATHS.CONTENTS, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.data;
};

export const updateContent = async (id: number, formData: FormData): Promise<Content> => {
  const { data } = await axiosInstance.put(API_PATHS.CONTENT(id), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.data;
};

export const deleteContent = async (id: number): Promise<void> => {
  await axiosInstance.delete(API_PATHS.CONTENT(id));
};
