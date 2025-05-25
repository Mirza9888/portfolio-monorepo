import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthProviderWrapper from "@/components/auth-provider-wrapper";
import ThemeSidebar from "@/components/theme-sidebar";
import { Container } from "@mui/material";

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
            <Container maxWidth="lg">
              <ThemeSidebar />
              {children}
            </Container>
          </AuthProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
