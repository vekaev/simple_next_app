import { screen } from '@testing-library/react';
import { renderWithCompanyProvider } from '@features/companies/utils/test/renderWithCompanyProvider';

import SpecialityFilter from './SpecialityFilter';

describe('SpecialityFilter', () => {
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
});
