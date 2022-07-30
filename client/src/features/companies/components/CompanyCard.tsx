import React, { useMemo } from 'react';
import { Badge, Card, createStyles, Group, Image, Text } from '@mantine/core';

import { Link } from '@components';
import { Company } from '@shared/types/entities/Company.entity';

interface IProps {
  company: Company;
}

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const CompanyCard: React.FC<IProps> = ({
  company: { id, name, specialties, logoLink, city },
}) => {
  const { classes, theme } = useStyles();

  const specialtiesList = useMemo(
    () =>
      specialties.map(specialty => (
        <Badge
          key={specialty.id}
          color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
        >
          {specialty.name}
        </Badge>
      )),
    [specialties, theme]
  );

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={logoLink} alt={name} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {name}
          </Text>
          <Badge size="sm">{city}</Badge>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} color="dimmed">
          Specialities:
        </Text>
        <Group spacing={7} mt={5}>
          {specialtiesList}
        </Group>
      </Card.Section>
      <Group mt="xs">
        <Link href={`${id}`} radius="md" style={{ flex: 1 }}>
          Company page
        </Link>
      </Group>
    </Card>
  );
};

export default CompanyCard;
