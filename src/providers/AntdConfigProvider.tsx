import type { ReactNode } from 'react';

import { ConfigProvider } from 'antd';

import { customTheme } from '@/theme/customTheme';

interface AntdConfigProviderProps {
  children: ReactNode;
}

export default function AntdConfigProvider({ children }: AntdConfigProviderProps) {
  return <ConfigProvider theme={customTheme}>{children}</ConfigProvider>;
}
