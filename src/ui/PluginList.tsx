import "./plugin-list.css";
import { disablePlugin, enablePlugin, PluginListItem } from "snail-plugin-api";
import { React } from "snail-plugin-api";

interface PluginListProps {
  plugins: PluginListItem[];
}
export default function PluginList({ plugins }: PluginListProps) {
  return (
    <div className="plugin-list">
      {plugins.map((p) => (
        <div key={p.id} className="plugin-item">
          <div className="plugin-header">
            <div>
              <p
                style={{
                  fontWeight: 700,
                  marginBottom: 0,
                }}
              >
                {p.name || p.id}
              </p>
            </div>
            <div>
              <span style={{ fontSize: 10, opacity: 0.5 }}>
                {" "}
                v{p.version || "1.0"}
              </span>
              <input
                type="checkbox"
                defaultChecked={p.enabled}
                style={{ marginLeft: 8 }}
                onClick={(event) => {
                  const enabled = (event.target as HTMLInputElement).checked;

                  if (enabled) {
                    enablePlugin(p.id);
                  } else {
                    disablePlugin(p.id);
                  }
                }}
              />
            </div>
          </div>

          <div className="plugin-desc">
            {p.description || "No description."}
          </div>
        </div>
      ))}
    </div>
  );
}
