import * as React from 'react'
import "components/styles/globals.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "../components/theme-provider";
import { UserProvider } from "../../contexts/user-context";
import {NavMenu} from 'components/components/nav-menu';
import {NavigationSheet} from 'components/components/navigation-sheet';
import Nav from 'components/components/nav';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <div className="min-h-screen">
          <nav className="h-16 bg-background border-b">
            <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-8">
                <NavMenu className="hidden md:block" />
              </div>
              <div className="flex items-center gap-3">
                <Nav />
                <div className="md:hidden">
                  <NavigationSheet />
                </div>
              </div>
            </div>
          </nav>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </UserProvider>
  );
}
