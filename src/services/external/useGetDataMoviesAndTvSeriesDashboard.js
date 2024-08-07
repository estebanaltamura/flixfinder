import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const useGetDataMoviesAndTvSeriesDashboard = () => {
  const MySwal = withReactContent(Swal);

  const getData = async (contentType) => {
    try {
      const endPoint = `https://api.themoviedb.org/3/discover/${contentType}?api_key=d3c0215c2ca34a0fad2322c5e5f70ab4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
      const res = await axios(endPoint);
      const data = res.data;
      const onlyContentWithPoster = data.results.filter(
        (content) => content.poster_path !== null && content
      );
      return onlyContentWithPoster;
    } catch (error) {
      MySwal.fire({
        title: 'ERROR',
        text: error?.response?.data?.message,
        icon: 'success',
        heightAuto: false,
        customClass: {
          'swal2-container': 'my-popup-class',
        },
      });
      console.log(error?.response?.data?.message);
      return false;
    }
  };

  return {
    getData,
  };
};
