import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [character, setCharacter] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setCharacter([]);
    }, [query])

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        axios({
            method: 'GET',
            url: 'http://rickandmortyapi.com/api/character',
            params: { name: query, page: pageNumber },
            cancelToken: new axios.CancelToken((c) => cancel = c)
        }).then((res) => {
            setCharacter(prevState=> {
                return [...new Set([...prevState, ...res.data.results])]
            });
            setLoading(false);
        }).catch(e => {
            if(axios.isCancel(e)) {
                return;
            }
            setError(false);
            console.error(e);
        })
        return () => cancel();
    }, [query, pageNumber])

  return {
    loading,
    character,
    hasMore,
    error
  };
}
