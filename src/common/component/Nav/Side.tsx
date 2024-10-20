import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography
} from '@mui/material';
import {
  useRouter,
  useSelectedLayoutSegment,
  usePathname
} from 'next/navigation';
import { menuInfoType, menuInfo } from '@/common/config';
import _ from 'lodash';

const Side = () => {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();
  const path = _.split(pathname, '/');
  const currentMenu = _.find(menuInfo, { path: segment }) as menuInfoType;

  const handleNavMenu = (link: string) => {
    router.push(`/${link}`);
  };

  return currentMenu ? (
    <Box
      sx={{
        pt: 4,
        minHeight: '100%',
        width: '100%',
        maxWidth: 200,
        minWidth: 200,
        bgcolor: 'background.paper',
        boxShadow:
          '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
      }}
    >
      <nav>
        <Typography variant="h5" gutterBottom textAlign={'center'}>
          {currentMenu?.title}
        </Typography>
        <Divider />
        <List>
          {_.map(currentMenu?.subMenu, (subMenu, index) => (
            <ListItem disablePadding key={subMenu.path + index}>
              <ListItemButton selected={path[2] === subMenu.path}>
                <ListItemText
                  primary={subMenu.name}
                  onClick={() =>
                    handleNavMenu(`${currentMenu.path}/${subMenu.path}`)
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  ) : null;
};

export default Side;
