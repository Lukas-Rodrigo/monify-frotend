import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";

export function TableOrdersRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        12312fsakjldhfklas
      </TableCell>
      <TableCell className="text-muted-foreground">Há 15 minutos</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Lucas Rodrigo Sacramento</TableCell>
      <TableCell className="font-medium">R$ 149,00</TableCell>
      <TableCell>
        <Button variant="outline">
          Aprovar
          <ArrowRight className="mr-2 h-3 w-3" />
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost">
          Cancelar
          <X className="mr-2 h-3 w-3" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
