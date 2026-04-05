import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ExamTips } from "./pages/ExamTips";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Notes } from "./pages/Notes";
import { PastQuestions } from "./pages/PastQuestions";
import { Resources } from "./pages/Resources";
import { SearchResults } from "./pages/SearchResults";
import { Syllabus } from "./pages/Syllabus";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const notesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notes",
  component: Notes,
});
const pastQuestionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/past-questions",
  component: PastQuestions,
});
const syllabusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/syllabus",
  component: Syllabus,
});
const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resources/$type",
  component: Resources,
});
const examTipsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exam-tips",
  component: ExamTips,
});
const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchResults,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Login,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboard,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  notesRoute,
  pastQuestionsRoute,
  syllabusRoute,
  resourcesRoute,
  examTipsRoute,
  searchRoute,
  aboutRoute,
  loginRoute,
  registerRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
