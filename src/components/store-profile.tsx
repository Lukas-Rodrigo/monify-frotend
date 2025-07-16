import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from "@/api/get-managed-restaurant";
import { updateProfile } from "@/api/update-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const ProfileStoreSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
});

type ProfileStoreProps = z.infer<typeof ProfileStoreSchema>;

export function StoreProfile() {
  const queryCliente = useQueryClient();

  const { data: managed } = useQuery({
    queryFn: getManagedRestaurant,
    queryKey: ["managed-restaurant"],
    staleTime: Infinity,
  });

  const { register, handleSubmit } = useForm<ProfileStoreProps>({
    resolver: zodResolver(ProfileStoreSchema),
    values: {
      name: managed?.name ?? "",
      description: managed?.description ?? "",
    },
  });

  function updateManagerRestaurantCache({
    description,
    name,
  }: ProfileStoreProps) {
    const cached = queryCliente.getQueryData<GetManagedRestaurantResponse>([
      "managed-restaurant",
    ]);
    if (cached) {
      queryCliente.setQueryData<GetManagedRestaurantResponse>(
        ["managed-restaurant"],
        {
          ...cached,
          description,
          name,
        },
      );
    }
    return { cached };
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ description, name }) {
      const { cached } = updateManagerRestaurantCache({ description, name });
      return { previousCached: cached };
    },
    onError(_, __, context) {
      if (context?.previousCached) {
        updateManagerRestaurantCache(context.previousCached);
      }
    },
  });

  async function handleUpdateProfile(data: ProfileStoreProps) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      });

      toast.success("Perfil atualizado com sucesso!");
    } catch {
      toast.error("Falha ao atualizar o perfil, tente novamente");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input {...register("name")} id="name" className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              {...register("description")}
              id="description"
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" type="button">
            Cancelar
          </Button>
          <Button variant="success" type="submit">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
