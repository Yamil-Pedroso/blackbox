/* eslint-disable no-empty */
import React, { type JSX, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPalette,
  FaFont,
  FaList,
  FaMousePointer,
  FaImage,
  FaProjectDiagram,
  FaCode,
  FaKeyboard,
  FaEye,
  FaTextHeight,
  FaExpand,
  FaHandPointer,
  FaVolumeUp,
  FaAlignLeft,
  FaTimesCircle,
  FaExclamationTriangle,
  FaLowVision,
  FaBookmark,
  FaRegBookmark,
  FaCopy,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaShareAlt,
  FaWheelchair,
  FaSpellCheck,
} from "react-icons/fa";
import {
  MdOutlineTouchApp,
  MdTextFields,
  MdSmartScreen,
  MdHearing,
} from "react-icons/md";
import { GrSpectrum } from "react-icons/gr";

interface Item {
  title: string;
  description: string;
  tip: string;
}

interface TableData {
  title: string;
  icon: JSX.Element;
  do: Item[];
  avoid: Item[];
}

const getIcon = (title: string) => {
  const map: Record<string, JSX.Element> = {
    "Use simple colors": <FaPalette />,
    "Write in plain English": <FaFont />,
    "Use bullet points": <FaList />,
    "Descriptive buttons": <FaMousePointer />,
    "Describe images": <FaImage />,
    "Logical layout": <FaProjectDiagram />,
    "Use semantic HTML": <FaCode />,
    "Keyboard navigation": <FaKeyboard />,
    "Good contrast": <FaEye />,
    "Readable fonts": <FaTextHeight />,
    "Clear buttons": <FaMousePointer />,
    "Large clickable areas": <FaExpand />,
    "Spacing in forms": <MdTextFields />,
    "Keyboard support": <FaKeyboard />,
    "Touch-friendly": <MdOutlineTouchApp />,
    Subtitles: <FaVolumeUp />,
    "Clear text": <FaFont />,
    "Structured layout": <FaProjectDiagram />,
    "Alternative contact": <FaHandPointer />,
    "Use images": <FaImage />,
    "Left aligned text": <FaAlignLeft />,
    "Short sentences": <FaFont />,
    "Adjustable contrast": <FaEye />,
  };
  return map[title] || <FaList />;
};

const getAvoidIcon = (title: string) =>
  title.includes("Avoid") || title.includes("No") ? (
    <FaTimesCircle />
  ) : (
    <FaExclamationTriangle />
  );

// ── Flat list for navigation ───────────────────────────────────────────────
interface FlatItem {
  item: Item;
  variant: "do" | "avoid";
  cardTitle: string;
  id: string;
}

