//LoginForm.jsx
// May 21, 2022
// Author: Pranav

// Import all the form components LoginFormComponent.jsx
import {
  HeadingForForm,
  RightAlignedLink,
  ImageForForm,
} from "./components/LoginFormComponent.jsx";

import { useRef, useState } from "react";
import { LoadingButton } from "../../components/LoadingButton.jsx";
import { logInApi } from "../../services/authenticationService.js";
import { useAuth } from "../../providers/auth/AuthContext.js";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput.jsx";
import { EmailIcon, PasswordIcon } from "../../components/Icons.jsx";
import { validateEmail, validatePassword } from "../../utils/validators.js";
import { useToast } from "../../providers/toast/ToastProvider.js";

// Setup signinform function
function SignInForm() {
  const [isLoading, setisLoading] = useState(false);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const { addToast } = useToast();

  const auth = useAuth();
  let navigate = useNavigate();

  const login = () => {
    if (emailInput.current.validate() && passwordInput.current.validate()) {
      setisLoading(true);
      logInApi(emailInput.current.value, passwordInput.current.value)
        .then((res) => {
          if (res.success) {
            // Login Successful
            setisLoading(false);
            auth.login(res);
            navigate("/");
            addToast("Login Successful", "success");
          } else {
            addToast("Login Failed", "error");
          }
        })
        .catch((err) => {
          // Login Failed
          addToast(err, "error");
          setisLoading(false);
        });
    }
  };

  return (
    <div className="relative h-screen w-screen flex">
      <ImageForForm />
      <div className="flex-[1_0_0%] h-full w-full px-5">
        <div className="flex flex-col relative h-full justify-center items-center mx-auto w-80">
          <HeadingForForm headingText="Sign In" />

          <TextInput
            width="w-full"
            placeholder="Enter your email here"
            label="Email Address"
            type="email"
            ref={emailInput}
            id="email"
            icon={<EmailIcon />}
            validator={validateEmail}
          ></TextInput>

          <TextInput
            width="w-full"
            placeholder="Enter your password here"
            label="Password"
            type="password"
            id="password"
            ref={passwordInput}
            icon={<PasswordIcon />}
            validator={validatePassword}
          ></TextInput>

          <RightAlignedLink
            linkText="Forgot password?"
            onClick={() => {
              navigate("/forgotPassword");
            }}
          />

          <LoadingButton
            title={"Login"}
            width="w-full"
            isLoading={isLoading}
            loadingTitle="Logging in..."
            onClick={login}
          ></LoadingButton>
        </div>
      </div>
    </div>
  );
}

// Export the component
export { SignInForm };
