import {EditorProvider} from "@/components/context/EditorContext";
import {UserProvider} from "@/components/context/UserContext";
import {ThemeProvider} from "@/components/theme-provider";
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {getUser} from "../actions/users";
import {Toaster} from "@/components/ui/toaster";
import "../globals.css";
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
        <UserProvider user={user}>
          <EditorProvider user={user}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
              {children}
              <Toaster />
            </ThemeProvider>
          </EditorProvider>
        </UserProvider>
      </body>
    </html>
  );
}
