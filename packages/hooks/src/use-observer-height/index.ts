import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

/**
 * 观察元素高度变化的 Hook
 * @param ref - 要观察的元素的 ref
 * @returns 元素的高度
 */
export const useObserverHeight = (ref: React.RefObject<HTMLElement>) => {
  const [height, setHeight] = useState(0);

  const heightChange = useCallback(
    debounce((params: number) => {
      setHeight(params);
    }, 500),
    [],
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const newHeight = entries[0].target.clientHeight;
      heightChange(newHeight);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, heightChange]);

  return height;
};

export default {
  useObserverHeight,
};
