import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./routes/homePage/HomePage";
import { ChatPage } from "./routes/chatPage/ChatPage";
import { DashboardPage } from "./routes/dashboardPage/DashboardPage";
import { RootLayout } from "./layouts/rootLayout/RootLayout";
import { DashboardLayout } from "./layouts/dashboardLayout/DashboardLayout";
import { SignInPage } from "./routes/signInPage/SignInPage";
import { SignUpPage } from "./routes/signUpPage/SignUpPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/dashboard/chats/:id", element: <ChatPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
