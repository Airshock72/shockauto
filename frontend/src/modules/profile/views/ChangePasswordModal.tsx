import { useTranslation } from 'react-i18next'
import { KeyRound, Lock, RefreshCw } from 'lucide-react'
import Modal from 'src/core/components/modals/Modal.tsx'
import TextInput from 'src/core/components/inputs/TextInput.tsx'
import PasswordStrength from 'src/core/components/inputs/PasswordStrength.tsx'
import Button from 'src/core/components/buttons/Button.tsx'
import useChangePassword from 'src/modules/profile/hooks/useChangePassword.ts'
import type { ChangePasswordModalProps } from 'src/modules/profile/types'

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const { t } = useTranslation()
  const {
    formId,
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleFormAnimationEnd,
    shouldShake,
    reset
  } = useChangePassword(onClose)

  return (
    <Modal
      isOpen={isOpen}
      icon={KeyRound}
      title={t('profile.changePassword.title')}
      description={t('profile.changePassword.description')}
      preventClose={isSubmitting}
      onClose={onClose}
      onAfterClose={reset}
      footer={
        <>
          <Button variant='outline' disabled={isSubmitting} onClick={onClose} className='sm:min-w-28'>
            {t('common.cancel')}
          </Button>
          <Button type='submit' form={formId} variant='primary' loading={isSubmitting} leftIcon={<RefreshCw />} className='sm:min-w-32'>
            {t('profile.changePassword.submit')}
          </Button>
        </>
      }
    >
      <form id={formId} noValidate onSubmit={handleSubmit} onAnimationEnd={handleFormAnimationEnd}>
        <fieldset disabled={isSubmitting} className='min-w-0 space-y-5'>
          <TextInput
            type='password'
            name='newPassword'
            label={t('profile.changePassword.newPassword')}
            placeholder={t('profile.changePassword.newPasswordPlaceholder')}
            autoComplete='new-password'
            leftIcon={<Lock />}
            value={values.newPassword}
            onChange={handleChange}
            error={errors.newPassword && t(errors.newPassword)}
            shake={shouldShake('newPassword')}
          />
          <TextInput
            type='password'
            name='repeatPassword'
            label={t('profile.changePassword.repeatPassword')}
            placeholder={t('profile.changePassword.repeatPasswordPlaceholder')}
            autoComplete='new-password'
            leftIcon={<Lock />}
            value={values.repeatPassword}
            onChange={handleChange}
            error={errors.repeatPassword && t(errors.repeatPassword)}
            shake={shouldShake('repeatPassword')}
          />
          <PasswordStrength password={values.newPassword} className='pt-1' />
        </fieldset>
      </form>
    </Modal>
  )
}

export default ChangePasswordModal
