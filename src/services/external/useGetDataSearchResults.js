import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const useGetDataSearchResults = () => {
  const MySwal = withReactContent(Swal);

  const getData = async (contentType, query) => {
    try {
      const endPoint = `https://api.themoviedb.org/3/search/${contentType}?api_key=d3c0215c2ca34a0fad2322c5e5f70ab4&query=${query}`;
      const res = await axios(endPoint);
      const data = res.data;
      const onlyContentWithPoster = data.results.filter(
        (content) => content.poster_path !== null && content,
      );
      return onlyContentWithPoster;
    } catch (error) {
      MySwal.fire({
        title: "ERROR",
        text: error?.response?.data?.message,
        icon: "success",
        heightAuto: false,
        customClass: {
          "swal2-container": "my-popup-class",
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
