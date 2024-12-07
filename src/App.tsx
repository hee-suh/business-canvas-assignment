import AntdConfigProvider from '@/providers/AntdConfigProvider';
import StyledThemeProvider from '@/providers/StyledThemeProvider';
import MemberList from '@/views/MemberList';

function App() {
  return (
    <AntdConfigProvider>
      <StyledThemeProvider>
        <MemberList />
      </StyledThemeProvider>
    </AntdConfigProvider>
  );
}

export default App;
