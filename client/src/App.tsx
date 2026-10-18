/**
 * Archivo editorial: navegación deliberadamente simple para que el listado sea el protagonista.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function getBase() {
  if (typeof window === "undefined") return "";
  const pathname = window.location.pathname;
  if (pathname.startsWith("/catalogo-recursos")) {
    return "/catalogo-recursos";
  }
  return "";
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/catalogo-recursos" component={Home} />
      <Route path="/catalogo-recursos/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const base = getBase();
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <WouterRouter base={base}>
            <Router />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
