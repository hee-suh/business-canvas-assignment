import AntdConfigProvider from '@/providers/AntdConfigProvider';
import MemberList from '@/views/MemberList';

function App() {
  return (
    <AntdConfigProvider>
      <MemberList />
    </AntdConfigProvider>
  );
}

export default App;
