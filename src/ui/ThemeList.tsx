import type { Theme } from "../types";
import "./plugin-list.css";
import { disableTheme, enableTheme } from "snail-plugin-api";
import { React } from "snail-plugin-api";

interface ThemeListProps {
  plugins: Theme[];
}
export default function ThemeList({ plugins }: ThemeListProps) {
  return (
    <div className="plugin-list">
      {plugins.map((p) => (
        <div key={p.id} className="plugin-item">
          <div className="plugin-header">
            <div>{p.name || p.id}</div>
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
                    enableTheme(p.id);
                  } else {
                    disableTheme(p.id);
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
