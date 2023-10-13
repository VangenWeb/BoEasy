// This is a hook I copy pasted from a previous project I worked on. Its original use were for styled-components themes, but it does translate quite well.
// I think, I haven't used MUI or Emotion before.

import { useCallback, useLayoutEffect, useState } from "react";
import { breakpoints } from "~/theme/breakpointsCss";

function getObjectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

type MediaQueryResult = {
  [key in keyof typeof breakpoints.media]: boolean;
};
/**
 * Hook returning a boolean for each media query in the theme. Assumes all themes have the same breakpoints.
 * Assumes theme.media entries are in the format: '@media <query>'
 * @returns {MediaQueryResult}
 */
export function useMediaQuery() {
  const theme = breakpoints;

  const matchMediaQueries = useCallback(() => {
    return getObjectKeys(theme.media).reduce((acc, key) => {
      const mediaQuery = theme.media[key].split("@media ")[1];

      if (!mediaQuery)
        return {
          ...acc,
        };

      const matches = getMatches(mediaQuery);

      return { ...acc, [key]: matches };
    }, {} as MediaQueryResult);
  }, [theme.media]);

  const [matches, setMatches] = useState<MediaQueryResult>(matchMediaQueries());

  function getMatches(query: string) {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  }

  useLayoutEffect(() => {
    const handleChange = () => {
      const queryResults = matchMediaQueries();
      setMatches(queryResults);
    };

    const windowBreakpoints = getObjectKeys(theme.media).map((key) => {
      const mediaQuery = theme.media[key].split("@media ")[1];

      if (!mediaQuery) return window.matchMedia(theme.media[key]);

      const windowBreakpoint = window.matchMedia(mediaQuery);

      return windowBreakpoint;
    }, []);

    windowBreakpoints.forEach((match) => {
      match.addEventListener("change", handleChange);
    });

    return () => {
      windowBreakpoints.forEach((match) => {
        match.removeEventListener("change", handleChange);
      });
    };
  }, [matchMediaQueries, theme.media]);

  return matches;
}
