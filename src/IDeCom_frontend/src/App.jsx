import { useRef, useState, useEffect } from 'react';
import { IDeCom_backend } from 'declarations/IDeCom_backend';
import { ProductsPage } from './ProductsPage';
import { SellerPage } from './SellerPage';

function App() {
  const [username, setUsername] = useState('');
  const [sellerToggle, setSellerToggle] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username != '') {
      setUsername(username);
    }
  }, []);

  function handleLogin(event) {
    const username = inputRef.current.value;

    IDeCom_backend.login(username).then((user) => {
      setUsername(user.username);
      localStorage.setItem('username', user.username);
    });
    return false;
  }

  function handleLogout() {
    setUsername('');
    localStorage.removeItem('username');
  }

  const handleToggleChange = () => {
    setSellerToggle(!sellerToggle);
  };

  return (
    <main>
      { username == '' && (
        <form action="#" className='App'>
          <br></br>
          <label htmlFor="username">Enter your username: &nbsp;</label>
          <input id="username" alt="username" type="text" ref={inputRef}/>
          <button type="button" onClick={handleLogin}>Login!</button>
        </form>
      )}

      { username != '' && (
        <div className='App'> 
          <br></br>
          <span> Welcome {username} </span>
          <button type="button" onClick={handleLogout}>Logout!</button>
        </div>
      )}

    <div>
      <button onClick={handleToggleChange}>
        {sellerToggle ? 'Seller' : 'Buyer'}
      </button>
    </div>

    {sellerToggle && (
      <SellerPage/>
    )}

    {!sellerToggle && (
      <div className="App">
        <h1> Products</h1>
        <ProductsPage/>
      </div>
    )}

    </main>
  );
}

export default App;
