import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Title, Image, Button } from '@mantine/core';

import { useGoBack } from '@hooks/useGoBack';
import { getCompanyById } from '@features/companies/services/api';
import { Company } from '@shared/types/entities/Company.entity';
import { getErrorMessage } from '@shared/utils/getErrorMessage';

const CompanyScreen: React.FC = () => {
  const router = useRouter();
  const { id: companyId } = router.query as { id: string };

  const [company, setCompany] = useState<Company | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const routerBack = useGoBack();

  const fetchCompany = useCallback(async (id: string) => {
    if (!id) return;

    try {
      const result = await getCompanyById(id);

      if (!result) {
        const eMessage = `Company with id ${id} not found`;

        setErrorMessage(eMessage);
      }

      setCompany(result);
    } catch (e) {
      setErrorMessage(getErrorMessage(e));
    }
  }, []);

  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId, fetchCompany]);

  return (
    <>
      <Head>
        <title>Company {companyId}</title>
      </Head>
      <div>
        {errorMessage && <div>{errorMessage}</div>}
        {company && (
          <>
            <Button onClick={routerBack}>Back</Button>
            <Title>{company.name}</Title>
            <Image src={company.logoLink} alt={company.name} height={180} />
          </>
        )}
      </div>
    </>
  );
};

export default CompanyScreen;