const tables: TableData[] = [
  {
    title: "Autistic Spectrum",
    icon: <GrSpectrum />,
    do: [
      {
        title: "Use simple colors",
        description: "Keep visuals calm and consistent.",
        tip: "Stick to a palette of 2–3 muted tones. Avoid saturated primaries — opt for soft blues, warm grays or pastel greens. Tools like Coolors or Accessible Palette can help you build a calm, cohesive scheme.",
      },
      {
        title: "Write in plain English",
        description: "Avoid complex wording.",
        tip: "Use short sentences with one idea each. Prefer common words — 'use' over 'utilise', 'help' over 'assistance'. Aim for a reading age of 9–11. Hemingway App is great for checking this.",
      },
      {
        title: "Use bullet points",
        description: "Structure content clearly.",
        tip: "Break multi-step processes into numbered lists. Group related info under clear headings. Avoid long paragraphs — if it's more than 3 lines, split it up.",
      },
      {
        title: "Descriptive buttons",
        description: "Make actions obvious.",
        tip: "Replace vague labels like 'Click here' or 'Submit' with action-first labels: 'Download report', 'Save changes', 'Send message'. The button label should describe exactly what happens next.",
      },
    ],
    avoid: [
      {
        title: "Bright contrasting colors",
        description: "Avoid overwhelming visuals.",
        tip: "Hard colour clashes (red on green, yellow on purple) can cause sensory overload. Test your palette in a colour simulator — if it feels intense to you, dial it back further.",
      },
      {
        title: "Figures of speech",
        description: "Avoid ambiguity.",
        tip: "Phrases like 'it's a piece of cake' or 'touch base' are easily misunderstood. Write literally. If you must use an idiom, explain it immediately after in plain terms.",
      },
      {
        title: "Walls of text",
        description: "Hard to process.",
        tip: "Dense blocks of text are cognitively taxing. Break content into sections with white space, use sub-headings every 2–3 paragraphs, and highlight key terms sparingly.",
      },
      {
        title: "Vague buttons",
        description: "Unclear actions.",
        tip: "Buttons that say 'OK' or 'Yes' without context create anxiety. Always pair a button with enough surrounding context — or make the label fully self-explanatory on its own.",
      },
    ],
  },
  {
    title: "Screen Readers",
    icon: <MdSmartScreen />,
    do: [
      {
        title: "Describe images",
        description: "Use alt text properly.",
        tip: "Write alt text that conveys the purpose of the image, not just its appearance. A chart should describe its key insight: 'Bar chart showing sales peaked in Q3 at 42%', not just 'Image of a bar chart'.",
      },
      {
        title: "Logical layout",
        description: "Follow a clear structure.",
        tip: "Screen readers traverse the DOM in order. Make sure your visual order matches your HTML source order. Test by tabbing through the page — the focus flow should feel natural.",
      },
      {
        title: "Use semantic HTML",
        description: "Headings and landmarks.",
        tip: "Use <h1>–<h6> for headings in hierarchy, <nav>, <main>, <footer> for landmarks. Never use a <div> where a <button> or <a> belongs — native elements carry built-in accessibility for free.",
      },
      {
        title: "Keyboard navigation",
        description: "Accessible without mouse.",
        tip: "Every interactive element must be reachable with Tab and operable with Enter or Space. Use :focus-visible CSS to show a clear focus ring. Never remove outline without providing an alternative.",
      },
    ],
    avoid: [
      {
        title: "Media without context",
        description: "Missing descriptions.",
        tip: "Videos need captions and transcripts. Audio needs transcripts. Complex images need a long description — either in surrounding text or via aria-describedby pointing to a hidden element.",
      },
      {
        title: "Scattered layout",
        description: "Confusing navigation.",
        tip: "Skip links ('Skip to main content') help users jump past repeated nav. Ensure landmark regions are used consistently and content changes are announced via ARIA live regions.",
      },
      {
        title: "Style-only structure",
        description: "No semantic meaning.",
        tip: "Bold text that visually looks like a heading is invisible to a screen reader unless it uses a heading tag. The HTML must reflect the document hierarchy — don't rely on CSS alone.",
      },
      {
        title: "Mouse-only actions",
        description: "Not accessible.",
        tip: "Hover-only tooltips, drag-and-drop without keyboard alternatives, and click handlers on non-focusable elements all block screen reader users. Every mouse interaction needs a keyboard equivalent.",
      },
    ],
  },
  {
    title: "Low Vision",
    icon: <FaLowVision />,
    do: [
      {
        title: "Good contrast",
        description: "Readable text.",
        tip: "WCAG AA requires a 4.5:1 contrast ratio for normal text, 3:1 for large text. Use the WebAIM Contrast Checker — and don't rely on colour alone to convey meaning.",
      },
      {
        title: "Readable fonts",
        description: "Clear typography.",
        tip: "Use a minimum body size of 16px. Avoid decorative or condensed typefaces for body copy. Line height of 1.5–1.6 and generous letter-spacing improve readability significantly.",
      },
      {
        title: "Clear buttons",
        description: "Easy to identify.",
        tip: "Buttons should have a visible border or strong background so they're distinguishable from plain text. Include an underline or icon for links, and a border or fill for buttons.",
      },
      {
        title: "Logical layout",
        description: "Predictable flow.",
        tip: "Consistent placement of navigation, search and key actions reduces cognitive load. Users who zoom up to 400% will lose spatial context — predictable layout helps them stay oriented.",
      },
    ],
    avoid: [
      {
        title: "Low contrast",
        description: "Hard to read.",
        tip: "Light gray on white, yellow on white, or text over busy background images are common fails. Check every text/background combination — including placeholder text and disabled states.",
      },
      {
        title: "Tiny fonts",
        description: "Poor readability.",
        tip: "Avoid font sizes below 14px for any content. Ensure your layout doesn't break when users increase text size to 200% in browser settings — test this with Ctrl/Cmd + zoom.",
      },
      {
        title: "Hidden actions",
        description: "Hard to find.",
        tip: "Hover-revealed actions are invisible to users who zoom or use keyboard. Keep primary actions always visible. Use a clearly labelled 'More options' menu rather than hover states.",
      },
      {
        title: "Scattered content",
        description: "Disorganized UI.",
        tip: "Random placement of elements forces constant scanning. Group related content visually and spatially. Use consistent vertical rhythm and alignment grids.",
      },
    ],
  },
  {
    title: "Motor Disabilities",
    icon: <FaWheelchair />,
    do: [
      {
        title: "Large clickable areas",
        description: "Easy interaction.",
        tip: "WCAG 2.5.5 recommends a minimum target size of 44×44px. Extend the clickable area beyond the visual element using padding — a small icon with generous padding is far easier to hit.",
      },
      {
        title: "Spacing in forms",
        description: "Avoid misclicks.",
        tip: "Space form elements at least 8px apart. Avoid placing destructive actions (Delete, Cancel) next to primary actions — separate them with distance or a confirmation step.",
      },
      {
        title: "Keyboard support",
        description: "Accessible navigation.",
        tip: "Full keyboard operability is essential for users who can't use a mouse. This includes custom dropdowns, date pickers, modals and carousels. Test every component by unplugging your mouse.",
      },
      {
        title: "Touch-friendly",
        description: "Mobile usability.",
        tip: "On touch screens, 48×48px is the recommended minimum touch target. Avoid swipe-only gestures — always provide a button alternative. Increase tap target padding on mobile breakpoints.",
      },
    ],
    avoid: [
      {
        title: "Precision required",
        description: "Hard interactions.",
        tip: "Tiny close buttons, draggable sliders with no text input alternative, and hover menus that dismiss instantly all demand precision that many users don't have. Opt for large, forgiving controls.",
      },
      {
        title: "Crowded UI",
        description: "Too many elements.",
        tip: "Dense UIs increase the chance of misclicks. Use progressive disclosure — show only what's needed, with clear paths to more options. White space is not wasted space.",
      },
      {
        title: "Complex gestures",
        description: "Difficult to use.",
        tip: "WCAG 2.5.1 requires all multi-point or path-based gestures to have a single-pointer alternative. Multi-finger gestures or path-based gestures exclude many users.",
      },
      {
        title: "Timeouts",
        description: "User frustration.",
        tip: "Session timeouts that can't be extended are a WCAG failure (2.2.1). Always warn users before a timeout, and give them at least 20 seconds to extend it. Autosave forms wherever possible.",
      },
    ],
  },
  {
    title: "Hearing",
    icon: <MdHearing />,
    do: [
      {
        title: "Subtitles",
        description: "Provide captions.",
        tip: "Closed captions should include speaker identification, sound effects and music cues — not just speech. Auto-generated captions are a starting point only; always review and correct them.",
      },
      {
        title: "Clear text",
        description: "Support understanding.",
        tip: "For users who use sign language as their first language, written text may be a second language. Keep sentences short and structure clear. Consider supplementing with a BSL/ASL video.",
      },
      {
        title: "Structured layout",
        description: "Easy navigation.",
        tip: "Deaf users rely heavily on visual hierarchy and scanning. Use clear headings, bold key points and visual separators to make content skimmable without relying on audio cues.",
      },
      {
        title: "Alternative contact",
        description: "Multiple options.",
        tip: "Don't make phone calls the only support option. Offer email, live chat or a contact form. If you use a chat widget, ensure it has text-based options and doesn't require phone verification.",
      },
    ],
    avoid: [
      {
        title: "Audio-only",
        description: "No alternatives.",
        tip: "Any audio-only content must have a text transcript. Notification sounds need a visual equivalent — a banner, badge count or colour change.",
      },
      {
        title: "No transcripts",
        description: "Missing content.",
        tip: "Transcripts benefit not just deaf users but also people in noisy environments and non-native speakers. Publish transcripts as accessible HTML, not just as a PDF.",
      },
      {
        title: "Complex navigation",
        description: "Hard to follow.",
        tip: "Features that assume users can hear prompts need redesigning with visual-first alternatives. Audio-guided tours or IVR flows translated directly to UI are common offenders.",
      },
      {
        title: "Single contact method",
        description: "Limited access.",
        tip: "A phone-only helpline excludes deaf users completely. Offering only one channel is also a legal risk in many jurisdictions. Aim for at least three contact options across different modalities.",
      },
    ],
  },
  {
    title: "Dyslexia",
    icon: <FaSpellCheck />,
    do: [
      {
        title: "Use images",
        description: "Support understanding.",
        tip: "Pair text instructions with diagrams, icons or illustrations. Visual anchors help dyslexic readers map meaning to content faster. Use consistent, purposeful visuals that directly relate to the text.",
      },
      {
        title: "Left aligned text",
        description: "Better readability.",
        tip: "Justified text creates uneven spacing between words ('rivers of white') that disrupts reading flow. Always left-align body copy. Centre alignment is fine for short headings only.",
      },
      {
        title: "Short sentences",
        description: "Clear content.",
        tip: "Aim for sentences under 20 words. Use the active voice — 'Click Save to continue' is clearer than 'The data will be saved when the Save button is clicked'.",
      },
      {
        title: "Adjustable contrast",
        description: "User control.",
        tip: "Some dyslexic users find pure black text on white too harsh. Let users choose a softer background (cream, light yellow). CSS custom properties make this easy to implement with a theme toggle.",
      },
    ],
    avoid: [
      {
        title: "Heavy text blocks",
        description: "Hard to read.",
        tip: "Long unbroken paragraphs are exhausting. Break content into chunks of 2–3 sentences. Use pull quotes, callout boxes or expandable sections to manage content density.",
      },
      {
        title: "Underlined text",
        description: "Confusing.",
        tip: "Underlines are strongly associated with links. Using them for emphasis confuses dyslexic readers into thinking the text is interactive. Use bold or italics for emphasis instead — sparingly.",
      },
      {
        title: "Dense paragraphs",
        description: "Overwhelming.",
        tip: "More than 5–6 lines of continuous text is hard to track. Increase line height to at least 1.5, add extra paragraph spacing, and aim for 60–70 characters per line.",
      },
      {
        title: "Too much info",
        description: "Cognitive overload.",
        tip: "Progressive disclosure is your friend — show the most important information first, with clear expandable sections for detail. Guide users through decisions one step at a time.",
      },
    ],
  },
];

