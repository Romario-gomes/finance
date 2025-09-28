import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { UseRegisterController } from "./useRegisterController";

export function Register() {
  const { errors, handleSubmit, register, isPending } = UseRegisterController();


  return(
  <>
    <header className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-2xl font-bold text-gray-900 tracking-[-0.5px]">Crie sua conta</h1>

      <p className="space-x-2">
        <span className="text-gray-700 tracking-[-0.5px]">Já possui uma conta?</span>
        <Link to="/login" className="tracking-[-0.5px] font-medium text-teal-900">Fazer Login</Link>
      </p>
      
    </header>

    <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
      <Input  {...register('name')}  error={errors.name?.message}placeholder="Nome"/>
      <Input  {...register('email')}  type="email" error={errors.email?.message} placeholder="email" />
      <Input  {...register('password')}  type="password" error={errors.password?.message} placeholder="senha"/>

      <Button isPending={isPending} type="submit" className="mt-2">Criar conta</Button>
    </form>
  </>
  )
}
