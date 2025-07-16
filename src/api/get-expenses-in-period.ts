import { api } from "@/lib/axios"
import { format } from "date-fns"

export interface Expense {
  id: number
  description: string,
  amount: number,
  createdAt: string
  category: Category
}

export interface Category {
  id: number,
  name: string,
}

export async function getExpensesInPeriod(
  userId: number,
  from:   Date,
  to:     Date
): Promise<Expense[]> {
  const fromParam = format(from, "yyyy-MM-dd")
  const toParam   = format(to,   "yyyy-MM-dd")

  const { data } = await api.get<Expense[]>(
    `/v1/finance/expense/expenses-period/${userId}`,
    { params: { from: fromParam, to: toParam } }
  )
  return data
}

