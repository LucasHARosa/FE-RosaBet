"use client";

import React, { useState } from "react";
import { TabGroup, TabButton } from "./styles";

interface Tab {
  id: string;
  label: string;
  key: string;
}

interface TabsProps {
  tabs: Tab[];
  onTabChange: (index: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    onTabChange(index);
  };

  return (
    <TabGroup>
      {tabs.map((tab, index) => (
        <TabButton
          key={tab.key}
          isActive={selectedTab === index}
          onClick={() => handleTabChange(index)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabGroup>
  );
};
