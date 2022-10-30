import {
  HeadingForForm,
  RightAlignedLink,
  SubHeadingForForm,
  ImageForForm,
} from "../../components/FormComponent.jsx";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "../../components/LoadingButton.jsx";
import { useRef, useState } from "react";
import TextInput from "../../components/TextInput.jsx";
import { EmailIcon } from "../../components/Icons.jsx";
import { validateEmail } from "../../utils/validators.js";
import { forgotPasswordApi } from "../../services/authenticationService.js";
import { useToast } from "../../providers/toast/ToastProvider.js";
import { ROUTES } from "../../config/constants.js";

// Component for forgot password page form
function ForgotPasswordForm(props) {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [isLoading, setisLoading] = useState(false);
  const emailInput = useRef(null);

  const sendForgotPasswordRequest = () => {
    if (emailInput.current.validate()) {
      setisLoading(true);
      forgotPasswordApi(emailInput.current.value)
        .then((res) => {
          if (res.success) {
            navigate(ROUTES.RESET_PASSWORD, {
              state: emailInput.current.value,
            });
            addToast("Code sent sucessfully!", "success");
          } else {
            addToast("Code sent failed", "error");
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
          <HeadingForForm headingText="Forgot Password?" />
          {/*Form Sub Heading*/}
          <SubHeadingForForm
            subHeadingText={[
              "Please enter your email here",
              <br />,
              "We will send you instruction to reset password.",
            ]}
          />

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
            loadingTitle="Sending email..."
            onClick={sendForgotPasswordRequest}
          ></LoadingButton>
        </div>
      </div>
    </div>
  );
}

export { ForgotPasswordForm };
