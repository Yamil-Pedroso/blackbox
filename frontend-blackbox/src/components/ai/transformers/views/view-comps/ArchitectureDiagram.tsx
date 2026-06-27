const blockClass =
  "border border-neutral-800 bg-main-bg px-4 py-3 text-center font-ibm-plex-mono text-xs text-secondary";

const ArchitectureDiagram = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="border border-neutral-800 bg-secondary-bg p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-primary text-xl">Encoder stack</h3>
          <span className="border border-green/30 px-2 py-1 font-ibm-plex-mono text-[11px] text-green">
            understands input
          </span>
        </div>
        <div className="space-y-3">
          <div className={blockClass}>Input embeddings + position</div>
          <div className={blockClass}>Multi-head self-attention</div>
          <div className={blockClass}>Add & Norm</div>
          <div className={blockClass}>Feed forward network</div>
          <div className={blockClass}>Add & Norm</div>
        </div>
      </div>

      <div className="border border-neutral-800 bg-secondary-bg p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-primary text-xl">Decoder stack</h3>
          <span className="border border-blue-500/30 px-2 py-1 font-ibm-plex-mono text-[11px] text-blue-400">
            generates tokens
          </span>
        </div>
        <div className="space-y-3">
          <div className={blockClass}>Shifted output embeddings</div>
          <div className={blockClass}>Masked self-attention</div>
          <div className={blockClass}>Cross-attention to encoder</div>
          <div className={blockClass}>Feed forward network</div>
          <div className={blockClass}>Probability projection</div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
