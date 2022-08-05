import { CompanyService } from '@server/services/Company.service';
import { NextApiRequest, NextApiResponse } from 'next';
import { Company } from '@shared/types/entities';
import { GetAllCompaniesParams } from '@server/types/companies.types';

export default {
  async getAll(req: NextApiRequest, res: NextApiResponse<Company[]>) {
    const { name, specialties } = req.query as GetAllCompaniesParams;
    const result = await CompanyService.getAll({
      filterBy: { name, specialties },
    });

    res.status(200).json(result);
  },
  async getById(req: NextApiRequest, res: NextApiResponse<Company>) {
    const { id } = req.query;

    if (!id) throw new Error('Missing id');

    const result = await CompanyService.getById(id as string);

    res.status(200).json(result);
  },
};
