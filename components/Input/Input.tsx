import { useCallback, memo } from 'react';

import { IEvent } from '@types';

import { InputProps } from './types';
import { StyledInput } from './styled';

const Input = ({ type, value, onChange, className, ...props }: InputProps) => {
  const handleChange = useCallback(
    (e: IEvent) => {
      const { value: v } = e.target;

      onChange(v, e);
    },
    [onChange]
  );

  return (
    <div className="mt-1 relative rounded-md shadow-md">
      <StyledInput
        {...props}
        type={type}
        value={value || ''}
        onChange={handleChange}
        className={`block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md ${className}`}
      />
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
  className: '',
};

export default memo(Input);
