import { SpecialityService } from '@serverservices/Speciality.service';
import { NextApiRequest, NextApiResponse } from 'next';
import { Speciality } from '@shared/types/entities';

export default {
  async getAll(req: NextApiRequest, res: NextApiResponse<Speciality[]>) {
    const result = await SpecialityService.getSpecialties();

    res.status(200).json(result);
  },
};
