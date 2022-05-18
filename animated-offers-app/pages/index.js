import {Frame, Tabs, Card, Page, Badge} from "@shopify/polaris";
import {useCallback, useState} from "react";
import OffersList from "./offer-list";
import Analytics from "./analytics";
import Settings from "./settings";
import Help from "./help";

const Index = () => {
  const tabs = [
    {
      id: 'offers',
      content: 'Offers',
      accessibilityLabel: 'All Offers',
      panelID: 'offers',
    },
    {
      id: 'analytics',
      content: 'Analytics',
      panelID: 'analytics',
    },
    {
      id: 'settings',
      content: 'Settings',
      panelID: 'settings',
    },
    {
      id: 'help',
      content: 'Help & Support',
      panelID: 'help'
    },
  ];

  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [selected],
  );

  //TODO: update top browser title
  // TODO: move components or switch to pages
  return (
    <Frame>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        {selected === 0 &&
          <OffersList />
        }

        {selected === 1 &&
          <Analytics />
        }

        {selected === 2 &&
          <Settings />
        }

        {selected === 3 &&
          <Help />
        }
      </Tabs>
    </Frame>
  )
}

export default Index;
