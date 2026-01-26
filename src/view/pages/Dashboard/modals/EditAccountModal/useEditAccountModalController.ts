import z from "zod";
import { useDashboard } from "../../../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountService";
import type { UpdateBankAccountParams } from "../../../../../app/services/bankAccountService/update";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([ 
    z.string().nonempty('Saldo inicial é obrigatório'),
    z.number(),
  ]),
  name: z.string().nonempty('Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória')
});


type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } = useDashboard();

  const { handleSubmit: hookFormSubmit, register, formState: { errors }, control} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
  }});

  const [isDeleteModalOpen, setIsdeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { isPending: isPendingDelete, mutateAsync: removeAccount } = useMutation({
    mutationFn: async (bankAccountId: string) => {
      return bankAccountsService.remove(bankAccountId);
    }
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data:UpdateBankAccountParams) => {
      return bankAccountsService.update(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      });


      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('Conta atualizada com sucesso!')
      closeEditAccountModal();
    } catch {
      toast.error('Erro ao atualizar a conta!')
    }

  });


  async function handleDeleteAccount() {
  try {
      await removeAccount(accountBeingEdited!.id);


      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('Conta excluída com sucesso!')
      closeEditAccountModal();
    } catch {
      toast.error('Erro ao excluir a conta!')
    }

  }

  function handleOpenDeleteModal() {
    setIsdeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsdeleteModalOpen(false)
  }

  return {
     isEditAccountModalOpen, closeEditAccountModal, register, errors, handleSubmit, control, isPending, isDeleteModalOpen, handleCloseDeleteModal, handleOpenDeleteModal, handleDeleteAccount, isPendingDelete,
  }
}