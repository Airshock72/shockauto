import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { AccountApi } from 'src/api'
import { ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'
import { useDeleteAccountReducer } from 'src/modules/profile/store/deleteAccount.ts'
import useLogout from 'src/modules/header/hooks/useLogout.ts'
import type { DeleteAccount } from 'src/modules/profile/types'

const useDeleteAccount = (onClose: () => void): DeleteAccount => {
  const { t } = useTranslation()
  const logout = useLogout()
  const [state, dispatch] = useDeleteAccountReducer()
  const { isDeleting, isDeleted } = state

  const handleConfirm = async () => {
    if (isDeleting) return

    dispatch({ type: 'SET_DELETING', payload: true })
    const response = await AccountApi.deleteProfile()
    if (response.status !== ResponseStatuses.SUCCESS) {
      dispatch({ type: 'SET_DELETING', payload: false })
      return
    }

    dispatch({ type: 'SET_DELETED', payload: true })
    onClose()
    toast.success(t('profile.deleteAccount.success'))
  }

  const handleAfterClose = () => {
    if (isDeleted) logout()
  }

  return {
    isDeleting,
    handleConfirm,
    handleAfterClose
  }
}

export default useDeleteAccount
