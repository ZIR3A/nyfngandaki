import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorComponent({ message, retry }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
      <p className="text-muted-foreground mb-6">{message}</p>
      {retry && <Button onClick={retry} variant="outline">Try Again</Button>}
    </div>
  );
}
