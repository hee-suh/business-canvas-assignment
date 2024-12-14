import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';

interface MenuItemConfig {
  key: string;
  label: string;
  danger?: boolean;
  onClick: VoidFunction;
}

const createMenuItems = (configs: MenuItemConfig[]): MenuProps['items'] => {
  return configs.flatMap((config, index) => {
    const isLastItem = index === configs.length - 1;
    const menuItem = {
      key: config.key,
      label: (
        <Button
          type="text"
          danger={config.danger}
          onClick={config.onClick}
          style={{ width: 173, justifyContent: 'start', padding: 0 }}
        >
          {config.label}
        </Button>
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
