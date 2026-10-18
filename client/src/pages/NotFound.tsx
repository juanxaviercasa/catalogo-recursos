import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/catalogo-recursos")) {
      window.location.href = "/catalogo-recursos/";
    } else {
      setLocation("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f4f0e7]">
      <Card className="w-full max-w-lg mx-4 shadow-lg border border-[#d8d0c1] bg-[#fffdf8]">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[#e6eddf] rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-[#61765b]" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-[#18242e] mb-2 font-serif">404</h1>

          <h2 className="text-xl font-semibold text-[#36413d] mb-4">
            Página No Encontrada
          </h2>

          <p className="text-[#5e665f] mb-8 leading-relaxed text-sm">
            El recurso o la página que buscas no existe o ha sido movida.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-[#61765b] hover:bg-[#4d6349] text-[#fffdf8] px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              <Home className="w-4 h-4 mr-2" />
              Ir al Catálogo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
