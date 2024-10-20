'use client';

import { SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs as TabGroup } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { menuInfo, menuInfoType, subMenuType } from '@/common/config';
import _ from 'lodash';

const Tabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const segment = _.split(pathname, '/');
  const currentMenu = _.find(menuInfo, { path: segment[1] }) as menuInfoType;
  const currentSubMenu = _.find(currentMenu.subMenu, {
    path: segment[2]
  }) as subMenuType;
  const index = _.findIndex(currentSubMenu.tabs, { path: segment[3] });

  const [value, setValue] = useState(index >= 0 ? index : 0);

  const handleChange = (e: SyntheticEvent, value: number) => {
    setValue(value);
    if (currentSubMenu.tabs) {
      const query = searchParams.toString();
      router.push(
        `/${currentMenu.path}/${currentSubMenu.path}/${
          currentSubMenu.tabs[value].path
        }${query ? '?' + query : ''}`
      );
    }
  };

  return (
    <Box sx={{ pb: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabGroup value={value} onChange={handleChange}>
          {_.map(currentSubMenu?.tabs, (item, index) => {
            return (
              <Tab
                label={<span dangerouslySetInnerHTML={{ __html: item.name }} />}
                key={item.name + index}
              />
            );
          })}
        </TabGroup>
      </Box>
    </Box>
  );
};

export default Tabs;
