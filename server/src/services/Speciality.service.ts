import { Speciality } from '@shared/types/entities';
import SpecialitiesData from '../db/specialities.json';

export const SpecialityService = {
  getSpecialties: async (): Promise<Speciality[]> => {
    return SpecialitiesData.map(speciality => speciality);
  },
};
