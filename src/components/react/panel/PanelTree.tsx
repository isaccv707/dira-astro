import type { PanelNode } from "../../../interfaces/study.interface";

interface PanelTreeProps {
  nodes: PanelNode[];
  depth?: number;
}

// Children arrive ordered by `order` — render as-is. No prices here: the
// panel is sold as a whole at the parent study's priceInfo.
const PanelTree = ({ nodes, depth = 0 }: PanelTreeProps) => (
  <ul
    className={
      depth > 0 ? "mt-1.5 space-y-1.5 border-l border-ui-border pl-3" : "space-y-1.5"
    }
  >
    {nodes.map((node) =>
      node.isPanel ? (
        <li key={node.id}>
          <p className="text-xs font-bold text-ink">
            {node.title ?? node.name}
          </p>
          {node.children.length > 0 ? (
            <PanelTree nodes={node.children} depth={depth + 1} />
          ) : (
            <p className="mt-1 pl-3 text-2xs text-ink-subtle">
              Sin parámetros registrados
            </p>
          )}
        </li>
      ) : (
        <li key={node.id} className="flex flex-col">
          <span className="text-xs leading-snug text-ink-muted">
            {node.title ?? node.name}
          </span>
          <span className="text-2xs text-ink-subtle">
            {[node.code, node.abbreviation].filter(Boolean).join(" · ")}
          </span>
        </li>
      ),
    )}
  </ul>
);

export default PanelTree;
