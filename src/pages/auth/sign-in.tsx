import { signIn } from "@/api/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";
import * as z from "zod";

const sigInFormSchema = z.object({
  email: z.string().email(),
});

type sigInForm = z.infer<typeof sigInFormSchema>;

export function SignIn() {
  const [searchParams] = useSearchParams();

  console.log(searchParams.get("email"));

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<sigInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
    resolver: zodResolver(sigInFormSchema),
  });
  // usamos isso todas as vezes que fomos fazer uma mutação, ou seja, uma alteração no banco de dados etc
  // POST, PUT, DELETE => MUTATION
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSigIn(data: sigInForm) {
    try {
      await authenticate({ email: data.email });
      toast.success("Enviamos um link de authenticação para seu email.", {
        action: {
          label: "Reenviar",
          onClick: () => handleSigIn(data),
        },
      });
    } catch {
      toast.error("Credenciais inválidas.");
    }
  }
  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant={"ghost"} asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo Estabecimento</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSigIn)} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold" htmlFor="email">
                Seu e-mail
              </Label>
              <Input
                className="font-semibold"
                type="email"
                id="email"
                {...register("email")}
              />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
