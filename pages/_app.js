import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "@/components/Layout";
import CssBaseline from "@mui/material/CssBaseline";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import { ThemeCtxProvider, useThemeMode } from "@/contexts/ThemeContext";
import { light, dark } from "@/contexts/theme";
import { useMemo } from "react";

function ColorThemeProvider({ children }) {
  const { darkMode } = useThemeMode();
  let theme = useMemo(() => {
    if (darkMode === undefined) {
      return createTheme(dark);
    }
    return createTheme(darkMode ? dark : light);
  }, [darkMode]);
  return (<ThemeProvider theme={theme}>
    <CssBaseline enableColorScheme />
    {children}
    </ThemeProvider>);
}


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <Layout key={router.asPath} {...pageProps}>
        {page}
      </Layout>
    ));

  return (
    <>
      <UserProvider>
        <ThemeCtxProvider>
          <ColorThemeProvider>
          {getLayout(<Component {...pageProps} />)}
        </ColorThemeProvider>
        </ThemeCtxProvider>
      </UserProvider>
    </>
  );
}
