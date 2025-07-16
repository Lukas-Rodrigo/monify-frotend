
import { Expense, getExpensesInPeriod } from "@/api/get-expenses-in-period";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useCategoryColors } from "@/hooks/use-category-colors";
import { capitalizeFirstLetter, formatCurrencyBR, formatDateBR } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { DateRange } from "react-day-picker";

interface ExpenseTableProps{
 dateRange: DateRange;
  onDateChange: (dr: DateRange) => void;
}

export function ExpenseTable({dateRange}: ExpenseTableProps) {

    const userId = 11;
  
    const fromParam = format(dateRange.from!, "yyyy-MM-dd");
    const toParam   = format(dateRange.to!,   "yyyy-MM-dd");

  const { 
    data: expenses = [],
    isLoading, 
    error 
  } = useQuery<Expense[], Error>({
    queryKey: ['expenses', userId, fromParam, toParam],
     queryFn:   () => getExpensesInPeriod(userId, dateRange.from!, dateRange.to!),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

const categoryNames = Array.from(new Set(expenses.map((e) => e.category.name))).sort();
const categoryColorMap = useCategoryColors(categoryNames);

  return (
    <div className="relative max-h-[600px] overflow-y-auto 
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 
                            rounded-xl">
      <Table className="border-none divide-y-0 w-full border-collapse">
        <TableHeader className="border-none sticky top-0 z-10 bg-muted/50">
          <TableRow className="border-none">
            <TableHead className="w-[150px] bg-muted/50 border-none">Data</TableHead>
            <TableHead className="bg-muted/50 border-none w-[500px]">Descricao</TableHead>
            <TableHead className="bg-muted/50 border-none w-[250px]">Categoria</TableHead>
            <TableHead className="bg-muted/50 text-right border-none">Total</TableHead>
            <TableHead className="bg-muted/50 text-center border-none">Editar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-none divide-y-0">
          {expenses.map((expense) => {
            const color = categoryColorMap.get(expense.category.name) || "#e5e7eb";

            return (
              <TableRow key={expense.id} className="border-none">
                <TableCell className="font-medium border-none">
                  {formatDateBR(expense.createdAt)}
                </TableCell>
                <TableCell className="border-none font-medium">{capitalizeFirstLetter(expense.description)}</TableCell>
                <TableCell >
                  <span style={{backgroundColor: color}} className={` px-2 py-1  rounded-lg font-medium`}>
                    {capitalizeFirstLetter(expense.category.name)}
                  </span>
                </TableCell>
                <TableCell className="text-right border-none">
                  {formatCurrencyBR(expense.amount)}
                </TableCell>
                  <TableCell className="text-right border-none">
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-7 rounded-lg px-3 py-4" size="sm">
                      <Pencil/>
                    </Button>
                    <Button className="h-7 rounded-lg px-3 py-4" size="sm">
                      <Trash2/>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

