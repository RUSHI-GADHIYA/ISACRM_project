import {
  HeadingForForm,
  RightAlignedLink,
  SubHeadingForForm,
  ImageForForm,
} from "../../components/FormComponent.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingButton } from "../../components/LoadingButton.jsx";
import { useEffect, useRef, useState } from "react";
import TextInput from "../../components/TextInput.jsx";
import { PasswordIcon } from "../../components/Icons.jsx";
import { validateCode, validatePassword } from "../../utils/validators.js";
import { resetPasswordApi } from "../../services/authenticationService.js";
import { useToast } from "../../providers/toast/ToastProvider.js";
import { ROUTES } from "../../config/constants.js";

// Component for forgot password page form
function ResetPasswordForm(props) {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const location = useLocation();

  const [isLoading, setisLoading] = useState(false);
  const codeInput = useRef(null);
  const newPasswordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  useEffect(() => {
    if (!location.state) {
      navigate(ROUTES.SIGN_IN);
    }
  }, [location, navigate]);

  const sendResetPasswordRequest = () => {
    if (
      newPasswordInput.current.validate() &&
      confirmPasswordInput.current.validate()
    ) {
      if (
        newPasswordInput.current.value !== confirmPasswordInput.current.value
      ) {
        addToast("Passwords do not match", "error");
        return;
      }
    }

    if (
      codeInput.current.validate() &&
      newPasswordInput.current.validate() &&
      confirmPasswordInput.current.validate()
    ) {
      setisLoading(true);
      resetPasswordApi(
        location.state,
        codeInput.current.value,
        newPasswordInput.current.value
      )
        .then((res) => {
          if (res.success) {
            navigate("/");
            addToast("Password Reset Successful", "success");
          } else {
            addToast("Password Reset Failed", "error");
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
        {/*Main Image in the page*/}
        <div className="flex flex-col relative h-full justify-center items-center mx-auto w-80">
          {/*Form Heading*/}
          <HeadingForForm headingText="Reset Password?" />
          {/*Form Sub Heading*/}
          <SubHeadingForForm
            subHeadingText={[
              "Please enter the code we sent you here",
              <br />,
              "Enter your new passwords here.",
            ]}
          />

          <TextInput
            width="w-full"
            placeholder="Enter your code here"
            label="Verification Code"
            type="number"
            ref={codeInput}
            id="code"
            validator={validateCode}
          ></TextInput>

          <TextInput
            width="w-full"
            placeholder="Enter your email here"
            label="New Password"
            type="password"
            ref={newPasswordInput}
            id="newPassword"
            icon={<PasswordIcon />}
            validator={validatePassword}
          ></TextInput>

          <TextInput
            width="w-full"
            placeholder="Enter your email here"
            label="Confirm Password"
            type="password"
            ref={confirmPasswordInput}
            id="confirmPassword"
            icon={<PasswordIcon />}
            validator={validatePassword}
          ></TextInput>

          <RightAlignedLink
            linkText="Go back to login?"
            onClick={() => {
              navigate("/login");
            }}
          />
          {/*Use the onSubmit property while using the forgot password form component to add functionality on the button click*/}
          <LoadingButton
            title={"Recover Password"}
            width="w-full"
            isLoading={isLoading}
            loadingTitle="Loading..."
            onClick={sendResetPasswordRequest}
          ></LoadingButton>
        </div>
      </div>
    </div>
  );
}

export { ResetPasswordForm };
