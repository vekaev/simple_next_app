import { Company, Speciality } from '@shared/types/entities';
import CompaniesData from '../db/companies.json';

interface GetAllCompaniesParams {
  filterBy: Partial<Record<keyof Company, string>>;
}
export const CompanyService = {
  getAll: async ({ filterBy }: GetAllCompaniesParams): Promise<Company[]> => {
    let result = CompaniesData as Company[];

    if (filterBy) {
      const { name, specialties } = filterBy;

      if (name?.length)
        result = result.filter(company =>
          company.name.toLowerCase().startsWith(name.toLowerCase())
        );

      if (specialties?.length) {
        const specialitiesMap = new Map<Speciality['id'], boolean>();

        specialties.split(',').forEach((speciality: Speciality['id']) => {
          specialitiesMap.set(speciality, true);
        });

        const specialitiesLength = Array.from(specialitiesMap.keys()).length;

        result = result.filter(company => {
          const companySpecialitiesMatches = company.specialties
            .map(speciality => speciality.id)
            .reduce((acc, speciality) => {
              if (specialitiesMap.has(speciality)) return acc + 1;

              return acc;
            }, 0);

          return companySpecialitiesMatches === specialitiesLength;
        });
      }
    }

    return result || [];
  },
  getById: async (id: string): Promise<Company> => {
    return CompaniesData.find(company => company.id === id) as Company;
  },
};
