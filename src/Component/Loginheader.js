import React, { useEffect, useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithPhoneNumber } from "firebase/auth";
import { auth, db, provider } from "../Firebase";
import Login from './Login';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';



export default function Loginheader() {

  const provider = new GoogleAuthProvider();
  const [logIn, setLogin] = useState(null);
  const [isLogin, setisLogin] = useState(false);
  const [displayLogin, setdisplayLogin] = useState(false);
  
  //log in or signup
  const[propsCondition , setCondition] = useState();
  function loginOrSignup(condition){
    setCondition(condition)
    setdisplayLogin(true);
  }
  //google log in
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setLogin(result.user.displayName)
        // setphoto(result.user.photoURL)
        setisLogin(true)


        localStorage.setItem("name", result.user.displayName);
        localStorage.setItem("isLogIn", true);
        // localStorage.setItem("profilePic", result.user.photoURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const fbLoging = () =>{

  //     auth().signInWithPopup(provider)
  //       .then((data) => 
  //         console.log(data))
  // }

  useEffect(() => {
    setLogin(localStorage.getItem('name'))
    // setphoto(localStorage.getItem('profilePic'))
    setisLogin(localStorage.getItem('isLogIn'))

  }, [])

  const logout = () => {
    // prompt("want to Log out ?")
    // if(alert("want to Log out ?")){
    // }
    if (!localStorage.getItem('playing')) {
      if (window.confirm('You want to log out?')) {

        setLogin(null)
        // setphoto(null)
        setisLogin(false)
        localStorage.clear();
      }

    }
    else {
      alert("Complete the current quiz")
    }

  }

  // const loginit = () =>{

  // }
  useEffect(() => {
    const cur = localStorage.getItem('isLogIn');

    if (cur != null) {

      setisLogin(localStorage.getItem('isLogIn'))
    }

  }, [displayLogin])



  return (
    <div>
      {displayLogin ? <Login loginOrSignup={propsCondition} display={(condition) => setdisplayLogin(condition)}></Login> :

        <div>

          {!isLogin ?
            <div className='header flexEnd'>
              <LoginSocialFacebook
              appId='1602860963522449'
              onResolve={(res)=>{
                {
                  setLogin(res.data.first_name)
                  // setphoto(result.user.photoURL)
                  setisLogin(true)
          
          
                  localStorage.setItem("name", res.data.first_name);
                  localStorage.setItem("isLogIn", true);
                }
                console.log(res.data.first_name)
              }}
              onReject={(error) =>{
                console.log(error)
              }}
              > 
                {/* <div className='googlelogo'>
                </div> */}
                <img className='fblogo'  src='https://www.facebook.com/images/fb_icon_325x325.png'></img>
                {/* <FacebookLoginButton></FacebookLoginButton> */}
                {/* <button>Fb</button> */}
              </LoginSocialFacebook>
              <div className='log_btn'>|</div>
              <button className='googlelogo' onClick={signInWithGoogle}><img className='logoGoogle' src='https://web.docsales.com/assets/google-login-logo-27bac350625745280a897ea2db51249fcad6aee35613fcc44c40dec2daed43ec.png'></img></button>
              <div className='log_btn'>|</div>
              <button className='log_btn' onClick={() => loginOrSignup('login')}>Login</button>
              <div className='log_btn'>|</div>
              <button className='log_btn' onClick={() => loginOrSignup('signup')}>Sign up</button>
            </div> : <>
              <div className='header flexEnd'>
                {/* <div className='logOut_btn'><img className='circlephoto' src={profilePhot} alt="profile"></img></div> */}
                <div className='logOut_btn' >{localStorage.getItem('name')}</div>
                <div className='logOut_btn'>|</div>
                <div className='logOut_btn' onClick={logout}>Log out</div>
              </div>
            </>}
        </div>
      }

    </div>
  )
}
