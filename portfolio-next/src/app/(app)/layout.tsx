import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthProviderWrapper from "@/components/auth-provider-wrapper";
import ThemeSidebar from "@/components/theme-sidebar";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio - Mirza Redzic",
  icons: {
    icon: "/icons/ikona.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProviderWrapper>
            {children}
            <ThemeSidebar />
          </AuthProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
