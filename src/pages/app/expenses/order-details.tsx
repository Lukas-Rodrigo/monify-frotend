import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@/components/ui/table";

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Pedido: <span className="font-mono">12312fsakjldhfklas</span>
        </DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      <Table>
        <TableRow>
          <TableCell>Status</TableCell>
          <TableCell className="flex justify-end">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              <span className="font-medium text-muted-foreground">
                Pendente
              </span>
            </div>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Cliente</TableCell>
          <TableCell className="flex justify-end">
            Lucas Rodrigo Sacramento
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Telefone</TableCell>
          <TableCell className="flex justify-end">(75)982335006</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>E-mail</TableCell>
          <TableCell className="flex justify-end">
            Lucasrodrigo507@gmail.com
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Realizado há</TableCell>
          <TableCell className="flex justify-end">há 3 minutos</TableCell>
        </TableRow>
      </Table>

      <Table>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead className="text-right">Qtd.</TableHead>
          <TableHead className="text-right">Preço</TableHead>
          <TableHead className="text-right">Subtotal</TableHead>
        </TableRow>

        <TableBody>
          <TableRow className="">
            <TableCell>Pizza Pepperoni Familía</TableCell>
            <TableCell className="text-right">2</TableCell>
            <TableCell className="text-right">R$ 69,90</TableCell>
            <TableCell className="text-right">R$ 139,80</TableCell>
          </TableRow>
          <TableRow className="">
            <TableCell>Pizza Mussarela Familía</TableCell>
            <TableCell className="text-right">2</TableCell>
            <TableCell className="text-right">R$ 59,90</TableCell>
            <TableCell className="text-right">R$ 159,60</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total do pedido</TableCell>
            <TableCell className="text-right font-medium">R$ 259,60</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </DialogContent>
  );
}
