import { UserList } from './components/UserList';
import { ButtonMenu } from './components/ButtonMenu';
import { UserAttributeProvider } from './providers/UserAttributeProvider';

function App() {
  return (
    <div className="App">
      <UserAttributeProvider>
        <ButtonMenu />
        <UserList />
      </UserAttributeProvider>
    </div>
  );
}

export default App;
