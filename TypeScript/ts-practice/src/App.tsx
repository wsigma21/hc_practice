import { UserList } from './components/UserList';
import { ButtonMenu } from './components/ButtonMenu';
import { UserAttributeProvider } from './providers/UserAttributeProvider';
import { AllUserProvider } from './providers/AllUserProvider';

function App() {
  return (
    <div className="App">
      <UserAttributeProvider>
        <AllUserProvider>
          <ButtonMenu />
          <UserList />
        </AllUserProvider>
      </UserAttributeProvider>
    </div>
  );
}

export default App;
