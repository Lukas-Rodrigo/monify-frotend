import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { GetProfile } from "@/api/get-profile";
import { signOut } from "@/api/sign-out";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { StoreProfile } from "./store-profile";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Skeleton } from "./ui/skeleton";

export function AccountMenu() {
  const navigate = useNavigate();

  const { data: perfil } = useQuery({
    queryFn: GetProfile,
    queryKey: ["profile"],
    staleTime: Infinity,
  });
  const { data: managed, isLoading: isLoadingManagedRestaurant } = useQuery({
    queryFn: getManagedRestaurant,
    queryKey: ["managed-restaurant"],
    staleTime: Infinity,
  });

  const { mutateAsync: signOutFn, isPending: isSignOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate("/sign-in", { replace: true });
    },
  });

  console.log(perfil);
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managed?.name
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingManagedRestaurant ? (
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{perfil?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {perfil?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr h-6 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            asChild
            className="text-rose-400 dark:text-rose-500"
            disabled={isSignOut}
          >
            <button className="w-full" onClick={() => signOutFn()}>
              <LogOut className="mr h-6 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
        <StoreProfile />
      </DropdownMenu>
    </Dialog>
  );
}
