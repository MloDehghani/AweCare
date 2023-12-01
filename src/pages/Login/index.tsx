import Button from "../../Acord/Button";
import TextField from "../../Acord/TextField";
import { jwtDecode } from "jwt-decode";
// import "./login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import Auth from "../../Api/Auth";
import { storeTokenInLocalStorage } from "../../Storage/Token";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useCallback, useEffect, useState } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email").required("Required"),
  password: Yup.string()
    .required("Please enter a password")
    // check minimum characters
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must contain 8 characters including uppercase, lowercase, number and special case character"
    ),
});
const initialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [loginWidth, setLoginWidth] = useState<number>(200);
  const handleResize = useCallback(() => {
    if (document.getElementById("authButton")) {
      setTimeout(() => {
        const width: number = document.getElementById("authButton")
          ?.offsetWidth as number;
        setLoginWidth(width)  
      }, 200);
    }
  }, []);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, false);
  }, []);  

  const submitDisabled = Object.keys(formik.errors).length > 0 || !formik.dirty;
  const navigate = useNavigate();  
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <section className={styles.section} style={{width:window.innerWidth < 450?window.innerWidth: '450px'}}>
        <h1 className={styles.title}>Welcome Back!</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.userName}>
            <TextField
              autoComplete="off"
              label="Your Email"
              name="email"
              placeholder="Enter your Email..."
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              inValid={(formik.touched.email && formik.errors.email)!}
              errorMessage={formik.errors.email}
            />
          </div>
          <div className={styles.password}>
            <TextField
              autoComplete="off"
              label="Password"
              name="password"
              placeholder="Enter your Password..."
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              inValid={(formik.touched.password && formik.errors.password)!}
              errorMessage={formik.errors.password}
            />
          </div>
  
          <p className={styles.forget}>Forgot Password?</p>
  
          <div id="authButton" className={styles.button}>
            <Button onClick={() => {
              Auth.login({
                email:formik.values.email,
                password: formik.values.password,
              },(res) => {
                if (res.data.access_token) {
                  storeTokenInLocalStorage(res.data.access_token)
                  navigate("/");
                }else{
                  toast.error(res.data)
                }
              })
            }} disabled={submitDisabled} type="submit">
              Sign in
            </Button>
          </div>
        </form>
        <div className={styles.spacer}>
          {/* left line */}
          <div></div>
          {/* or text */}
          <div>or</div> {/* right line */}
          <div></div>
        </div>
        {/* <div className={styles["google-button"]}>
          <Button theme="AweCare-GoogleButton">
            <div className={styles["google-container"]}>
              <img
                alt="Google sign-in"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              />
              <span> Continue with Google</span>
            </div>
          </Button>
        </div> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleOAuthProvider clientId="750278697489-u68emmire3d35234obo1mne9v0eobmsu.apps.googleusercontent.com">
            <GoogleLogin
              text="continue_with"
              shape="square"
              width={
                loginWidth+ "px"
              }
              theme="outline"
              onSuccess={(credentialResponse) => {
                const prof: unknown = jwtDecode(
                  credentialResponse.credential
                    ? credentialResponse?.credential
                    : ""
                );

                Auth.login(
                  {
                    google_json: prof,
                  },
                  (res) => {
                    if (res.data.access_token) {
                      setTimeout(() => {
                        // localStorage.setItem("accessToken", res.access_token);
                        storeTokenInLocalStorage(res.data.access_token)
                        navigate("/");                          
                      }, 200);
                    }
                    if(res.data.has_rated ==false){
                      localStorage.setItem("has_rated","true")
                    }
                  }
                );
              }}
              onError={() => {
                // console.log("Login Failed");
                toast.error('Login Failed"')
              }}
            />
          </GoogleOAuthProvider>
        </div>        
        <div className={styles.account}>
          Don't have an account? <a onClick={() => {
            navigate('/register')
          }}>Sign up</a>
        </div>
      </section>
    </div>
  );
};

export default Login;
