

import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import AuthProviderWrapper from "@/components/auth-provider-wrapper";

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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProviderWrapper>{children}</AuthProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
