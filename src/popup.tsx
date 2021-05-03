import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Popup = () => {
  const [currentURL, setCurrentURL] = useState<string>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  const fillMyInfo = (): void => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs): void => {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { fillMyInfo: true }, (msg) => {
          console.log("Filled MyInfo", msg);
        });
      }
    });
  };

  return <button onClick={fillMyInfo}>fill MyInfo</button>;
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
