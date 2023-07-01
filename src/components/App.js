import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService, firebaseInstance } from "dbFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    firebaseInstance.onAuthStateChanged(authService, (user) => {
      (user) ? setUserObj(user) : setUserObj(null);
      setInit(true);
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : 'Initializing...'}
      <footer>&copy; {new Date().getFullYear()} MyTwitter</footer>
    </>
  )
}

export default App;
