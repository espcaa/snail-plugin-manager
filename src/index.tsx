import {
  Plugin,
  registerPlugin,
  findComponent,
  patchComponent,
} from "snail-plugin-api";
import App from "./ui/PluginManager";

let TabsComponent: any = null;

const React = (window as any).React;

function addSettingsTab() {
  const Tabs = findComponent("Tabs");
  if (!Tabs) {
    console.warn("[Snail] Tabs component not found");
    return;
  }

  TabsComponent = Tabs;

  patchComponent(Tabs, (props: any) => {
    const [isSnailSelected, setIsSnailSelected] = React.useState(false);

    const tabs = [...props.tabs];

    if (tabs[tabs.length - 1]?.id === "advanced") {
      tabs.push({
        id: "snail",
        label: <>Snail</>,
        content: <App />,
        svgIcon: { name: "apps" },
        "aria-label": "snail",
      });
    }

    const handleTabChange = (id: string, e: React.UIEvent) => {
      if (id === "snail") {
        setIsSnailSelected(true);
      } else {
        setIsSnailSelected(false);
        if (props.onTabChange) props.onTabChange(id, e);
      }
    };

    const activeTabId = isSnailSelected ? "snail" : props.currentTabId;

    return (
      <Tabs
        __original
        {...props}
        tabs={tabs}
        currentTabId={activeTabId}
        onTabChange={handleTabChange}
      />
    );
  });
}

function removeSettingsTab() {
  if (TabsComponent) {
    patchComponent(TabsComponent, null);
    TabsComponent = null;
  }
}

class SnailPluginManager implements Plugin {
  name = "Snail Plugin Manager";
  description = "A plugin manager for Snail. ";
  version = "1.0.0";

  start() {
    addSettingsTab();
  }

  stop() {
    removeSettingsTab();
  }
}

registerPlugin(new SnailPluginManager());
