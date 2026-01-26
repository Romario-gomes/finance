import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useEditAccountModalController } from "./useEditAccountModalController";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";

export function EditAccountModal() {
  const { closeEditAccountModal, isEditAccountModalOpen, errors, handleSubmit, register, control, isDeleteModalOpen, handleCloseDeleteModal, handleOpenDeleteModal, handleDeleteAccount, isPendingDelete } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return <ConfirmDeleteModal isLoading={isPendingDelete} onConfirm={handleDeleteAccount} title="Tem certeza que deseja excluir esta conta?" description="Ao excluir a conta, também serão excluir todos os registros de receita e despesas relacionados." onClose={handleCloseDeleteModal} />
  }

  return (
    <Modal title="Editar Conta" open={isEditAccountModalOpen} onClose={closeEditAccountModal} rightAction={(
      <button onClick={handleOpenDeleteModal}>
        <TrashIcon className="w-6 h-6 text-red-900" />
      </button>      
    )}>

      <form onSubmit={handleSubmit}>
        <div className="">
          <span className="text-gray-600 tracking-[-0.5px] text-sm">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller defaultValue="0" name="initialBalance" control={control} render={({ field: { onChange, value } }) => (
              <InputCurrency error={errors.initialBalance?.message} onChange={onChange} value={value} />
            )} />
          </div>
        </div>


        <div className="mt-10 flex flex-col gap-4">
          <Input type="text" placeholder="Nome da conta" error={errors.name?.message} {...register('name')} />

          <Controller defaultValue="CASH" name="type" control={control} render={({ field: { onChange, value } }) => (
            <Select
              placeholder="Tipo"
              value={value}
              onChange={onChange}
              error={errors.type?.message}
              options={[
                {
                  value: 'CHECKING',
                  label: 'Conta Corrente'
                },
                {
                  value: 'INVESTMENT',
                  label: 'Investimento'
                },
                {
                  value: 'CASH',
                  label: 'Dinheiro'
                },
              ]}
            />
          )} />


          <Controller defaultValue="" name="color" control={control} render={({ field: { onChange, value } }) => (
            <ColorsDropdownInput error={errors.color?.message} onChange={onChange} value={value} />
          )} />


          <Button>Salvar</Button>

        </div>


      </form>
    </Modal>
  )
}