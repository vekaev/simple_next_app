import React from 'react';
import DefaultLink from 'next/link';
import { Button } from '@mantine/core';
import { ButtonProps } from '@node_modules/@mantine/core/lib/Button/Button';

type IProps = {
  href: string;
  children: React.ReactNode | string;
} & ButtonProps;

const Link: React.FC<IProps> = ({ href, children, ...props }) => (
  <DefaultLink href={href} passHref>
    <Button {...props} component="a">
      {children}
    </Button>
  </DefaultLink>
);

export default Link;
