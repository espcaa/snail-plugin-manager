import {
  disablePlugin,
  disableTheme,
  enablePlugin,
  enableTheme,
  findComponent,
  PluginListItem,
  ThemeListItem,
} from "snail-plugin-api";
import { React } from "snail-plugin-api";

type CardProps =
  | { plugin: PluginListItem; theme?: never }
  | { theme: ThemeListItem; plugin?: never };

export function PluginCard({ plugin, theme }: CardProps) {
  const p = plugin ?? theme;

  return (
    <div
      key={p.id}
      className="plugin-item"
      style={{
        display: "flex",
        flexDirection: "row",
        flex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
        }}
      >
        <div className="plugin-icon" style={{ marginRight: 12 }}>
          {p.icon ? (
            <img
              src={(p as any).manifest.icon}
              alt={`${p.name || p.id} icon`}
              style={{ width: 40, height: 40, borderRadius: 8 }}
            />
          ) : (
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                color: "#666",
              }}
            >
              {p.name ? p.name.charAt(0).toUpperCase() : "?"}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            className="plugin-header"
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  marginBottom: 0,
                }}
              >
                {p.name || p.id}
              </p>
              <span style={{ fontSize: 10, opacity: 0.5, marginLeft: 8 }}>
                {" "}
                v{p.version || "1.0"}
              </span>
            </div>
          </div>

          <div className="plugin-desc">
            {p.description || "no description"} | made by{" "}
            {(p as any).manifest.author || "anon"}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            defaultChecked={p.enabled}
            style={{ marginLeft: 8 }}
            onClick={(event) => {
              const enabled = (event.target as HTMLInputElement).checked;

              if (theme) {
                if (enabled) {
                  enableTheme(p.id);
                } else {
                  disableTheme(p.id);
                }
              } else {
                if (enabled) {
                  enablePlugin(p.id);
                } else {
                  disablePlugin(p.id);
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
