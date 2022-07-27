import { IEvent } from '@types';

export interface InputProps {
  id?: string;
  label?: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (value: string, event: IEvent) => void;
  className?: string;
  placeholder?: string;
}
