import { useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
    const [data, setData] = useState( initialData );
    const [url, setUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false)
            setIsLoading(true);

            try {
                const result = await axios(
                    url
                );

                setTimeout(() => {
                    setData(result.data);
                    setIsLoading(false)
                }, 1000)
            }
            catch (error) {
                setTimeout(() => {
                    setIsLoading(false)
                    setIsError(true)
                }, 1000)
            }
        };

        fetchData();
    }, [url]);

    return [{data, isLoading, isError}, setUrl]

}

export default useDataApi
