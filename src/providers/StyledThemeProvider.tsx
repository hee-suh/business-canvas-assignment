import type { ReactNode } from 'react';

import { theme } from 'antd';
import { ThemeProvider } from 'styled-components';

interface StyledThemeProviderProps {
  children: ReactNode;
}

export default function StyledThemeProvider({ children }: StyledThemeProviderProps) {
  const { token } = theme.useToken();

  return <ThemeProvider theme={{ antd: token }}>{children}</ThemeProvider>;
}
