import { api } from "@/lib/axios";

interface UpdateProfileBody {
  name: string;
  description: string | null;
}

export async function updateProfile({ name, description }: UpdateProfileBody) {
  await new Promise((response) => setTimeout(response, 3000));
  throw new Error("não foi possivel");
  await api.put("/profile", { name, description });
}
