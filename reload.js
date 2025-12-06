// remote-reload.js
const WebSocket = require("ws");
const http = require("http");

async function getWebSocketDebuggerUrl() {
  return new Promise((resolve, reject) => {
    http
      .get("http://localhost:9222/json/list", (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const tabs = JSON.parse(data);
            if (!tabs.length) return reject("No tabs found.");
            resolve(tabs[0].webSocketDebuggerUrl); // Connect to the first tab
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject);
  });
}

(async () => {
  const wsUrl = await getWebSocketDebuggerUrl();
  console.log("Connecting to:", wsUrl);

  const ws = new WebSocket(wsUrl);

  ws.on("open", () => {
    console.log("Connected!");

    // Send DevTools Protocol command: Page.reload
    const message = {
      id: 1,
      method: "Page.reload",
      params: {}, // could include { ignoreCache: true }
    };

    ws.send(JSON.stringify(message));
    console.log("Reload command sent.");
  });

  ws.on("message", (msg) => {
    console.log("Received:", msg.toString());
  });

  ws.on("error", (err) => console.error("WebSocket error:", err));
})();
