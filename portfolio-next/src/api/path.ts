export const API_PATHS = {
  LOGIN: 'api/login',
  LOGOUT: 'api/logout',
  USER: 'api/user',
  CONTENTS: 'api/contents',
  CONTENT: (id: number | string) => `api/contents/${id}`,
};
