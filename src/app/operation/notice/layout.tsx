import { Tabs } from '@/common/component/Nav';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Tabs />
      {children}
    </>
  );
}
