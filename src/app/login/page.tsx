import Page from '@/app/login/_client/Page';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  } else {
    return <Page />;
  }
}
