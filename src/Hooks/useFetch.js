import { useEffect, useState } from "react";

function useFetch(url) {

    const [data, setData] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            try {
                const response = await fetch(url);
                const response2 = await response.json();
                setData(response2);
            }
            catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }

        if (url) getData();
    }, [url])

    return [data, loading, error]
}

export default useFetch;