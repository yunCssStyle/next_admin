import { faker } from '@faker-js/faker';
import _ from 'lodash';

export type Person = {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: 'relationship' | 'complicated' | 'single';
  subRows?: Person[];
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single'
    ])[0]!,
    progress: faker.number.int(100)
  };
};

export const makeData = (...lens: number[]) => {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return _.map(range(len), (d, index): Person => {
      return {
        ...newPerson(),
        id: index.toString()
      };
    });
  };

  return makeDataLevel();
};
