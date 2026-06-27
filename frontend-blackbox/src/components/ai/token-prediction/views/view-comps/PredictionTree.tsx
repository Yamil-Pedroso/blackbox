import { useMemo, useRef, useState } from "react";
import type {
  PredictionTreeNode,
  PredictionTreeResponse,
} from "../../../../../types/ai/tokenPrediction.types";

interface PredictionTreeProps {
  tree: PredictionTreeResponse;
}

interface Point {
  x: number;
  y: number;
}

interface DragState {
  pointerX: number;
  pointerY: number;
  offsetX: number;
  offsetY: number;
}

const STEP_WIDTH = 190;
const CHOSEN_Y = 160;
const ALTERNATIVE_Y = [52, 270, 370];

function nodePosition(node: PredictionTreeNode): Point {
  if (node.kind === "prompt") {
    return { x: 90, y: CHOSEN_Y };
  }

  return {
    x: 90 + node.step * STEP_WIDTH,
    y:
      node.kind === "chosen"
        ? CHOSEN_Y
        : (ALTERNATIVE_Y[Math.max(0, node.rank - 1)] ?? 370),
  };
}

function shortLabel(value: string): string {
  const visible = value.replace(/\s/g, "·");
  return visible.length > 15 ? `${visible.slice(0, 14)}…` : visible;
}

export function PredictionTree({ tree }: PredictionTreeProps) {
  const [scale, setScale] = useState(0.85);
  const [offset, setOffset] = useState({ x: 20, y: 35 });
  const [selectedNode, setSelectedNode] = useState<PredictionTreeNode | null>(
    tree.nodes[0] ?? null,
  );
  const dragRef = useRef<DragState | null>(null);
  const positions = useMemo(
    () => new Map(tree.nodes.map((node) => [node.id, nodePosition(node)])),
    [tree.nodes],
  );
  const graphWidth =
    Math.max(...tree.nodes.map((node) => node.step), 1) * STEP_WIDTH + 260;

  function zoom(delta: number) {
    setScale((current) => Math.min(1.6, Math.max(0.35, current + delta)));
  }

  function handlePointerDown(event: React.PointerEvent<SVGSVGElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
  }

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const drag = dragRef.current;
    if (!drag) return;

    setOffset({
      x: drag.offsetX + event.clientX - drag.pointerX,
      y: drag.offsetY + event.clientY - drag.pointerY,
    });
  }

  function stopDragging() {
    dragRef.current = null;
  }

  function resetView() {
    setScale(0.85);
    setOffset({ x: 20, y: 35 });
  }

  return (
    <section className="min-w-0 overflow-hidden border border-neutral-800 bg-main-bg text-primary">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 px-4 py-3">
        <div>
          <p className="font-ibm-plex-mono text-xs uppercase text-green">
            Interactive probability graph
          </p>
          <p className="mt-1 text-sm text-secondary">
            Drag to pan. Select a node to inspect it.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => zoom(-0.15)}
            aria-label="Zoom out"
            title="Zoom out"
            className="flex size-9 items-center justify-center border border-neutral-800 bg-secondary-bg text-lg font-semibold hover:border-green/50"
          >
            −
          </button>
          <span className="w-14 text-center font-ibm-plex-mono text-xs text-secondary">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => zoom(0.15)}
            aria-label="Zoom in"
            title="Zoom in"
            className="flex size-9 items-center justify-center border border-neutral-800 bg-secondary-bg text-lg font-semibold hover:border-green/50"
          >
            +
          </button>
          <button
            type="button"
            onClick={resetView}
            className="min-h-9 border border-neutral-800 bg-secondary-bg px-3 font-ibm-plex-mono text-xs font-semibold hover:border-green/50"
          >
            Reset view
          </button>
        </div>
      </div>

      <div className="relative h-[480px] overflow-hidden">
        <svg
          className="size-full cursor-grab touch-none active:cursor-grabbing"
          viewBox="0 0 1200 480"
          role="img"
          aria-label="Interactive next-token prediction tree"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
        >
          <defs>
            <pattern
              id="prediction-grid"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 28 0 L 0 0 0 28"
                fill="none"
                stroke="#2b2f35"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="1200" height="480" fill="url(#prediction-grid)" />
          <g transform={`translate(${offset.x} ${offset.y}) scale(${scale})`}>
            <rect
              x="-30"
              y="-25"
              width={graphWidth}
              height="440"
              fill="transparent"
            />
            {tree.edges.map((edge) => {
              const source = positions.get(edge.source);
              const target = positions.get(edge.target);
              if (!source || !target) return null;

              const midpoint = (source.x + target.x) / 2;
              return (
                <path
                  key={edge.id}
                  d={`M ${source.x + 58} ${source.y} C ${midpoint} ${source.y}, ${midpoint} ${target.y}, ${target.x - 58} ${target.y}`}
                  fill="none"
                  stroke={edge.isChosen ? "#00ff88" : "#5f6875"}
                  strokeWidth={edge.isChosen ? 4 : 1.5}
                  strokeOpacity={edge.isChosen ? 0.9 : 0.55}
                />
              );
            })}

            {tree.nodes.map((node) => {
              const point = positions.get(node.id);
              if (!point) return null;
              const isSelected = selectedNode?.id === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${point.x} ${point.y})`}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => setSelectedNode(node)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedNode(node);
                    }
                  }}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                >
                  <rect
                    x="-58"
                    y="-28"
                    width="116"
                    height="56"
                    rx="8"
                    fill={node.kind === "prompt" ? "#121915" : "#050505"}
                    stroke={isSelected ? "#00ff88" : node.isChosen ? "#00ff88" : "#5f6875"}
                    strokeWidth={isSelected ? 3 : node.isChosen ? 2.5 : 1.5}
                  />
                  <text
                    x="0"
                    y="-3"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="700"
                  >
                    {node.kind === "prompt" ? "PROMPT" : shortLabel(node.label)}
                  </text>
                  <text
                    x="0"
                    y="15"
                    textAnchor="middle"
                    fill={node.isChosen ? "#00ff88" : "#b8b8b8"}
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {(node.probability * 100).toFixed(2)}%
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {selectedNode && (
          <div className="absolute bottom-3 left-3 max-w-72 border border-neutral-800 bg-secondary-bg/95 p-3 shadow-xl">
            <p className="font-ibm-plex-mono text-[10px] uppercase text-secondary">
              {selectedNode.kind} · step {selectedNode.step}
            </p>
            <p className="mt-1 break-words font-ibm-plex-mono text-sm font-semibold">
              {selectedNode.label}
            </p>
            <p className="mt-2 text-xs text-secondary">
              Probability{" "}
              <strong className="text-primary">
                {(selectedNode.probability * 100).toFixed(4)}%
              </strong>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
