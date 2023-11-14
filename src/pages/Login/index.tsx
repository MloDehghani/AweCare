import Button from "../../Acord/Button";
import TextField from "../../Acord/TextField";
// import "./login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import Auth from "../../Api/Auth";
import { storeTokenInLocalStorage } from "../../Storage/Token";
import { useNavigate } from "react-router-dom";

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
  const submitDisabled = Object.keys(formik.errors).length > 0 || !formik.dirty;
  const navigate = useNavigate();  
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Welcome Back!</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.email}>
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

        <div className={styles.button}>
          <Button onClick={() => {
            Auth.login({
              email:formik.values.email,
              password: formik.values.password,
            },(res) => {
              if (res.data.access_token) {
                storeTokenInLocalStorage(res.data.access_token)
                navigate("/");
              }
            })
          }} disabled={submitDisabled} type="submit">
            login
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
      <div className={styles["google-button"]}>
        <Button theme="AweCare-GoogleButton">
          <div className={styles["google-container"]}>
            <img
              alt="Google sign-in"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            <span> Continue with Google</span>
          </div>
        </Button>
      </div>
      <div className={styles.account}>
        Don't have an account? <a onClick={() => {
          navigate('/register')
        }}>Sign up</a>
      </div>
    </section>
  );
};

export default Login;
