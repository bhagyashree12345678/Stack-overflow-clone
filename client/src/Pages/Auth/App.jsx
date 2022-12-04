import { useState } from "react";


import { authentication } from './firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function App() {

    const countryCode = "+91";
    const [phoneNumber, setPhoneNumber] = useState(countryCode);
    const [expandForm, setExpandForm] = useState(false);
    const [OTP,setOTP] = useState('');

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.

            },

        }, authentication);
    }
    const requestOTP = (e) => {
        e.preventDefault();
        if (phoneNumber.length >= 12) {
            setExpandForm(true);
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
            .then(confirmationResult => {
              window.confirmationResult = confirmationResult;
            }).catch((error) => {
             console.log(error)

                })
        }
    }
    
    const varifyOTP = (e)=>{
        let otp = e.target.value;
        setOTP(otp);

        if(otp.length === 6){
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp).then((result)=>{
                const user = result.user;
            }).catch((error) =>{

            });
        }
    }
   


    return (
        <div className="auth-container-2">
            <form onSubmit={requestOTP} >
                <h1>Sign in with phone number</h1>
                <div >
                    <label htmlFor="phoneNumberInput" >
                        <h4>Phone Number</h4>
                    </label>
                    <input type="tel" id="phoneNumberInput" className="input-ph" aria-describedby="emailHelp" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }}/>
                    {/* <div id="phoneNumberHelp" className="form-text">Please enter your phone number</div> */}
                </div>
                {expandForm === true ?
                    <>
                        <div >
                            <label htmlFor="otpInput">
                                <h4>OTP</h4></label>
                            <input type="number" id="otpInput" className="input-ph" value={OTP} onChange={varifyOTP}/>
                            {/* <div id="otpHelp">Please enter your OTP here</div> */}
                        </div>


                    </>
                    :
                    null
                }
                {
                    expandForm === false ?
                        <button type="submit" className="btn-ph">Request OTP</button>
                        :
                        null
                }
                <div id="recaptcha-container"></div>
            </form>
        </div>

    );
}
export default App; 
