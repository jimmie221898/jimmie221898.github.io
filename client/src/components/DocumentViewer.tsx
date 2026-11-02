/*
 * DESIGN PHILOSOPHY: Quiet Modernism
 * In-page viewer for a capstone document. Shows the PDF's pages as images
 * rather than embedding the PDF, since phone browsers won't display a PDF
 * inside the page. Zoom, page counter, download and open-in-new-tab.
 */

import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCloseOnBack } from "@/hooks/useCloseOnBack";
import type { CapstoneDocument } from "@/lib/capstone";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ArrowDownToLine,
  ExternalLink,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useLayoutEffect, useRef, useState, type RefObject } from "react";

// Zoom levels, as a multiple of the fit-to-width page size
const ZOOM_STEPS = [1, 1.25, 1.5, 2];
// Page width at 100% on wide screens, in px
const PAGE_WIDTH = 850;

interface DocumentViewerProps {
  doc: CapstoneDocument;
  downloadName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Closes on X, Esc, a click on the backdrop, or Back. */
export default function DocumentViewer({
  doc,
  downloadName,
  open,
  onOpenChange,
}: DocumentViewerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  useCloseOnBack(open, () => onOpenChange(false), "capstoneDocument");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/80" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          // Focus the pages so Space / Page Down / arrow keys scroll them
          onOpenAutoFocus={e => {
            e.preventDefault();
            scrollerRef.current?.focus();
          }}
          onClick={() => onOpenChange(false)}
          className="fixed inset-0 z-50 flex items-center justify-center sm:p-6 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-200"
        >
          <ViewerPanel
            doc={doc}
            downloadName={downloadName}
            scrollerRef={scrollerRef}
          />
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

// Mounted only while the viewer is open, so zoom and page reset each time
function ViewerPanel({
  doc,
  downloadName,
  scrollerRef,
}: {
  doc: CapstoneDocument;
  downloadName: string;
  scrollerRef: RefObject<HTMLDivElement | null>;
}) {
  const [zoom, setZoom] = useState(0);
  const [page, setPage] = useState(1);
  // Point at the centre of the view before a zoom, as a fraction of the content
  const anchor = useRef<{ x: number; y: number } | null>(null);
  const scale = ZOOM_STEPS[zoom];

  const changeZoom = (step: number) => {
    const el = scrollerRef.current;
    if (el) {
      anchor.current = {
        x: (el.scrollLeft + el.clientWidth / 2) / el.scrollWidth,
        y: (el.scrollTop + el.clientHeight / 2) / el.scrollHeight,
      };
    }
    setZoom(step);
  };

  // Keep that point centred after the pages resize
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el || !anchor.current) return;
    el.scrollLeft = anchor.current.x * el.scrollWidth - el.clientWidth / 2;
    el.scrollTop = anchor.current.y * el.scrollHeight - el.clientHeight / 2;
    anchor.current = null;
  }, [zoom, scrollerRef]);

  // Current page = the last one whose top is above the middle of the view
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const middle = el.scrollTop + el.clientHeight / 2;
    let current = 1;
    el.querySelectorAll("img").forEach((img, i) => {
      if (img.offsetTop <= middle) current = i + 1;
    });
    setPage(current);
  };

  return (
    <div
      onClick={e => e.stopPropagation()}
      className="relative flex flex-col w-full h-full max-w-5xl bg-card sm:border border-border sm:rounded-xl overflow-hidden shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 px-4 py-3 border-b border-border">
        <div className="flex-1 min-w-0">
          <DialogTitle
            className="font-display text-base sm:text-lg font-semibold text-foreground leading-tight line-clamp-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {doc.title}
          </DialogTitle>
          <p
            className="hidden sm:block font-mono-custom text-xs text-muted-foreground mt-1 truncate"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {doc.meta}
          </p>
        </div>
        <a
          href={doc.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the PDF in a new tab"
          title="Open in a new tab"
          className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors duration-200"
        >
          <ExternalLink size={18} />
        </a>
        <a
          href={doc.href}
          download={downloadName}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-md font-body font-medium text-sm hover:bg-primary/90 transition-colors duration-200"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <ArrowDownToLine size={16} />
          Download
        </a>
        <DialogClose
          aria-label="Close document"
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200"
        >
          <X size={20} />
        </DialogClose>
      </div>

      {/* Pages. Width is a share of the scroller (100cqw), capped on wide screens */}
      <div
        ref={scrollerRef}
        tabIndex={0}
        onScroll={onScroll}
        aria-label={`${doc.title}, ${doc.pages.length} pages`}
        className="@container relative flex-1 overflow-auto bg-secondary dot-grid outline-none"
      >
        <div className="flex flex-col gap-4 w-fit mx-auto px-4 pt-4 sm:pt-6 pb-20">
          {doc.pages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Page ${i + 1} of ${doc.pages.length}`}
              width={1600}
              height={2071}
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
              className="block max-w-none h-auto bg-white rounded-sm shadow-md"
              style={{
                width: `min(${scale} * (100cqw - 2rem), ${scale * PAGE_WIDTH}px)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Zoom and page counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 pl-1 pr-3 py-1 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg">
        <button
          type="button"
          aria-label="Zoom out"
          disabled={zoom === 0}
          onClick={() => changeZoom(zoom - 1)}
          className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors duration-200"
        >
          <ZoomOut size={16} />
        </button>
        <button
          type="button"
          aria-label="Reset zoom"
          onClick={() => changeZoom(0)}
          className="w-11 py-1 rounded-full font-mono-custom text-xs text-foreground hover:bg-secondary tabular-nums transition-colors duration-200"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {Math.round(scale * 100)}%
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          disabled={zoom === ZOOM_STEPS.length - 1}
          onClick={() => changeZoom(zoom + 1)}
          className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors duration-200"
        >
          <ZoomIn size={16} />
        </button>
        <span className="w-px h-4 bg-border mx-1.5" />
        <span
          className="font-mono-custom text-xs text-muted-foreground tabular-nums"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {page} / {doc.pages.length}
        </span>
      </div>
    </div>
  );
}
