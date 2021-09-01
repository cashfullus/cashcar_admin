import { useCallback, useEffect, useRef, useState } from 'react';

const useImageSlide = () => {
  const slideRef = useRef<HTMLDivElement>(null);
  const page = useRef(0);
  const [scrollEnd, setScrollEnd] = useState({ left: true, right: false });
  useEffect(() => {}, []);
  const onScroll: React.UIEventHandler<HTMLDivElement> = useCallback(({ currentTarget }) => {
    const { scrollWidth, clientWidth, scrollLeft } = currentTarget;
    const currentPosition = scrollWidth - clientWidth;
    if (scrollLeft === 0) {
      return setScrollEnd(prev => ({ ...prev, left: true }));
    }
    if (currentPosition - scrollLeft === 0) {
      return setScrollEnd(prev => ({ ...prev, right: true }));
    }
    return setScrollEnd({ left: false, right: false });
  }, []);
  // 현재 위치에서 clientWidth만큼 이동하게 할 것
  const gotoRightSlide = useCallback(() => {
    slideRef.current?.scrollBy({
      left: (page.current + 1) * (slideRef.current.clientWidth / 2),
      behavior: 'smooth',
    });
    return page.current + 1;
  }, []);
  const gotoLeftSlide = useCallback(() => {
    slideRef.current?.scrollBy({
      left: (page.current - 1) * (slideRef.current.clientWidth / 2),
      behavior: 'smooth',
    });
    return page.current - 1;
  }, []);
  return { onScroll, slideRef, scrollEnd, gotoRightSlide, gotoLeftSlide };
};

export default useImageSlide;
