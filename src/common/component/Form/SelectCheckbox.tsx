import { useState, ChangeEvent, useEffect } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import _ from 'lodash';

const SelectCheckbox = ({
  checkAll,
  checkList,
  handle
}: {
  checkAll?: boolean;
  checkList?: { value: string | number; label: string; checked?: boolean }[];
  handle?: (
    list: { value: string | number; label: string; checked?: boolean }[]
  ) => void;
}) => {
  const [state, setState] = useState(checkList || []);
  const [all, setAll] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = _.findIndex(checkList, { label: e.target.name });
    let cloneList = _.cloneDeep(state);
    cloneList[target].checked = e.target.checked;
    setState(cloneList);
    if (handle) handle(cloneList);
  };

  const handleAll = () => {
    let list: any[];
    if (all) {
      list = _.map(state, (item) => ({ ...item, checked: false }));
    } else {
      list = _.map(state, (item) => ({ ...item, checked: true }));
    }
    setAll(!all);
    setState(list);
    if (handle) handle(list);
  };

  useEffect(() => {
    setAll(_.every(state, { checked: true }));
  }, [state]);

  return (
    <FormGroup row sx={{ columnGap: 2 }}>
      {checkAll && (
        <FormControlLabel
          control={<Checkbox onChange={handleAll} name={'all'} checked={all} />}
          label={'전체'}
          key={'전체_All'}
        />
      )}
      {_.map(state, (item, index) => (
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChange}
              name={item.label}
              checked={item.checked}
            />
          }
          label={item.label}
          key={item.label + index}
        />
      ))}
    </FormGroup>
  );
};

export default SelectCheckbox;
