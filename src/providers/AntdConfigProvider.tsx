import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

interface AntdConfigProviderProps {
  children: ReactNode;
}

export default function AntdConfigProvider({ children }: AntdConfigProviderProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Pretendard',
          lineHeight: 1.57,
          lineHeightHeading5: 1.5,
          colorText: '#000000E0',
          colorTextDisabled: '#00000040',
          colorTextPlaceholder: '#00000040',
          colorTextTertiary: '#00000073',
          colorPrimary: '#4A7CFE',
          colorPrimaryHover: '#739FFF',
          colorPrimaryActive: '#345DD9',
          colorError: '#FF4D4F',
          colorBorder: '#E3E3E3',
          colorBgContainer: '#FFFFFF',
          colorBgContainerDisabled: '#0000000A',
          colorBgTextHover: '#0000000F',
          colorBgMask: '#00000073',
        },
        components: {
          Typography: {
            titleMarginTop: 0,
            titleMarginBottom: 0,
          },
          Button: {
            borderRadius: 8,
            colorTextLightSolid: '#FFFFFF',
            paddingBlock: 0,
            paddingInline: 12,
          },
          Input: {
            borderRadius: 8,
          },
          Select: {
            borderRadius: 8,
            controlItemBgActive: '#F0F7FF',
            controlItemBgHover: '#0000000A',
          },
          Checkbox: {
            borderRadius: 6,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
