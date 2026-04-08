import { Navigate, Route, Routes } from "react-router-dom";
import { Shell } from "./components/Shell";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { CareerPage } from "./pages/CareerPage";
import { EducationPage } from "./pages/EducationPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  );
}
