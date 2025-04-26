
export const API_PATHS = {
   
    LOGIN: '/login',
    LOGOUT: '/logout',
    USER: '/user',
     CONTENTS: '/contents',
    CONTENT: (id: number | string) => `/contents/${id}`,
  };