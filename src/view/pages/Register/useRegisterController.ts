import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

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

  const handleSubmit = hookFormSubmit((data) => {
    console.log(data);
  });

  return { register, errors, handleSubmit };
}