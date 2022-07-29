import type { NextApiRequest, NextApiResponse } from 'next';

import { CompanyService } from '@pages/api/src/services/Company.service';
import { Company } from '@shared/types/entities/Company.entity';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Company>
) {
  const { id } = _req.query;

  if (!id) throw new Error('Missing id');

  const result = await CompanyService.getById(id as string);

  res.status(200).json(result);
}
