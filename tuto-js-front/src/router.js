import { Navigate, useRoutes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CoursePage from "./pages/CoursePage";
import LoginPage from "./pages/LoginPage";
import SectionPage from "./pages/SectionPage";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import TopicPage from "./pages/TopicPage";
import TutorPage from "./pages/TutorPage";
import TutorshipPage from "./pages/TutorshipPage";

export const AppRouter = () => {
  return useRoutes([
    {
      path: "/",
      //element: <LoginTheme />,
      children: [
        { path: "/", element: <Navigate to="/login" /> },
        { path: "login", element: <LoginPage /> },
      ],
    },
    {
      path: "/tuto/",
      element: <Layout />,
      children: [
        { path: "course", element: <CoursePage /> },
        { path: "teacher", element: <TeacherPage /> },
        { path: "student", element: <StudentPage /> },
        { path: "section", element: <SectionPage /> },
        { path: "tutor", element: <TutorPage /> },
        { path: "tutorship", element: <TutorshipPage /> },
        { path: "topic", element: <TopicPage /> },
      ],
    },
  ]);
};
