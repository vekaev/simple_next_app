import type { NextApiRequest, NextApiResponse } from 'next';

import { SpecialityService } from '@pages/api/src/services/Speciality.service';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const result = await SpecialityService.getSpecialties();

  res.status(200).json(result);
}
