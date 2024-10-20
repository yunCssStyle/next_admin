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
import { modalNickName } from '@/app/user/info/information/_client/columns/modalNickName';
import Avatar from '@mui/material/Avatar';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import useNickNameUpdateList from '@/app/user/info/information/_client/useNickNameUpdateList';

const ModalNickName = ({ userInfo }: { userInfo: any }) => {
  const { memberId, nickname } = userInfo;
  const { nicknameUpdateList } = useNickNameUpdateList(memberId);

  return (
    <Box sx={{ width: '900px' }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}
      >
        유저 닉네임 변경 이력
      </Typography>
      <Box component={Paper} sx={{ px: 2, mb: 2 }}>
        <List sx={{ display: 'flex', width: '100%' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FingerprintIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={'UID'} secondary={memberId} />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CoPresentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="닉네임" secondary={nickname} />
          </ListItem>
        </List>
      </Box>

      <DataTable
        columns={modalNickName}
        data={nicknameUpdateList}
        pageSize={100}
      />
    </Box>
  );
};

export default ModalNickName;
