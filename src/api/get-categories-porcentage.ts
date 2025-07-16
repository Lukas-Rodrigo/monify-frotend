import { api } from "@/lib/axios"
import { format } from "date-fns"

export interface CategoryPercentage {
  categoryName: string
  percentage: number
}

export async function getCategoriesPercentage(
  userId: number,
  from:   Date,
  to:     Date
): Promise<CategoryPercentage[]> {
  const fromParam = format(from, "yyyy-MM-dd")
  const toParam   = format(to,   "yyyy-MM-dd")

  const { data } = await api.get<CategoryPercentage[]>(
    `/v1/finance/expense/categories-percentages/${userId}`,
    { params: { from: fromParam, to: toParam } }
  )
  return data
}