// Build flat list after tables is defined
const flatItems: FlatItem[] = tables.flatMap((table, ci) => [
  ...table.do.map((item, i) => ({
    item,
    variant: "do" as const,
    cardTitle: table.title,
    id: `card-${ci}-do-${i}`,
  })),
  ...table.avoid.map((item, i) => ({
    item,
    variant: "avoid" as const,
    cardTitle: table.title,
    id: `card-${ci}-avoid-${i}`,
  })),
]);

// ── Bookmarks ──────────────────────────────────────────────────────────────
const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => {
    try {
      return new Set(
        JSON.parse(localStorage.getItem("a11y-bookmarks") || "[]"),
      );
    } catch {
      return new Set();
    }
  });
  const toggle = (id: string) =>
    setBookmarks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      try {
        localStorage.setItem("a11y-bookmarks", JSON.stringify([...next]));
      } catch {}
      return next;
    });
  return { bookmarks, toggle };
};

// ── Icon wrappers ──────────────────────────────────────────────────────────
const DoIconWrapper: React.FC<{
  children: React.ReactNode;
  hovered: boolean;
}> = ({ children, hovered }) => (
  <motion.div
    animate={
      hovered
        ? { scale: 1.55, rotate: [0, -18, 18, -10, 10, 0] }
        : { scale: 1, rotate: 0 }
    }
    transition={{ duration: 0.45, ease: "easeInOut" }}
    className="mt-0.5 shrink-0 text-xl"
    style={{ color: hovered ? "#16a34a" : "#4ade80" }}
  >
    {children}
  </motion.div>
);

