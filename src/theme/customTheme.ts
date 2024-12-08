import type { ThemeConfig } from 'antd';

const color = {
  colorText: '#000000E0',
  colorTextDisabled: '#00000040',
  colorTextPlaceholder: '#00000040',
  colorTextTertiary: '#00000073',
  colorPrimary: '#4A7CFE',
  colorPrimaryHover: '#739FFF',
  colorPrimaryActive: '#345DD9',
  colorError: '#FF4D4F',
  colorBorder: '#E3E3E3',
  colorBorderSecondary: '#F0F0F0',
  colorBgContainer: '#FFFFFF',
  colorBgContainerDisabled: '#0000000A',
  colorBgTextHover: '#0000000F',
  colorBgMask: '#00000073',
  colorFillAlter: '#00000005',
  colorSplit: '#0000000F',
};

export const customTheme: Partial<ThemeConfig> = {
  token: {
    fontFamily: 'Pretendard',
    lineHeight: 22 / 14,
    lineHeightHeading5: 1.5,
    borderRadius: 8,
    borderRadiusSM: 6,
    borderRadiusLG: 10,
    ...color,
  },
  components: {
    Typography: {
      titleMarginTop: 0,
      titleMarginBottom: 0,
    },
    Button: {
      colorTextLightSolid: color.colorBgContainer,
      paddingBlock: 0,
      paddingInline: 12,
    },
    Input: {
      paddingInline: 12,
      paddingBlock: 5,
    },
    Form: {
      itemMarginBottom: 20,
    },
    Table: {
      headerBorderRadius: 0,
      headerBg: color.colorFillAlter,
      cellPaddingBlock: 13,
      cellPaddingInline: 8,
    },
    Dropdown: {
      borderRadiusSM: 10,
    },
    Select: {
      activeBorderColor: color.colorBorder,
      activeOutlineColor: 'none',
    },
  },
};
