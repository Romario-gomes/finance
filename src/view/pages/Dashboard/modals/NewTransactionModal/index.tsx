import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal() {
  const { closeNewTransactionModal, isNewTransactionModalOpen, newTransactionType, errors, handleSubmit, control, register, accounts, categories, isPending } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';
  return (
    <Modal title={isExpense ? 'Nova Despesa' : 'Nova Receita'} open={isNewTransactionModalOpen} onClose={closeNewTransactionModal}>
      <form onSubmit={handleSubmit}>
        <div className="">
          <span className="text-gray-600 tracking-[-0.5px] text-sm">Valor</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller defaultValue="0" name="value" control={control} render={({ field: { onChange, value } }) => (
              <InputCurrency error={errors.value?.message} onChange={onChange} value={value} />
            )} />
          </div>
        </div>


        <div className="mt-10 flex flex-col gap-4">
          <Input type="text" placeholder={isExpense ? 'Nome da Despesa' : 'Nome da receita'} error={errors.name?.message}  {...register('name')} />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Categoria"
                onChange={onChange}
                error={errors.categoryId?.message}

                value={value}
                options={categories.map(category => ({
                  value: category.id,
                  label: category.name
                }))}
              />
            )}
          />


          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isExpense ? 'Pagar com' : 'Receber com'
                }
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                options={accounts.map(account => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange }}) => (
              <DatePickerInput error={errors.date?.message} value={value} onChange={onChange}/>

            )}
          />

          <Button isPending={isPending}>Criar conta</Button>
        </div>
      </form>
    </Modal>
  )
}