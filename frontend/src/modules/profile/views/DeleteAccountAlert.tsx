import { useTranslation } from 'react-i18next'
import Alert from 'src/core/components/alerts/Alert.tsx'
import useDeleteAccount from 'src/modules/profile/hooks/useDeleteAccount.ts'
import type { DeleteAccountAlertProps } from 'src/modules/profile/types'

const DeleteAccountAlert = ({ isOpen, onClose }: DeleteAccountAlertProps) => {
  const { t } = useTranslation()
  const { isDeleting, handleConfirm, handleAfterClose } = useDeleteAccount(onClose)

  return (
    <Alert
      isOpen={isOpen}
      tone='destructive'
      title={t('profile.deleteAccount.alertTitle')}
      description={t('profile.deleteAccount.alertDescription')}
      confirmText={t('profile.deleteAccount.confirm')}
      cancelText={t('common.close')}
      loading={isDeleting}
      onConfirm={handleConfirm}
      onClose={onClose}
      onAfterClose={handleAfterClose}
    />
  )
}

export default DeleteAccountAlert
