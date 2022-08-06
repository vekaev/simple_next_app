import { rest } from 'msw';

import { BASE_URL } from '@services/api';
import { Company, Speciality } from '@shared/types/entities';

const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'The Interactive College',
    logoLink: '/__mocks__/company_photo.jpeg',
    specialties: [
      {
        id: '1',
        name: 'Excavation',
      },
    ],
    city: 'New York',
  },
];
const mockSpecialities: Speciality[] = [
  {
    id: '1',
    name: 'Excavation',
  },
  {
    id: '2',
    name: 'Plumbing',
  },
  {
    id: '3',
    name: 'Electrical',
  },
];

const handlers = [
  rest.get(`${BASE_URL}/companies`, (_, res, ctx) =>
    res(ctx.json<Company[]>(mockCompanies))
  ),
  rest.get(`${BASE_URL}/companies/:id`, (_, res, ctx) =>
    res(ctx.json<Company>(mockCompanies[0]))
  ),
  rest.get(`${BASE_URL}/specialities`, (_, res, ctx) =>
    res(ctx.json<Speciality[]>(mockSpecialities))
  ),
];

export default handlers;
