import "./plugin-list.css";
import { disablePlugin, enablePlugin, PluginListItem } from "snail-plugin-api";
import { React } from "snail-plugin-api";
import { PluginCard } from "../components/pluginCard";

interface PluginListProps {
  plugins: PluginListItem[];
}
export default function PluginList({ plugins }: PluginListProps) {
  return (
    <div className="plugin-list">
      {plugins.length === 0 && (
        <div style={{ textAlign: "center", marginTop: 20, color: "#888" }}>
          No plugins installed.
        </div>
      )}
      {plugins.map((p) => (
        <PluginCard plugin={p} key={p.id} />
      ))}
    </div>
  );
}
