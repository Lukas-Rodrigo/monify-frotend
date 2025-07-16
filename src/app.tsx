import { QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
import "./index.css";
import { queryCliente } from "./lib/react-query";
import { router } from "./routes";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="pizza.shop">
        <Helmet titleTemplate="%s | pizza.shop" />
        <Toaster richColors />
        <QueryClientProvider client={queryCliente}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
