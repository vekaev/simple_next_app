import SpecialitiesData from '@pages/api/src/db/specialities.json';

export const SpecialityService = {
  getSpecialties: async (): Promise<string[]> => {
    return SpecialitiesData.map(speciality => speciality.name);
  },
};
