import React, { ChangeEvent } from 'react';
import { Checkbox, createStyles, Text } from '@mantine/core';

const useStyles = createStyles((theme, { checked }: { checked: boolean }) => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    transition: 'background-color 150ms ease, border-color 150ms ease',
    border: `1px solid ${
      checked
        ? theme.fn.variant({ variant: 'outline', color: theme.primaryColor })
            .border
        : theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    backgroundColor: checked
      ? theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[8]
      : theme.white,
  },

  body: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
}));

interface TitledCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
}

export function TitledCheckbox({
  checked,
  onChange,
  title,
  className,
}: TitledCheckboxProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, keyof TitledCheckboxProps>) {
  const { classes, cx } = useStyles({ checked });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className={cx(classes.button, className)}>
      <div className={classes.body}>
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
          {title}
        </Text>
      </div>

      <Checkbox
        checked={checked}
        onChange={handleChange}
        tabIndex={-1}
        styles={{ input: { cursor: 'pointer' } }}
      />
    </div>
  );
}

export default TitledCheckbox;
