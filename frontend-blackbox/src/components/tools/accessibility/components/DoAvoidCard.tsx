import React, { type JSX, useState } from "react";
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
} from "react-icons/fa";
import { MdOutlineTouchApp, MdTextFields } from "react-icons/md";

interface Item {
  title: string;
  description: string;
}

interface TableData {
  title: string;
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

const getAvoidIcon = (title: string) => {
  return title.includes("Avoid") || title.includes("No") ? (
    <FaTimesCircle />
  ) : (
    <FaExclamationTriangle />
  );
};

const tables: TableData[] = [
  {
    title: "Autistic Spectrum",
    do: [
      {
        title: "Use simple colors",
        description: "Keep visuals calm and consistent.",
      },
      {
        title: "Write in plain English",
        description: "Avoid complex wording.",
      },
      { title: "Use bullet points", description: "Structure content clearly." },
      { title: "Descriptive buttons", description: "Make actions obvious." },
    ],
    avoid: [
      {
        title: "Bright contrasting colors",
        description: "Avoid overwhelming visuals.",
      },
      { title: "Figures of speech", description: "Avoid ambiguity." },
      { title: "Walls of text", description: "Hard to process." },
      { title: "Vague buttons", description: "Unclear actions." },
    ],
  },
  {
    title: "Screen Readers",
    do: [
      { title: "Describe images", description: "Use alt text properly." },
      { title: "Logical layout", description: "Follow a clear structure." },
      { title: "Use semantic HTML", description: "Headings and landmarks." },
      {
        title: "Keyboard navigation",
        description: "Accessible without mouse.",
      },
    ],
    avoid: [
      { title: "Media without context", description: "Missing descriptions." },
      { title: "Scattered layout", description: "Confusing navigation." },
      { title: "Style-only structure", description: "No semantic meaning." },
      { title: "Mouse-only actions", description: "Not accessible." },
    ],
  },
  {
    title: "Low Vision",
    do: [
      { title: "Good contrast", description: "Readable text." },
      { title: "Readable fonts", description: "Clear typography." },
      { title: "Clear buttons", description: "Easy to identify." },
      { title: "Logical layout", description: "Predictable flow." },
    ],
    avoid: [
      { title: "Low contrast", description: "Hard to read." },
      { title: "Tiny fonts", description: "Poor readability." },
      { title: "Hidden actions", description: "Hard to find." },
      { title: "Scattered content", description: "Disorganized UI." },
    ],
  },
  {
    title: "Motor Disabilities",
    do: [
      { title: "Large clickable areas", description: "Easy interaction." },
      { title: "Spacing in forms", description: "Avoid misclicks." },
      { title: "Keyboard support", description: "Accessible navigation." },
      { title: "Touch-friendly", description: "Mobile usability." },
    ],
    avoid: [
      { title: "Precision required", description: "Hard interactions." },
      { title: "Crowded UI", description: "Too many elements." },
      { title: "Complex gestures", description: "Difficult to use." },
      { title: "Timeouts", description: "User frustration." },
    ],
  },
  {
    title: "Hearing",
    do: [
      { title: "Subtitles", description: "Provide captions." },
      { title: "Clear text", description: "Support understanding." },
      { title: "Structured layout", description: "Easy navigation." },
      { title: "Alternative contact", description: "Multiple options." },
    ],
    avoid: [
      { title: "Audio-only", description: "No alternatives." },
      { title: "No transcripts", description: "Missing content." },
      { title: "Complex navigation", description: "Hard to follow." },
      { title: "Single contact method", description: "Limited access." },
    ],
  },
  {
    title: "Dyslexia",
    do: [
      { title: "Use images", description: "Support understanding." },
      { title: "Left aligned text", description: "Better readability." },
      { title: "Short sentences", description: "Clear content." },
      { title: "Adjustable contrast", description: "User control." },
    ],
    avoid: [
      { title: "Heavy text blocks", description: "Hard to read." },
      { title: "Underlined text", description: "Confusing." },
      { title: "Dense paragraphs", description: "Overwhelming." },
      { title: "Too much info", description: "Cognitive overload." },
    ],
  },
];

// Animated DO icon
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

// Animated AVOID icon
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

const DoItem: React.FC<{ item: Item; index: number }> = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex justify-between gap-3 rounded-xl px-2 py-1.5 cursor-default"
      style={{
        backgroundColor: hovered ? "rgba(34,197,94,0.09)" : "transparent",
        transition: "background-color 0.2s ease",
      }}
    >
      <div>
        <motion.p
          className="font-medium text-sm"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {item.title}
        </motion.p>
        <motion.p
          className="text-xs text-neutral-500"
          animate={{ opacity: hovered ? 1 : 0.55 }}
          transition={{ duration: 0.2 }}
        >
          {item.description}
        </motion.p>
      </div>
      <DoIconWrapper hovered={hovered}>{getIcon(item.title)}</DoIconWrapper>
    </motion.li>
  );
};

const AvoidItem: React.FC<{ item: Item; index: number }> = ({
  item,
  index,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex justify-between gap-3 rounded-xl px-2 py-1.5 cursor-default"
      style={{
        backgroundColor: hovered ? "rgba(239,68,68,0.09)" : "transparent",
        transition: "background-color 0.2s ease",
      }}
    >
      <div>
        <motion.p
          className="font-medium text-sm"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {item.title}
        </motion.p>
        <motion.p
          className="text-xs text-neutral-500"
          animate={{ opacity: hovered ? 1 : 0.55 }}
          transition={{ duration: 0.2 }}
        >
          {item.description}
        </motion.p>
      </div>
      <AvoidIconWrapper hovered={hovered}>
        {getAvoidIcon(item.title)}
      </AvoidIconWrapper>
    </motion.li>
  );
};

const DoAvoidCard: React.FC<{ data: TableData; cardIndex: number }> = ({
  data,
  cardIndex,
}) => {
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: cardIndex * 0.07, duration: 0.38, ease: "easeOut" }}
      onHoverStart={() => setCardHovered(true)}
      onHoverEnd={() => setCardHovered(false)}
      className="border border-neutral-600 dark:border-neutral-800 bg-secondary-bg dark:bg-neutral-900 rounded-2xl overflow-hidden"
      style={{
        boxShadow: cardHovered
          ? "0 10px 36px rgba(0,0,0,0.2)"
          : "0 1px 4px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div className="px-5 py-4 border-b border-neutral-600 dark:border-neutral-800 flex items-center gap-2">
        <motion.span
          animate={{
            scale: cardHovered ? 1.4 : 1,
            backgroundColor: cardHovered ? "#a3a3a3" : "#525252",
          }}
          transition={{ duration: 0.25 }}
          className="inline-block w-2 h-2 rounded-full"
        />
        <motion.span
          className="font-semibold text-lg"
          animate={{ x: cardHovered ? 2 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {data.title}
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
              <DoItem key={index} item={item} index={index} />
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
              <AvoidItem key={index} item={item} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const AccessibilityTables: React.FC<{
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto"
        >
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full min-h-screen bg-secondary-bg dark:bg-neutral-900 shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold"
                >
                  Accessibility Do / Avoid
                </motion.h1>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#404040" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="text-sm px-4 py-2 bg-neutral-900 text-white rounded-2xl cursor-pointer"
                >
                  Close
                </motion.button>
              </div>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                {tables.map((table, index) => (
                  <DoAvoidCard key={index} data={table} cardIndex={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccessibilityTables;
