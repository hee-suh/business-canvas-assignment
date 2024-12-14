import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import styled from 'styled-components';

interface MenuItemConfig {
  key: string;
  label: string;
  danger?: boolean;
  onClick: VoidFunction;
}

const MenuButton = styled(Button)`
  width: 173px;
  justify-content: start;
  padding: 0;
`;

const createMenuItems = (configs: MenuItemConfig[]): MenuProps['items'] => {
  return configs.flatMap((config, index) => {
    const isLastItem = index === configs.length - 1;
    const menuItem = {
      key: config.key,
      label: (
        <MenuButton type="text" danger={config.danger} onClick={config.onClick}>
          {config.label}
        </MenuButton>
      ),
    };
    if (!isLastItem) {
      return [menuItem, { type: 'divider', key: `divider-${index}` }];
    }
    return [menuItem];
  });
};

export const createActionColumn = <T extends object>(
  menuConfigs: MenuItemConfig[],
  onClickAction: (record: T) => void,
) => ({
  key: 'actions',
  render: (_: unknown, record: T) => {
    const menuItems = createMenuItems(menuConfigs);

    return (
      <Dropdown
        menu={{ items: menuItems }}
        placement="bottomRight"
        overlayStyle={{ paddingTop: 8 }}
      >
        <Button type="text" icon={<MoreOutlined />} onClick={() => onClickAction(record)} />
      </Dropdown>
    );
  },
});
