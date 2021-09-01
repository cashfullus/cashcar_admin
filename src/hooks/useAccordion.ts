import React, { useCallback, useEffect, useRef, useState } from 'react';

const useAccordion = () => {
  const [isExpended, setIsExpended] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const expandRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const intervalId = useRef(0);
  const handleExpendButtonClick: React.MouseEventHandler<HTMLDivElement> = useCallback(async e => {
    e.stopPropagation();
    if (!detailRef.current || !contentRef.current) {
      return;
    }
    if (detailRef.current.style.height === 'auto') {
      detailRef.current.style.height = `${detailRef.current.clientHeight}px`;
    }
    const height = detailRef.current.clientHeight > 0 ? '0px' : `${contentRef.current.clientHeight}px`;
    detailRef.current.style.height = height;
    setIsExpended(prev => !prev);
    await new Promise<void>(resolve => {
      if (intervalId.current === 0) {
        intervalId.current = window.setInterval(() => {
          if (detailRef.current) {
            detailRef.current.style.height = 'auto';
            return resolve();
          }
        }, 200);
      } else {
        clearInterval(intervalId.current);
        intervalId.current = 0;
        return resolve();
      }
    });
  }, []);
  useEffect(() => {
    if (!expandRef.current || !summaryRef.current) {
      return;
    }
    expandRef.current.style.transform = isExpended ? 'rotate(180deg)' : 'rotate(0)';
    summaryRef.current.style.borderBottomLeftRadius = isExpended ? '0' : '0.5rem';
    summaryRef.current.style.borderBottomRightRadius = isExpended ? '0' : '0.5rem';
  }, [isExpended]);
  return { detailRef, contentRef, expandRef, summaryRef, handleExpendButtonClick };
};

export default useAccordion;
