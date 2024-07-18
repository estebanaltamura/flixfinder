import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const useCreateAccount = () => {
  const MySwal = withReactContent(Swal);

  const createAccount = async (userName, password) => {
    const projectCollection = 'movie-and-tv-series-browser-users';
    const req = { projectCollection, userName, password };

    try {
      await axios.post(
        'https://internal-server-projects.xyz.online:3100/registerUser',
        req,
        { timeout: 5000 }
      );
      MySwal.fire({
        title: 'USER CREATED',
        text: 'Please login with your user',
        icon: 'success',
        heightAuto: false,
      });
      return true;
    } catch (error) {
      MySwal.fire({
        title: 'ERROR',
        text: error?.response?.data?.message,
        icon: 'error',
        heightAuto: false,
      });
      console.log(error?.response?.data?.message);
      return false;
    }
  };

  return { createAccount };
};
