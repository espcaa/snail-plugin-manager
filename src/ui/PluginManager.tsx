import { React, useState, useEffect, findComponent } from "snail-plugin-api";
import PluginList from "./PluginList";
import ThemeList from "./ThemeList";
import "../style.css";
import { getPluginList, getThemeList, PluginListItem } from "snail-plugin-api";
import { Theme } from "../types";
const Button = findComponent("BaseButton");

const Tabs = findComponent("Tabs");

const hidden_plugin_ids = ["snail-plugin-manager"];

export default function App() {
  const [plugins, setPlugins] = useState<PluginListItem[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);

  const tabDefs = [
    {
      title: "Plugins",
      label: "Plugins",
      id: "plugins",
      "aria-label": "Plugins",
      autoClogProps: { elementName: "plugins" },
    },
    {
      title: "Themes",
      label: "Themes",
      id: "themes",
      "aria-label": "Themes",
      autoClogProps: { elementName: "themes" },
    },
  ];

  const [activeTab, setActiveTab] = useState(tabDefs[0].id);

  useEffect(() => {
    const list = getPluginList().filter(
      (plugin) => !hidden_plugin_ids.includes(plugin.id),
    );
    setPlugins(list);

    const id = setInterval(() => {
      const list = getPluginList().filter(
        (plugin) => !hidden_plugin_ids.includes(plugin.id),
      );
      setPlugins(list);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const list = getThemeList().filter(
      (theme) => !hidden_plugin_ids.includes(theme.id),
    );
    setThemes(list);

    const id = setInterval(() => {
      const list = getThemeList().filter(
        (theme) => !hidden_plugin_ids.includes(theme.id),
      );
      setThemes(list);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div
        className="header"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>Snail \o/</h1>
        </div>
        <div>
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload slack
          </Button>
        </div>
      </div>
      <Tabs
        tabs={tabDefs}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id)}
      />

      <div style={{ marginTop: 12 }}>
        {activeTab === "plugins" && <PluginList plugins={plugins} />}
        {activeTab === "themes" && <ThemeList plugins={themes} />}
      </div>
    </div>
  );
}
