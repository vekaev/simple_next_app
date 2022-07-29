import Head from 'next/head';
import { useRouter } from 'next/router';

import CompanyScreen from '@features/companies/screens/Company.screen';

export default function () {
  const router = useRouter();
  const { id } = router.query as { id: string };

  return (
    <>
      <Head>
        <title>Company {id}</title>
      </Head>
      <CompanyScreen companyId={id} />
    </>
  );
}
