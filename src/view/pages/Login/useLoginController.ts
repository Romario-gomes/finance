import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().nonempty('Email é um campo obrigatório'),
  password: z.string().nonempty('Senha é um campo obrigatório').min(8, 'A senha deve conter no mínimo 8 caracteres'),
})

type FormData = z.infer<typeof schema>;


export function useLoginController () {
  const { handleSubmit: hookFormHandleSubmit, register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log('Dados: ', data);
    console.log('Chama a api com : ', data);
  });

  console.log(errors);

  return { handleSubmit, register, errors };
} 