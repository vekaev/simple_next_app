import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithCompanyProvider } from '@features/companies/utils/test/renderWithCompanyProvider';
import { FILTERS_STORAGE_KEY } from '@features/companies/providers/Company.provider';
import * as CompanyService from '@features/companies/services/api';

import SpecialityFilter from './SpecialityFilter';

const getCompanies = jest.fn(() => Promise.resolve([]));

describe('SpecialityFilter', () => {
  beforeEach(() => {
    jest.spyOn(CompanyService, 'getCompanies').mockImplementation(getCompanies);
    window.localStorage.clear();
  });

  test('renders correctly', async () => {
    const { container } = renderWithCompanyProvider(<SpecialityFilter />);

    const specialityFilters = await screen.findAllByRole('checkbox');
    const specialityFilterTitles = specialityFilters.map(
      specialityFilter => specialityFilter.title
    );

    expect(specialityFilters).toHaveLength(3);
    specialityFilters.forEach(specialityFilter =>
      expect(specialityFilter).not.toBeChecked()
    );
    expect(specialityFilterTitles).toEqual([
      'Excavation',
      'Plumbing',
      'Electrical',
    ]);

    expect(container).toMatchSnapshot();
  });

  test('renders correctly with checked filters', async () => {
    const checkedFilterId = '1';

    window.localStorage.setItem(
      'filters',
      JSON.stringify({ filters: { specialties: [checkedFilterId] } })
    );

    renderWithCompanyProvider(<SpecialityFilter />);

    const specialityFilters = await screen.findAllByRole('checkbox');

    expect(specialityFilters).toHaveLength(3);

    specialityFilters.forEach(specialityFilter => {
      if (specialityFilter.id === checkedFilterId) {
        expect(specialityFilter).toBeChecked();
      } else {
        expect(specialityFilter).not.toBeChecked();
      }
    });
  });

  test('checkbox must be checked and filters saved to local storage after click and vice versa', async () => {
    renderWithCompanyProvider(<SpecialityFilter />);

    let specialityFilter = await screen.findByRole('checkbox', {
      name: 'Excavation',
    });

    expect(specialityFilter).not.toBeChecked();

    fireEvent.click(specialityFilter);

    specialityFilter = screen.getByRole('checkbox', {
      name: 'Excavation',
    });

    expect(specialityFilter).toBeChecked();

    let parsedFilters = JSON.parse(
      window.localStorage.getItem(FILTERS_STORAGE_KEY) || ''
    );

    expect(parsedFilters.specialties).toEqual(['1']);

    fireEvent.click(specialityFilter);

    specialityFilter = screen.getByRole('checkbox', {
      name: 'Excavation',
    });

    expect(specialityFilter).not.toBeChecked();

    parsedFilters = JSON.parse(
      window.localStorage.getItem(FILTERS_STORAGE_KEY) || ''
    );

    expect(parsedFilters.specialties).toEqual([]);

    // TODO: Fix the "not wrapped in act(...)" warning
    // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
    await waitFor(() => expect(getCompanies).toBeCalled());
  });
});
