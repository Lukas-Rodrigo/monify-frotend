import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function MouthCanceledOrdersAmount() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold"></CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tighter">32</span>
        <p className="text-sm text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">-2%</span>{" "}
          Relação ao mês passado
        </p>
      </CardContent>
    </Card>
  );
}
