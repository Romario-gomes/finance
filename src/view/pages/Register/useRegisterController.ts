import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import { signup, type SignupParams } from "../../../app/services/authService/signup";
import { toast } from "react-hot-toast";

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z.string().nonempty('Email é um campo obrigatório'),
  password: z.string().nonempty('Senha é um campo obrigatório').min(8, 'A senha deve conter no mínimo 8 caracteres'),
})

type FormData = z.infer<typeof schema>;

export function UseRegisterController() {
  const { handleSubmit: hookFormSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data)
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

    } catch(err) {
      toast.error('Ocorreu um erro ao criar sua conta')
    }
  });
  
  console.log(isPending);
  return { register, errors, handleSubmit, isPending };
}