import { Company } from '@shared/types/entities';

export type GetAllCompaniesParams = Partial<Record<keyof Company, string>>;
