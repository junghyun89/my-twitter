import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService, firebaseInstance } from "dbFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    firebaseInstance.onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : 'Initializing...'}
      <footer>&copy; {new Date().getFullYear()} MyTwitter</footer>
    </>
  )
}

export default App;
