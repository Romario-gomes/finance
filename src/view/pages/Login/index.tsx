import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Login() {
  return (
  <>
    <header className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-2xl font-bold text-gray-900 tracking-[-0.5px]">Entre em sua conta</h1>

      <p className="space-x-2">
        <span className="text-gray-700 tracking-[-0.5px]">Já possui uma conta?</span>
        <Link to="/register" className="tracking-[-0.5px] font-medium text-teal-900">Crie uma conta</Link>
      </p>
      
    </header>

    <form action="" className="mt-[60px] flex flex-col gap-4">
      <Input name="email" placeholder="email" />
      <Input name="password" placeholder="senha"/>

      <Button type="submit" className="mt-2">Entrar</Button>
    </form>
  </>
  )
}
