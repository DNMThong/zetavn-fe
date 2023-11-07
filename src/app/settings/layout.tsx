import "@/assets/scss/core.scss";
import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import { Providers } from "@/redux/provider";
import { MobileNavbar, Navbar } from "@/components/navbar";
import { PageLoader } from "@/components/pageloader";
import { ChatWrapper } from "@/components/chat";
import { ExplorerMenu } from "@/components/explorer-menu";
import { PrivateRoute } from "../../components/route";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
   title: "Zetavn",
   description: "Generated by create next app",
   viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
   icons: {
      icon: "favicon.png",
   },
};

const roboto = Roboto({
   weight: ["400", "500"],
   subsets: ["latin"],
});

const montserrat = Montserrat({
   weight: ["600", "700", "800", "900"],
   subsets: ["latin"],
});

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <head>
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <link
               href="https://cdn.jsdelivr.net/npm/fontisto@v3.0.4/css/fontisto/fontisto-brands.min.css"
               rel="stylesheet"
            />
            <link
               href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/7.2.96/css/materialdesignicons.min.css"
               rel="stylesheet"
            ></link>
         </head>
         <body className={`${roboto.className}`}>
            <Providers>
               <PrivateRoute>
                  <div className="app-overlay"></div>
                  <Navbar />
                  <MobileNavbar />
                  <div className="view-wrapper is-full">{children}</div>
                  <ChatWrapper />
                  <ExplorerMenu />
               </PrivateRoute>
            </Providers>
         </body>
      </html>
   );
}
