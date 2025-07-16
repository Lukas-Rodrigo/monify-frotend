import { api } from "@/lib/axios"
import { format } from "date-fns"

export interface ExpenseSummary {
  categoryName:         string
  totalCategoryExpense: number
  totalExpenseInPeriod: number
}

export async function getExpenseSummary(
  userId: number,
  from:   Date,
  to:     Date
): Promise<ExpenseSummary> {
  const fromParam = format(from, "yyyy-MM-dd")
  const toParam   = format(to,   "yyyy-MM-dd")

  const { data } = await api.get<ExpenseSummary>(
    `/v1/finance/expense/summary-period/${userId}`,
    { params: { from: fromParam, to: toParam } }
  )
  return data
}
