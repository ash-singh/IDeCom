import { useRef, useState } from 'react';
import { IDeCom_backend } from 'declarations/IDeCom_backend';
import { ProductsPage } from './ProductsPage';

function App() {
  const [user, setUser] = useState('');
  const inputRef = useRef(null);

  function handleLogin(event) {
    const username = inputRef.current.value;

    IDeCom_backend.login(username).then((user) => {
      setUser(user.username);
    });
    return false;
  }

  function handleLogout() {
    setUser('');
  }

  return (
    <main>
      { user == '' && (
        <form action="#" className='App'>
          <br></br>
          <label htmlFor="username">Enter your username: &nbsp;</label>
          <input id="username" alt="username" type="text" ref={inputRef}/>
          <button type="button" onClick={handleLogin}>Login!</button>
        </form>
      )}

      { user != '' && (
        <div className='App'> 
          <br></br>
          <span> Welcome {user} </span>
          <button type="button" onClick={handleLogout}>Logout!</button>
        </div>
      )}

      <div className="App">
        <ProductsPage/>
      </div>

    </main>
  );
}

export default App;
