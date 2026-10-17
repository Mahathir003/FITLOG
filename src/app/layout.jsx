import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Healthycise — Fitness & Nutrition Platform",
  description:
    "Track your calories, plan your meals, and choose your workouts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-[#030816] text-white antialiased min-h-screen flex flex-col selection:bg-[#00A3FF] selection:text-white">
        <AuthProvider>
          <PlanProvider>
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <Toaster position="bottom-right" />
          </PlanProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
