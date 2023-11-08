import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useCharacter(url,query) {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoding] = useState(false);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function fetchData() {
          if (query.length == 0) {
            setIsLoding(true);
          } else {
            setIsLoding(false);
          }
          // setIsLoding(true)
          try {
            const { data } = await axios.get(
              `${url}=${query}`,
              { signal }
            );
            setCharacters(data.results.slice(0, 5));
          } catch (err) {
            if (!axios.isCancel) {
              setCharacters([]);
              console.log(err.response.data.error);
              toast.error(err.response.data.error, {
                className: "errorToast",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
                iconTheme: {
                  primary: "#713200",
                  secondary: "#FFFAEE",
                },
              });
            }
          } finally {
            setIsLoding(false);
          }
        }
        fetchData();
        return () => {
          controller.abort();
        };
      }, [query]);
    return {characters,isLoading};
}

