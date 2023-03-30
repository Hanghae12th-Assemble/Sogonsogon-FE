import { useEffect, useState } from 'react';

function useScroll(ref) {
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            setScrollPos(ref?.current?.scrollTop);
        };
        ref?.current?.addEventListener('scroll', onScroll);
        return () => ref.current?.removeEventListener('scroll', onScroll);
    }, [ref]);

    return scrollPos;
}

export default useScroll;
