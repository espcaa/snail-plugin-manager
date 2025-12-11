import { React, useState, useEffect, findComponent } from "snail-plugin-api";
import PluginList from "./PluginList";
import ThemeList from "./ThemeList";
import "../style.css";
import { getPluginList, getThemeList, PluginListItem } from "snail-plugin-api";
import { Theme } from "../types";
const Button = findComponent("Button");

const Tabs = findComponent("Tabs");

const hidden_plugin_ids = ["snail-plugin-manager"];

export default function App() {
  const [plugins, setPlugins] = useState<PluginListItem[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installMessage, setInstallMessage] = useState("");

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
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img
            src="https://docs.snail.hackclub.cc/_next/image?url=%2Ficon.png&w=256&q=75"
            alt="Snail Logo"
            style={{ width: 32, height: 32, marginRight: 8, borderRadius: 8 }}
          />
          <h1>Snail</h1>
        </div>
        <div>
           <Button
             onClick={() => {
               window.location.reload();
             }}
             type="outline"
           >
             Reload slack
           </Button>
           <Button
             onClick={async () => {
               setIsInstalling(true);
               setInstallMessage("");
               try {
                 const result = await (window as any).Snail.installPlugin();
                 if (result?.success) {
                   setInstallMessage("✓ Plugin installed successfully");
                 } else {
                   setInstallMessage(`✗ ${result?.message || "Installation failed"}`);
                 }
               } catch (error) {
                 setInstallMessage(`✗ ${error instanceof Error ? error.message : "Installation failed"}`);
               } finally {
                 setIsInstalling(false);
                 setTimeout(() => setInstallMessage(""), 3000);
               }
             }}
             style={{ marginLeft: 8 }}
             disabled={isInstalling}
           >
             {isInstalling ? "Installing..." : "Install a plugin"}
           </Button>
         </div>
      </div>
       {installMessage && (
         <div
           className="install-message"
           style={{
             padding: "8px 12px",
             marginBottom: 12,
             borderRadius: 4,
             backgroundColor: installMessage.includes("✓") ? "#d4edda" : "#f8d7da",
             color: installMessage.includes("✓") ? "#155724" : "#721c24",
             border: `1px solid ${installMessage.includes("✓") ? "#c3e6cb" : "#f5c6cb"}`,
             animation: "slideIn 0.3s ease-in-out",
           }}
         >
           {installMessage}
         </div>
       )}
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
