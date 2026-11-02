import { useEffect } from "react";

/**
 * Lets the browser/phone Back button close an overlay (lightbox, viewer)
 * instead of leaving the page: adds a history entry while it's open.
 */
export function useCloseOnBack(open: boolean, close: () => void, key: string) {
  useEffect(() => {
    if (!open) return;
    history.pushState({ [key]: true }, "");
    window.addEventListener("popstate", close);
    return () => {
      window.removeEventListener("popstate", close);
      // Closed some other way (X, Esc, backdrop): drop the history entry we added
      if (history.state?.[key]) history.back();
    };
    // close is a fresh closure each render; re-running on it would re-push
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, key]);
}
