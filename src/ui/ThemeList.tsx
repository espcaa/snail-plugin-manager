import { PluginCard } from "../components/pluginCard";
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
        <PluginCard theme={p} key={p.id} />
      ))}
    </div>
  );
}
