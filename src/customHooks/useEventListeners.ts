import { useContext, useEffect, useState, useRef, useCallback, useMemo } from 'react'; 


// Custom React Hook
export default function useEventListener(
  eventName: string,
  eventHandler = () => null,
  element = window
) {
  // useCallback return a memoized version of our eventHanlder.
  // It only changes if the eventHandler has changed.
  // This allows us to prevent unnecessary renders.
  const handleEventHandler = useCallback(
    event => {
      if (typeof eventHandler === "function") {
        eventHandler(event);
      }
    },
    [eventHandler]
  );

  useEffect(
    () => {
      // Check if the element supports the addEventListener method
      const checked = element && element.addEventListener;
      // Stop here if not supported
      if (!checked) return;
      // Add event listener
      element.addEventListener(eventName, handleEventHandler);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, handleEventHandler);
      };
    },
    [eventName, element, handleEventHandler] // Re-run if eventName, element, or eventHandler changes
  );
}

// const useInputOffset = (targetOffset = 220): number => {
//   const { inputOffsetTop } = useContext(KeyboardContext);
//   const [marginTop, setMarginTop] = useState(0);

//   useEffect(() => {
//     if (!inputOffsetTop) return setMarginTop(0);
//     setMarginTop((prev) => {
//       // account for when the top is already being pushed
//       const actualInputOffset = prev ? inputOffsetTop - prev : inputOffsetTop;
//       return -(actualInputOffset - targetOffset);
//     });
//   }, [inputOffsetTop, targetOffset]);

//   return marginTop;
// };

// export default useInputOffset;
