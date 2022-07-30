import SpecialitiesData from '@server/src/db/specialities.json';
import { Speciality } from '@shared/types/entities/Speciality.entity';

export const SpecialityService = {
  getSpecialties: async (): Promise<Speciality[]> => {
    return SpecialitiesData.map(speciality => speciality);
  },
};
