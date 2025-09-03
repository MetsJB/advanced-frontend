import { MutableRefObject, useEffect, useRef } from "react";

export interface useInfiniteScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
  callback,
  triggerRef,
  wrapperRef,
}: useInfiniteScrollOptions) {
  useEffect(() => {
    const wrapperElement = wrapperRef.current
    const triggerElement = triggerRef.current

    let observe: IntersectionObserver | null = null;

    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: "0px",
        scrollMargin: "0px",
        threshold: 1.0,
      };

      observe = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observe.observe(triggerElement);
    }

    return () => {
      if (observe && triggerElement) {
        observe.unobserve(triggerElement);
      }
    };
  }, [wrapperRef, callback, triggerRef]);
}
