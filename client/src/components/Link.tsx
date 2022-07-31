import React from 'react';
import DefaultLink from 'next/link';
import { Button, ButtonProps } from '@mantine/core';

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