const AvoidIconWrapper: React.FC<{
  children: React.ReactNode;
  hovered: boolean;
}> = ({ children, hovered }) => (
  <motion.div
    animate={
      hovered
        ? { scale: 1.55, rotate: [0, 22, -22, 14, -14, 0] }
        : { scale: 1, rotate: 0 }
    }
    transition={{ duration: 0.45, ease: "easeInOut" }}
    className="mt-0.5 shrink-0 text-xl"
    style={{ color: hovered ? "#dc2626" : "#f87171" }}
  >
    {children}
  </motion.div>
);

// ── TipPanel ───────────────────────────────────────────────────────────────
const TipPanel: React.FC<{
  item: Item;
  variant: "do" | "avoid";
  activeId: string;
  onClose: () => void;
  onNavigate: (id: string) => void;
  bookmarks: Set<string>;
  onBookmark: (id: string) => void;
}> = ({
  item,
  variant,
  activeId,
  onClose,
  onNavigate,
  bookmarks,
  onBookmark,
}) => {
  const isGreen = variant === "do";
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const isBookmarked = bookmarks.has(activeId);

  const flatIdx = flatItems.findIndex((f) => f.id === activeId);
  const hasPrev = flatIdx > 0;
  const hasNext = flatIdx < flatItems.length - 1;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${item.title}\n\n${item.tip}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleShare = async () => {
    const text = `${item.title}\n\n${item.tip}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, text });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: -20 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="
        absolute z-30 rounded-2xl shadow-2xl border overflow-hidden
        w-[calc(100vw-2rem)] max-w-[20rem]
        top-10 right-0
        sm:top-12 sm:right-3 sm:w-72
        md:w-80
        p-4
        px-2
      "
      style={{
        backgroundColor: isGreen ? "#0c0e0d" : "#100d0d",
        borderColor: isGreen ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-start justify-between gap-2 px-4 pt-3 pb-2"
        style={{
          borderBottom: `1px solid ${isGreen ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
        }}
      >
        <div className="min-w-0">
          <p
            className="text-md font-semibold"
            style={{ color: isGreen ? "#4ade80" : "#f87171" }}
          >
            {isGreen ? "✔ How to apply" : "✖ Why to avoid"}
          </p>
          <p className="text-md font-semibold text-white mt-0.5 leading-snug">
            {item.title}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-neutral-500 hover:text-white transition-colors mt-0.5 shrink-0 text-base leading-none"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        <p className="text-md leading-relaxed text-neutral-300">{item.tip}</p>
      </div>

      {/* Footer actions */}
      <div
        className="flex items-center justify-between px-3 pb-3 pt-2 gap-1"
        style={{
          borderTop: `1px solid ${isGreen ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)"}`,
        }}
      >
        {/* Left: Copy + Share + Bookmark */}
        <div className="flex items-center gap-1">
          {/* Copy */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            title="Copy tip"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{
              backgroundColor: copied
                ? isGreen
                  ? "rgba(34,197,94,0.2)"
                  : "rgba(239,68,68,0.2)"
                : "rgba(255,255,255,0.06)",
              color: copied ? (isGreen ? "#4ade80" : "#f87171") : "#a3a3a3",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <FaCheck className="text-xs" />
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <FaCopy className="text-xs" />
                </motion.span>
              )}
            </AnimatePresence>
            <span>{copied ? "Copied!" : "Copy"}</span>
          </motion.button>

          {/* Share */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            title="Share tip"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{
              backgroundColor: shared
                ? "rgba(255,255,255,0.1)"
                : "rgba(255,255,255,0.06)",
              color: shared ? "#e5e5e5" : "#a3a3a3",
            }}
          >
            <FaShareAlt className="text-xs" />
            <span>{shared ? "Copied!" : "Share"}</span>
          </motion.button>

          {/* Bookmark */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => onBookmark(activeId)}
            title={isBookmarked ? "Remove bookmark" : "Bookmark"}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
            style={{
              backgroundColor: isBookmarked
                ? isGreen
                  ? "rgba(34,197,94,0.2)"
                  : "rgba(239,68,68,0.2)"
                : "rgba(255,255,255,0.06)",
              color: isBookmarked
                ? isGreen
                  ? "#4ade80"
                  : "#f87171"
                : "#a3a3a3",
            }}
          >
            <motion.div
              animate={{ scale: isBookmarked ? [1, 1.4, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {isBookmarked ? (
                <FaBookmark className="text-xs" />
              ) : (
                <FaRegBookmark className="text-xs" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Right: Navigate ← → */}
        <div className="flex items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => hasPrev && onNavigate(flatItems[flatIdx - 1].id)}
            disabled={!hasPrev}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-xs transition-colors disabled:opacity-25"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              color: "#a3a3a3",
            }}
          >
            <FaChevronLeft />
          </motion.button>
          <span className="text-neutral-600 text-xs tabular-nums w-10 text-center">
            {flatIdx + 1} / {flatItems.length}
          </span>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => hasNext && onNavigate(flatItems[flatIdx + 1].id)}
            disabled={!hasNext}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-xs transition-colors disabled:opacity-25"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              color: "#a3a3a3",
            }}
          >
            <FaChevronRight />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const DoItem: React.FC<{
  item: Item;
  index: number;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  cardId: string;
  bookmarks: Set<string>;
}> = ({ item, index, activeId, setActiveId, cardId, bookmarks }) => {
  const id = `${cardId}-do-${index}`;
  const isActive = activeId === id;
  const isBookmarked = bookmarks.has(id);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => setActiveId(isActive ? null : id)}
      className="flex items-center justify-between gap-3 rounded-xl px-2 py-1.5 cursor-pointer"
      style={{
        backgroundColor: isActive
          ? "rgba(34,197,94,0.12)"
          : hovered
            ? "rgba(34,197,94,0.07)"
            : "transparent",
        transition: "background-color 0.2s ease",
      }}
    >
      <div className="flex items-start gap-1.5 min-w-0">
        {isBookmarked && (
          <FaBookmark className="text-green-400 text-xs mt-1 shrink-0" />
        )}
        <div>
          <motion.p
            className="font-medium text-md"
            animate={{ x: hovered || isActive ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.title}
          </motion.p>
          <motion.p
            className="text-xs text-neutral-500"
            animate={{ opacity: hovered || isActive ? 1 : 0.55 }}
            transition={{ duration: 0.2 }}
          >
            {item.description}
          </motion.p>
        </div>
      </div>
      <DoIconWrapper hovered={hovered || isActive}>
        {getIcon(item.title)}
      </DoIconWrapper>
    </motion.li>
  );
};

