import { useEffect, useState } from 'react';
import axios from 'axios';

interface Character {
    results: any[];
}

export default function useSearch2(category: string, pageNumber: number) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [character, setCharacter] = useState<Character['results']>([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setCharacter([]);
    }, [category])

    useEffect(() => {
        setLoading(true);
        setError(false);
        const getApiUrl = (category: string): string => {
            switch (category) {
                case 'characters':
                    return 'https://rickandmortyapi.com/api/character';
                case 'location':
                    return 'https://rickandmortyapi.com/api/location';
                case 'episode':
                    return 'https://rickandmortyapi.com/api/episode';
                default:
                    throw new Error(`Unknown category: ${category}`);
            }
        };

        let cancel: (() => void) | undefined;
        axios({
            method: 'GET',
            url: getApiUrl(category), 
            params: { page: pageNumber },
            cancelToken: new axios.CancelToken((c) => cancel = c)
        }).then((res) => {
            console.log(res.data.results);
            setCharacter(prevState => {
                return [...prevState, ...res.data.results];
            });
            setHasMore(res.data.results !== null);
            setLoading(false);
            setError(false);
        }).catch(e => {
            if (axios.isCancel(e)) {
                return;
            }
            setError(true);
            setLoading(false);
            console.error(e);
        })
        return () => cancel();
    }, [category, pageNumber]) 

    return {
        loading,
        character,
        hasMore,
        error
    };
}

