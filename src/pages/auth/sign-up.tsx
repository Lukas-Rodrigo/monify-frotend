import { registerRestaurant } from "@/api/register-restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import * as z from "zod";

const signUpFormSchema = z.object({
  email: z.string().email(),
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
});

type signUpForm = z.infer<typeof signUpFormSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signUpForm>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handlesignUp(data: signUpForm) {
    try {
      await registerRestaurantFn({
        email: data.email,
        restaurantName: data.restaurantName,
        phone: data.phone,
        managerName: data.managerName,
      });
      toast.success("Restaurante cadastrado com sucesso!", {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch {
      toast.error("Erro ao cadastrar restaurante");
    }
  }
  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form onSubmit={handleSubmit(handlesignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label
                className="text-sm font-semibold"
                htmlFor="restauranteName"
              >
                Nome do estabelecimento
              </Label>
              <Input
                type="text"
                id="restauranteName"
                {...register("restaurantName")}
              />
            </div>
            <div className="space-y-2">
              <Label
                className="text-sm font-semibold"
                htmlFor="restauranteManager"
              >
                Seu nome
              </Label>
              <Input
                type="text"
                id="restauranteManager"
                {...register("managerName")}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold" htmlFor="email">
                Seu e-mail
              </Label>
              <Input type="email" id="email" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold" htmlFor="phone">
                Seu celular
              </Label>
              <Input type="tel" id="phone" {...register("phone")} />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{" "}
              <a className="underline underline-offset-4" href="">
                Termos de serviço
              </a>{" "}
              e{" "}
              <a className="underline underline-offset-4" href="">
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
