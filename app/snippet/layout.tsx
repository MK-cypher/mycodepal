import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "../globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {UserProvider} from "@/components/context/UserContext";
import {getUser} from "../actions/users";
import {Toaster} from "@/components/ui/toaster";
import Navbar from "@/components/Navbar/Navbar";
import {SnippetProvider} from "@/components/context/SnippetContext";
import {metaData} from "@/lib/metadataConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = metaData;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <UserProvider user={user}>
            <SnippetProvider>
              <Navbar user={user} />
              <main className="mt-24">{children}</main>
            </SnippetProvider>
          </UserProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
