import { useState } from "react";

import "./SwitchTab.scss";
type props = {
  dataTab: string[];
  onChangeTab: any;
};
const SwitchTab = ({ dataTab, onChangeTab }: props) => {
  const [tabSelected, setTabSelected] = useState(0);
  const [left, setLeft] = useState(0);
  const activeTab = (tab: string, index: number) => {
    setLeft(index * 100);
    setTimeout(() => {
      setTabSelected(index);
    }, 300);
    onChangeTab(tab, index);
  };
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {dataTab.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${tabSelected === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTab;
