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
    let observe: IntersectionObserver | null = null;

    if (callback) {
      const options = {
        root: wrapperRef.current,
        rootMargin: "0px",
        scrollMargin: "0px",
        threshold: 1.0,
      };

      observe = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observe.observe(triggerRef.current);
    }

    return () => {
      if (observe && triggerRef) {
        observe.unobserve(triggerRef.current);
      }
    };
  }, [wrapperRef, callback, triggerRef]);
}
