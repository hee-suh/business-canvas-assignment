import MemberListPage from '@/features/MemberList/MemberListPage';
import AntdConfigProvider from '@/providers/AntdConfigProvider';
import StyledThemeProvider from '@/providers/StyledThemeProvider';

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
