import { render } from '@testing-library/react';

import { base } from './ProfileInfoForm.stories';

describe('ProfileInfoForm', () => {
  it('Renders without exploding', () => {
    const { getByPlaceholderText } = render(base());
    expect(getByPlaceholderText(/email/)).toBeInTheDocument();
  });
});
