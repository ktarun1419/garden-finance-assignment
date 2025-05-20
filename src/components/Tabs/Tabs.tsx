import React from 'react';
import { TabsContainer, TabLink } from './Tabs.styles';

export default function Tabs() {
  return (
    <TabsContainer>
      <TabLink to='/' end>
        Summary
      </TabLink>
      <TabLink to='/chart'>
        Chart
      </TabLink>
      <TabLink to='/stats'>
        Statistics
      </TabLink>
      <TabLink to='/analysis'>
        Analysis
      </TabLink>
      <TabLink to='/settings'>
        Settings
      </TabLink>
    </TabsContainer>
  );
}

