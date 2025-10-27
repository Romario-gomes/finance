import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../app/services/authService';
import type { SigninParams } from '../../../app/services/authService/signin';
import toast from 'react-hot-toast';
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
  email: z.string().nonempty('Email é um campo obrigatório'),
  password: z.string().nonempty('Senha é um campo obrigatório').min(8, 'A senha deve conter no mínimo 8 caracteres'),
})

type FormData = z.infer<typeof schema>;


export function useLoginController () {
  const { handleSubmit: hookFormSubmit, register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data)
    },
  });

  const { signin } = useAuth();


  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);
    } catch(err) {
      toast.error('Credênciais inválidas!')
    }
  });


  return { handleSubmit, register, errors, isPending };
} 