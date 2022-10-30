//LoginFormComponent.jsx
// May 21, 2022
// Author: Pranav

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
    <div className="flex-[2_2_0%] relative h-full hidden xl:block bg-[url('/src/assets/images/loginImage.png')] bg-cover bg-center"></div>
  );
}

// Export all the components
export { HeadingForForm, RightAlignedLink, SubHeadingForForm, ImageForForm };
