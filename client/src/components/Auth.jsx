// import React, { useState } from 'react';
// import Cookies from 'universal-cookie';
// import axios from 'axios';

// import signinImage from '../assets/signup.jpg';

// const cookies = new Cookies();

// const initialState = {
//     fullName: '',
//     username: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//     avatarURL: '',
// }

// const Auth = () => {
//   const [isSignUp, setIsSignUp] = useState(true);
//   const [form, setForm] = useState(initialState)


// //form is a object we want to chage only one field so we spread all the fields and change the name field
//     const handleChange =  (e) => {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }

//     const handleSubmit = async(e)=>{
//       //prevent reloading
//       e.preventDefault();
//       // get all data from form 
//       const { username, password, phoneNumber, avatarURL } = form
//       //get url
//       const URL = 'http://localhost:5000/auth'

//     //make request to backend
//       const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignUp ? 'signUp' : 'login'}`, {
//         username, password, fullName: form.fullName, phoneNumber, avatarURL,
//     });

//     //get data from backend and restore it in cookies
//       cookies.set('token', token)
//       cookies.set('username', username)
//       cookies.set('fullName', fullName)
//       cookies.set('userId', userId)

//       if(isSignUp){
//         cookies.set('phoneNumber', phoneNumber);
//         cookies.set('avatarURL', avatarURL);
//         cookies.set('userId', userId);
//         cookies.set('hashedPassword', hashedPassword);
//         }

//         //reload app -> auth token reload and we wentr to chat app
//         window.location.reload();


//     }

//     // to switch b/w signin and up 
//     const switchMode = ()=>{
//       setIsSignUp((prevIsSignUp) => !prevIsSignUp)
//     }

//   return (
//     <div className='auth__form-container'>
//       <div className="auth__form-container_fields">
//         <div className="auth__form-container_fields-content">
//           <p>{isSignUp ? "Sign Up" : 'Sign In'}</p>
//           <form onSubmit={handleSubmit}>
//             {isSignUp && (
//               <div className="auth__form-container_fields-content_input">
//                 <label htmlFor="fullName">Full Name</label>
//                 <input 
//                 type="text"
//                 placeholder='Full Name'
//                 name='fullName'
//                 onChange={handleChange}
//                 required
//                 />
//               </div>
//             )}
//             <div className="auth__form-container_fields-content_input">
//                 <label htmlFor="fullName">Username</label>
//                 <input 
//                 type="text"
//                 placeholder='Username'
//                 name='username'
//                 onChange={handleChange}
//                 required
//                 />
//               </div>
//               {isSignUp &&(
//                 <div className="auth__form-container_fields-content_input">
//                   <label htmlFor="fullName">Phone Number</label>
//                   <input 
//                   type="text"
//                   placeholder='Phone Number'
//                   name='phoneNumber'
//                   onChange={handleChange}
//                   required
//                   />
//               </div>
//               )}
//               {isSignUp &&(
//                 <div className="auth__form-container_fields-content_input">
//                   <label htmlFor="fullName">Avatar URL</label>
//                   <input 
//                   type="text"
//                   placeholder='Avatar URL'
//                   name='avatarURL'
//                   onChange={handleChange}
//                   required
//                   />
//               </div>
//               )}
//               <div className="auth__form-container_fields-content_input">
//                   <label htmlFor="fullName">Password</label>
//                   <input 
//                   type="password"
//                   placeholder='password'
//                   name='password'
//                   onChange={handleChange}
//                   required
//                   />
//               </div>
//               {isSignUp && (
//               <div className="auth__form-container_fields-content_input">
//                   <label htmlFor="confirmPassword">Confirm Password</label>
//                   <input 
//                        name="confirmPassword" 
//                        type="password"
//                        placeholder="Confirm Password"
//                        onChange={handleChange}
//                        required
//                   />
//                </div>
//                )}
//                <div className="auth__form-container_fields-content_button">
//                   <button>{isSignUp ? "Sign Up" : "Sign In"}</button>
//                 </div>
//           </form>

//           <div className="auth__form-container_fields-content_button">
//           <p>
//           {isSignUp? "Already have an account?" : "Don't have an account?"}
//                 <span onClick={switchMode}>
//                   {isSignUp ? 'Sign In' : 'Sign Up'}
//                 </span>
//           </p>
//           </div>_
//         </div>
//       </div>
//       <div className="auth__form-container_image">
//           <img src={signinImage} alt="sign in" />
//       </div>
//     </div>
//   )
// }

// export default Auth



import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';
import front1 from '../assets/front1.jpg'

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL } = form;
        console.log(form)

        // const URL = 'http://localhost:5000/auth';
        const URL = 'https://chatforlife.herokuapp.com/auth'

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input 
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Already have an account?" 
                             : "Don't have an account?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Sign In' : 'Sign Up'}
                             </span>
                        </p>
                    </div>
                </div> 
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth