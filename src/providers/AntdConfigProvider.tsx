import { customTheme } from '@/theme/customTheme';
import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';

interface AntdConfigProviderProps {
  children: ReactNode;
}

export default function AntdConfigProvider({ children }: AntdConfigProviderProps) {
  return <ConfigProvider theme={customTheme}>{children}</ConfigProvider>;
}
