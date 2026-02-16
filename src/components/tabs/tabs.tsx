import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import type { TabShape } from "../../utils/types";
import style from "./tabs.module.scss";
import React from "react";

type Props = {
  changeTab: (currentTab: string) => void;
  currentTab: string;
  tabs: TabShape[];
};

const Tabs = React.memo(({ changeTab, currentTab, tabs }: Props) => {
  return (
    <ul className={style.list}>
      {tabs.map((tab) => (
        <li key={tab.type}>
          <Tab
            active={currentTab === tab.type}
            onClick={changeTab}
            value={tab.type}
          >
            {tab.name}
          </Tab>
        </li>
      ))}
    </ul>
  );
});

export default Tabs;
