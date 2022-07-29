import CompaniesData from '@pages/api/src/db/companies.json';
import { Company } from '@shared/types/entities/Company.entity';

interface GetAllCompaniesParams {
  filterBy: Partial<Record<keyof Company, string>>;
}
export const CompanyService = {
  getAll: async ({
    filterBy,
  }: // eslint-disable-next-line sonarjs/cognitive-complexity
  GetAllCompaniesParams): Promise<Company[]> => {
    let result = CompaniesData as Company[];

    if (filterBy) {
      const { name, specialties } = filterBy;

      if (name?.length)
        result = result.filter(company =>
          company.name.toLowerCase().startsWith(name.toLowerCase())
        );

      if (specialties?.length) {
        const sortedSpecialtiesParam = specialties.split(',').sort().join(',');
        const companiesBySpecialties = new Map();

        const setSpeciality = (company: Company) => (key: string) => {
          if (companiesBySpecialties.has(key)) {
            companiesBySpecialties.get(key).push(company);
          } else {
            companiesBySpecialties.set(key, [company]);
          }
        };

        result.forEach(company => {
          const companySpecialties = company.specialties.sort().join(',');

          setSpeciality(company)(companySpecialties);

          if (companySpecialties.includes(','))
            company.specialties.forEach(setSpeciality(company));
        });

        result = companiesBySpecialties.get(sortedSpecialtiesParam);
      }
    }

    return result || [];
  },
  getById: async (id: string): Promise<Company> => {
    return CompaniesData.find(company => company.id === id) as Company;
  },
};