const AvoidItem: React.FC<{
  item: Item;
  index: number;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  cardId: string;
  bookmarks: Set<string>;
}> = ({ item, index, activeId, setActiveId, cardId, bookmarks }) => {
  const id = `${cardId}-avoid-${index}`;
  const isActive = activeId === id;
  const isBookmarked = bookmarks.has(id);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => setActiveId(isActive ? null : id)}
      className="flex items-center justify-between gap-3 rounded-xl px-2 py-1.5 cursor-pointer"
      style={{
        backgroundColor: isActive
          ? "rgba(239,68,68,0.12)"
          : hovered
            ? "rgba(239,68,68,0.07)"
            : "transparent",
        transition: "background-color 0.2s ease",
      }}
    >
      <div className="flex items-start gap-1.5 min-w-0">
        {isBookmarked && (
          <FaBookmark className="text-red-400 text-xs mt-1 shrink-0" />
        )}
        <div>
          <motion.p
            className="font-medium text-md"
            animate={{ x: hovered || isActive ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.title}
          </motion.p>
          <motion.p
            className="text-xs text-neutral-500"
            animate={{ opacity: hovered || isActive ? 1 : 0.55 }}
            transition={{ duration: 0.2 }}
          >
            {item.description}
          </motion.p>
        </div>
      </div>
      <AvoidIconWrapper hovered={hovered || isActive}>
        {getAvoidIcon(item.title)}
      </AvoidIconWrapper>
    </motion.li>
  );
};

