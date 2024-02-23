import { UserList } from './components/UserList';
import { Menu } from './components/Menu';
import { UserAttributeProvider } from './providers/UserAttributeProvider';
import { AllUserProvider } from './providers/AllUserProvider';

function App() {
  return (
    <div className="App">
      <UserAttributeProvider>
        <AllUserProvider>
          <Menu />
          <UserList />
        </AllUserProvider>
      </UserAttributeProvider>
    </div>
  );
}

export default App;
