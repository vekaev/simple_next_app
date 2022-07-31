import type { NextApiRequest, NextApiResponse } from 'next';

import { SpecialityService } from '@server/services/Speciality.service';
import { Speciality } from '@shared/types/entities';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Speciality[]>
) {
  const result = await SpecialityService.getSpecialties();

  res.status(200).json(result);
}
