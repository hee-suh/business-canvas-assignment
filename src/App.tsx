import AntdConfigProvider from '@/providers/AntdConfigProvider';
import StyledThemeProvider from '@/providers/StyledThemeProvider';
import MemberListPage from '@/features/MemberList/MemberListPage';

function App() {
  return (
    <AntdConfigProvider>
      <StyledThemeProvider>
        <MemberListPage />
      </StyledThemeProvider>
    </AntdConfigProvider>
  );
}

export default App;
