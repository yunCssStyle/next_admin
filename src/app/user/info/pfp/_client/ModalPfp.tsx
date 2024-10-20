import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import { DataTable } from '@/common/component/Table';
import {
  modalPfp,
  rowsData
} from '@/app/user/info/pfp/_client/columns/modalPfp';
import Avatar from '@mui/material/Avatar';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CoPresentIcon from '@mui/icons-material/CoPresent';

const ModalPfp = () => {
  return (
    <Box sx={{ width: '1200px' }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}
      >
        PFP 스탯 변경 이력
      </Typography>
      <Box component={Paper} sx={{ px: 2, mb: 2 }}>
        <List sx={{ display: 'flex', width: '100%' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FingerprintIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={'UID'} secondary={'123456'} />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CoPresentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="닉네임" secondary={'Mine01'} />
          </ListItem>
        </List>
      </Box>
      <Typography
        variant={'caption'}
        sx={{ display: 'block', pb: 1, textAlign: 'right' }}
      >
        스탯 값 [ B = Basic ], [ W = White List ], [ L = Legend ]
      </Typography>
      <DataTable columns={modalPfp} data={rowsData(100)} totalPage={4} />
    </Box>
  );
};

export default ModalPfp;
