import api from '../lib/axios';
import { API_PATHS } from './path';
import { Content } from '@/types/content';

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

export type ContentInput = Omit<Content, 'id'>;

export const formatTechnologies = (techs: string | string[] | undefined): string => {
  if (!techs) return '';
  return Array.isArray(techs) ? techs.join(', ') : techs;
};

export const getAllContents = async (): Promise<Content[]> => {
  try {
    const response = await api.get(API_PATHS.CONTENTS);
    // Provjeri da li response.data ima data property (Laravel format)
    if (response.data && response.data.data) {
      return response.data.data;
    }
    // Ako nema data property, vrati direktno response.data
    return response.data;
  } catch (error) {
    console.error('Error fetching contents:', error);
    throw error;
  }
};

export const getContentById = async (id: number | string): Promise<Content> => {
  try {
    const response = await api.get(API_PATHS.CONTENT(id));
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching content with ID ${id}:`, error);
    throw error;
  }
};

export const createContent = async (formData: FormData): Promise<Content> => {
  try {
    const response = await api.post(API_PATHS.CONTENTS, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error('Error creating content:', error);
    throw error;
  }
};

export const updateContent = async (id: number | string, formData: FormData): Promise<Content> => {
  try {
    const response = await api.post(API_PATHS.CONTENT(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error(`Error updating content with ID ${id}:`, error);
    throw error;
  }
};

export const deleteContent = async (id: number | string): Promise<void> => {
  try {
    await api.delete(API_PATHS.CONTENT(id));
  } catch (error) {
    console.error(`Error deleting content with ID ${id}:`, error);
    throw error;
  }
};