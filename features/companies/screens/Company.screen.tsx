import React, { useCallback, useEffect, useState } from 'react';
import { Title, Image, Button } from '@mantine/core';

import { useGoBack } from '@hooks/useGoBack';
import { getCompanyById } from '@services/companies/api';
import { Company } from '@shared/types/entities/Company.entity';
import { getErrorMessage } from '@shared/utils/getErrorMessage';

interface IProps {
  companyId: string;
}

const CompanyScreen: React.FC<IProps> = ({ companyId }) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const routerBack = useGoBack();

  const fetchCompany = useCallback(async (id: string) => {
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
    if (companyId) fetchCompany(companyId);
  }, [companyId]);

  return (
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
  );
};

export default CompanyScreen;
