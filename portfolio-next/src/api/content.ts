
import axios from 'axios';
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
    const response = await axios.get(`${API_URL}${API_PATHS.CONTENTS}`, {
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      }
    });
  
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    console.error('Unexpected API response format:', response.data);
    throw new Error('Unexpected data format received from server');
  } catch (error) {
    console.error('Error fetching content data:', error);
    throw error;
  }
};

export const getContentById = async (id: number): Promise<Content> => {
  try {
    const response = await axios.get(`${API_URL}${API_PATHS.CONTENT(id)}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      }
    });
    
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    throw new Error('Content not found');
  } catch (error) {
    console.error(`Error fetching content with ID ${id}:`, error);
    throw error;
  }
};

export const createContent = async (formData: FormData): Promise<Content> => {
  try {
    const response = await axios.post(`${API_URL}${API_PATHS.CONTENTS}`, formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data', 
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      }
    });
    
    return response.data.data;
  } catch (error) {
    console.error('Error creating content:', error);
    throw error;
  }
};


export const updateContent = async (id: number, formData: FormData): Promise<Content> => {
  try {
    const response = await axios.put(`${API_URL}${API_PATHS.CONTENT(id)}`, formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      }
    });
    
    return response.data.data;
  } catch (error) {
    console.error(`Error updating content with ID ${id}:`, error);
    throw error;
  }
};


export const deleteContent = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}${API_PATHS.CONTENT(id)}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      }
    });
  } catch (error) {
    console.error(`Error deleting content with ID ${id}:`, error);
    throw error;
  }
};