// ── Card ───────────────────────────────────────────────────────────────────
const DoAvoidCard: React.FC<{
  data: TableData;
  cardIndex: number;
  globalActiveId: string | null;
  setGlobalActiveId: (id: string | null) => void;
  bookmarks: Set<string>;
  onBookmark: (id: string) => void;
}> = ({
  data,
  cardIndex,
  globalActiveId,
  setGlobalActiveId,
  bookmarks,
  onBookmark,
}) => {
  const [cardHovered, setCardHovered] = useState(false);
  const cardId = `card-${cardIndex}`;
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardActive = globalActiveId?.startsWith(cardId) ?? false;

  // Resolve active item for this card
  const activeEntry = (() => {
    if (!globalActiveId || !isCardActive) return null;
    const doIdx = data.do.findIndex(
      (_, i) => `${cardId}-do-${i}` === globalActiveId,
    );
    if (doIdx !== -1) return { item: data.do[doIdx], variant: "do" as const };
    const avoidIdx = data.avoid.findIndex(
      (_, i) => `${cardId}-avoid-${i}` === globalActiveId,
    );
    if (avoidIdx !== -1)
      return { item: data.avoid[avoidIdx], variant: "avoid" as const };
    return null;
  })();

  useEffect(() => {
    if (!isCardActive) return;
    const handler = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setGlobalActiveId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isCardActive, setGlobalActiveId]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: cardIndex * 0.07, duration: 0.38, ease: "easeOut" }}
      onHoverStart={() => setCardHovered(true)}
      onHoverEnd={() => setCardHovered(false)}
      className="relative border border-neutral-600 dark:border-neutral-800 bg-secondary-bg dark:bg-neutral-900 rounded-2xl overflow-visible"
      style={{
        boxShadow: cardHovered
          ? "0 10px 36px rgba(0,0,0,0.2)"
          : "0 1px 4px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Floating tip panel — shown on this card, but navigates globally */}
      <AnimatePresence>
        {activeEntry && globalActiveId && (
          <TipPanel
            key={globalActiveId}
            item={activeEntry.item}
            variant={activeEntry.variant}
            activeId={globalActiveId}
            onClose={() => setGlobalActiveId(null)}
            onNavigate={setGlobalActiveId}
            bookmarks={bookmarks}
            onBookmark={onBookmark}
          />
        )}
      </AnimatePresence>

      <div className="px-5 py-4 border-b border-neutral-600 dark:border-neutral-800 flex items-center justify-between gap-2 rounded-t-2xl overflow-hidden">
        <div className="flex items-center gap-3 min-w-0">
          <motion.span
            animate={{
              scale: cardHovered ? 1.4 : 1,
              backgroundColor: cardHovered ? "#a3a3a3" : "#525252",
            }}
            transition={{ duration: 0.25 }}
            className="inline-block w-2 h-2 rounded-full"
          />
          <motion.span
            className="font-semibold text-xl"
            animate={{ x: cardHovered ? 2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {data.title}
          </motion.span>
        </div>
        <motion.span
          className="text-neutral-400 text-base"
          animate={{ scale: cardHovered ? 1.5 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {data.icon}
        </motion.span>
      </div>

      <div className="grid grid-cols-2">
        <div className="p-4 border-r border-neutral-600 dark:border-neutral-800">
          <motion.div
            className="text-green-600 font-semibold mb-3 text-sm"
            animate={{ scale: cardHovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            ✔ Do
          </motion.div>
          <ul className="space-y-1">
            {data.do.map((item, index) => (
              <DoItem
                key={index}
                item={item}
                index={index}
                activeId={globalActiveId}
                setActiveId={setGlobalActiveId}
                cardId={cardId}
                bookmarks={bookmarks}
              />
            ))}
          </ul>
        </div>
        <div className="p-4">
          <motion.div
            className="text-red-600 font-semibold mb-3 text-sm"
            animate={{ scale: cardHovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            ✖ Avoid
          </motion.div>
          <ul className="space-y-1">
            {data.avoid.map((item, index) => (
              <AvoidItem
                key={index}
                item={item}
                index={index}
                activeId={globalActiveId}
                setActiveId={setGlobalActiveId}
                cardId={cardId}
                bookmarks={bookmarks}
              />
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const AccessibilityTables = () => {
  const [globalActiveId, setGlobalActiveId] = useState<string | null>(null);
  const { bookmarks, toggle: toggleBookmark } = useBookmarks();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-secondary-bg h-screen"
      >
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-secondary-bg dark:bg-neutral-900"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-col gap-1">
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-3xl md:text-4xl font-medium tracking-tight mt-1"
                >
                  <span className="relative inline-block">
                    Accessibility (WCAG)
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        delay: 0.35,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 origin-left"
                    />
                  </span>
                  <span className="text-neutral-400 font-normal"> Guide</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs text-neutral-400"
                >
                  Click any item for usage tips
                  {bookmarks.size > 0 && (
                    <span className="ml-2 text-green-500">
                      · {bookmarks.size} bookmarked
                    </span>
                  )}
                </motion.p>
              </div>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
              {tables.map((table, index) => (
                <DoAvoidCard
                  key={index}
                  data={table}
                  cardIndex={index}
                  globalActiveId={globalActiveId}
                  setGlobalActiveId={setGlobalActiveId}
                  bookmarks={bookmarks}
                  onBookmark={toggleBookmark}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AccessibilityTables;
