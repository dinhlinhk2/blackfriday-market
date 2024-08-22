import { useState, useEffect } from 'react';

function useDebounce(searchValue, delay) {
    const [debouncedValue, setDebouncedValue] = useState(searchValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(searchValue);
        }, delay);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);
    return debouncedValue;
}

export default useDebounce;
