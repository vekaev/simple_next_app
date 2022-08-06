import { curriedRenderWith } from '@utils/test';
import { CompanyDataProvider } from '@features/companies/providers/Company.provider';

export const renderWithCompanyProvider = curriedRenderWith(CompanyDataProvider);
