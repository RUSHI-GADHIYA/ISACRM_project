import "@fontsource/nunito";
import { Router } from "./navigation/Router";
import { BrowserRouter } from "react-router-dom";
import { ProvideAuth } from "./navigation/private/ProvideAuth";
import ToastProvider from "./providers/toast/ToastProvider";
import ParentViewWithSideBar from "./navigation/ParentViewWithSideBar";

// This is the root of the application
// It is responsible for rendering the entire application
// It is also responsible for handling the routing
// <ProvideAuth> provides the authentication context to all components
// <ToastProvider> provides the toast context to all components
// <BrowserRouter> provides the routing context to all components
// <ParentViewWithSideBar> provides the sidebar and navbar views to all child components
// <Router> renders the routes defined in the navigation/Router.js file

function App() {
  return (
    <>
      <div className="App">
        <ProvideAuth>
          <ToastProvider>
            <BrowserRouter>
              <ParentViewWithSideBar>
                <Router />
              </ParentViewWithSideBar>
            </BrowserRouter>
          </ToastProvider>
        </ProvideAuth>
      </div>
    </>
  );
}

export default App;
