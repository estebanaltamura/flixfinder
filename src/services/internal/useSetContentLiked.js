import axios from 'axios';

export const useSetContentLiked = () => {
  const setContentLikedServer = async (token, updatedData) => {
    const projectCollection = 'movie-and-tv-series-browser-users';
    const req = { token, projectCollection, updatedData };

    try {
      await axios.post(
        'https://www.internal-server-projects.xyz:3100/setContentLikedData',
        req,
        { timeout: 5000 }
      );
      return true;
    } catch (error) {
      console.log(error?.response?.data?.message);
      return false;
    }
  };

  return {
    setContentLikedServer,
  };
};
