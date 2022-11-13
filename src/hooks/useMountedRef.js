import React, {useRef, useEffect} from 'react';

/** 페이지 로딩이 완료되었음을 감지하기 위한 커스텀 훅 */
const useMountedRef = () => {
    const mountedRef = useRef(false);

    useEffect(() => {
        setTimeout(() => {
            mountedRef.current = true;
        })
    }, []);

  return mountedRef;
};

export default useMountedRef;