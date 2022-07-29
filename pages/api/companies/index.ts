import type { NextApiRequest, NextApiResponse } from 'next';

import { CompanyService } from '@pages/api/src/services/Company.service';
import { Company } from '@shared/types/entities/Company.entity';

type GetAllCompaniesParams = Partial<Record<keyof Company, string>>;

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Company[]>
) {
  const { name, specialties } = _req.query as GetAllCompaniesParams;
  const result = await CompanyService.getAll({
    filterBy: { name, specialties },
  });

  res.status(200).json(result);
}
