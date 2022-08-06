import {
  Box,
  Center,
  ColorScheme,
  Group,
  SegmentedControl,
  useMantineColorScheme,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconMoon, IconSun } from '@tabler/icons';

const Header = () => {
  const { hovered, ref } = useHover();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="right" my="xs" mr="md" ref={ref} mb={0}>
      {hovered && 'Also depends on computer theme'}
      <SegmentedControl
        value={colorScheme}
        onChange={(value: ColorScheme) => toggleColorScheme(value)}
        data={[
          {
            value: 'light',
            label: (
              <Center>
                <IconSun size={16} stroke={1.5} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
          },
          {
            value: 'dark',
            label: (
              <Center>
                <IconMoon size={16} stroke={1.5} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
};

export default Header;
