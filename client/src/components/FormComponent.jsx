//LoginFormComponent.jsx
// May 21, 2022
// Author: Pranav

// A simple inputbox box with variabe types and placeholder
function TextBox(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      id={props.id}
      className="px-2 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring-blue-400 focus:ring-1 w-full pr-10"
    />
  );
}

// A password input field with variable width and placeholder, with a right aligned icon
function PasswordInputWithIcon(props) {
  return (
    <div
      className={`relative flex ${props.width} flex-wrap items-stretch mb-3`}
    >
      <TextBox type="password" placeholder={props.placeholder} id={props.id} />
      <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
      </span>
    </div>
  );
}

// A text input box with variable width and placeholder, with a right aligned icon
function TextWithIcon(props) {
  return (
    <div
      className={`relative flex ${props.width} flex-wrap items-stretch mb-3`}
    >
      <TextBox type="text" placeholder={props.placeholder} id={props.id} />
      <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
          />
        </svg>
      </span>
    </div>
  );
}

// A simple button with hover and active effects with variable width and text
function Button(props) {
  return (
    <button
      className={`${props.width} bg-blue-600 text-white active:bg-blue-800 text-sm px-6 py-2 rounded shadow hover:shadow-lg hover:bg-blue-700 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
      type="button"
      onClick={props.onClick}
    >
      {props.buttonValue}
    </button>
  );
}

// A simple left aligned label with variable text
function Label(props) {
  return (
    <label
      className="block text-gray-700 text-sm font-normal mb-1 mt-2 mr-auto"
      htmlFor={props.labelFor}
    >
      {props.labelText}
    </label>
  );
}

// A simple heading for the form
function HeadingForForm(props) {
  return (
    <h3 className="text-4xl font-light leading-normal mt-0 mb-10 text-gray-700 text-center">
      {props.headingText}
    </h3>
  );
}

// A simple subheading for the form
function SubHeadingForForm(props) {
  return (
    <h6 className="text-base font-light leading-normal -mt-10 mb-10 text-gray-700 text-center">
      {props.subHeadingText}
    </h6>
  );
}

// A right aligned link
function RightAlignedLink(props) {
  return (
    <div
      className="block text-blue-600 text-sm font-normal mb-6 -mt-1 text-right ml-auto"
      onClick={props.onClick}
    >
      {props.linkText}
    </div>
  );
}

// A div with background image
function ImageForForm() {
  return (
    <div className="flex-[2_2_0%] relative h-full hidden sm:block lg:block bg-[url('/src/assets/images/loginImage.png')] bg-cover bg-center"></div>
  );
}

// Export all the components
export {
  PasswordInputWithIcon,
  TextWithIcon,
  TextBox,
  Button,
  Label,
  HeadingForForm,
  RightAlignedLink,
  SubHeadingForForm,
  ImageForForm,
};
