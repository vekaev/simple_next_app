import { rest } from 'msw';
import { Company, Speciality } from '@shared/types/entities';

const BASE_URL = process.env.API_URL;

const handlers = [
  rest.get(`${BASE_URL}/companies`, (_req, res, ctx) => {
    return res(
      ctx.json<Company[]>([
        {
          id: '1',
          name: 'The Interactive College',
          logoLink: 'https://placekitten.com/400/301',
          specialties: [
            {
              id: '1',
              name: 'Excavation',
            },
          ],
          city: 'New York',
        },
      ])
    );
  }),
  rest.get(`${BASE_URL}/companies/1`, (_req, res, ctx) => {
    return res(
      ctx.json<Company>({
        id: '1',
        name: 'The Interactive College',
        logoLink: 'https://placekitten.com/400/301',
        specialties: [
          {
            id: '1',
            name: 'Excavation',
          },
        ],
        city: 'New York',
      })
    );
  }),
  rest.get(`${BASE_URL}/specialities`, (_req, res, ctx) => {
    return res(
      ctx.json<Speciality[]>([
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
      ])
    );
  }),
];

export default handlers;
