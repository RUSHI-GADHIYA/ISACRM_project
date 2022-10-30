import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login";
import { NotFound } from "../pages/misc/NotFound";
import ProtectedRoute from "./private/ProtectedRoute";
import DashboardPage from "../pages/dashboard";
import ForgotPasswordPage from "../pages/forgot-password";
import AddStudentPage from "../pages/add-student";
import StudentInformation from "../pages/student-information";
import { ROUTES } from "../config/constants";
import ResetPasswordPage from "../pages/reset-password";
import AddNotePage from "../pages/add-note";
import NoteDisplayPage from "../pages/notes/index";
import AdminProfile from "../pages/admin-user-profile/index";
import AddAdminUser from "../pages/add-admin-user";
import AdminPage from "../pages/admin-home/Index";
import EmailCampaignPage from "../pages/email-campaign/index";
import StudentDocsPage from "../pages/sutdent-docs";

// This is the router for the application
// All routes of the frontend are defined here
// If a route is not defined here, it will be redirected to the 404 page
// All the private routes are protected using the ProtectedRoute component
// The ProtectedRoute component will check if the user is logged in
// If the user is not logged in, it will redirect the user to the login page
// If the user is logged in, it will render the component

// All other routes are public routes [Login, Forgot Password, Reset Password]
export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.SIGN_IN} element={<LoginPage />} />

      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />

      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />

      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ADD_STUDENT}
        element={
          <ProtectedRoute>
            <AddStudentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ADD_NOTE}
        element={
          <ProtectedRoute>
            <AddNotePage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.STUDENT_NOTES}
        element={
          <ProtectedRoute>
            <NoteDisplayPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.STUDENT_PROFILE}
        element={
          <ProtectedRoute>
            <StudentInformation />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.STUDENT_DOCS}
        element={
          <ProtectedRoute>
            <StudentDocsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ADMIN}
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.VIEW_ADMIN}
        element={
          <ProtectedRoute>
            <AdminProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ADD_ADMIN}
        element={
          <ProtectedRoute>
            <AddAdminUser />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.EMAIL_CAMPAIGN}
        element={
          <ProtectedRoute>
            <EmailCampaignPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={"/docs"}
        element={
          // <ProtectedRoute>
          <StudentDocsPage />
          //{/* </ProtectedRoute> */}
        }
      />

      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};
