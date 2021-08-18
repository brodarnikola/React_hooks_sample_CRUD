import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const dataFetchReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT_LOADING':
        return { 
            // this ...state is previous state.. This is previous state of our combined 3 parameters: 1) isLoading, 2) isError, 3) data
            ...state, 
            isLoading: true, 
            isError: false };
      case 'FETCH_SUCCESS':
        return {
          // this "...state" is previous state.. This is previous state of our combined 3 parameters: 1) isLoading, 2) isError, 3) data
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case 'FETCH_FAILURE':
        return {
            // this "...state" is previous state.. This is previous state of our combined 3 parameters: 1) isLoading, 2) isError, 3) data
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  };

const useCustomReducerDataApi = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData
    })

    useEffect(() => {

        let didCancel = false;
        const fetchData = async () => {

            dispatch({ type: 'FETCH_INIT_LOADING' })

            try {
                const result = await axios( url );

                //dispatch({ type: 'FETCH_SUCCESS', payload: result.data })

                setTimeout(() => {
                    if( !didCancel )
                        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
                }, 1000)
            }
            catch (error) {
                //dispatch({ type: 'FETCH_FAILURE' })
                setTimeout(() => { 
                    if( !didCancel )
                        dispatch({ type: 'FETCH_FAILURE' })
                }, 1000)
            }
        };

        fetchData();

        return() => {
            didCancel = true
        }
    }, [url]);

    return [state, setUrl]

}

export default useCustomReducerDataApi
