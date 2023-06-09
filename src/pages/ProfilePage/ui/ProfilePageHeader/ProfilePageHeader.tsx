import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'
import { Button } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import {
  getProfileData, getProfileReadonly, profileActions, updateProfileData,
} from 'entities/Profile'
import { useAppDispatch } from 'shared/hooks'
import { getUserAuthData } from 'entities/User'
import cls from './ProfilePageHeader.module.scss'

export const ProfilePageHeader = () => {
  const { t } = useTranslation('profile')
  const dispatch = useAppDispatch()
  const authData = useSelector(getUserAuthData)
  // TODO: Сделать через createSelector получение значения canEdit
  const profileData = useSelector(getProfileData)

  const canEdit = authData?.id === profileData?.id

  const readonly = useSelector(getProfileReadonly)

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(updateProfileData())
  }, [dispatch])

  return (
    <header className={cls.header}>
      <Text as={'h1'}>
        {t('profile')}
      </Text>
      <div className={cls['button-wrapper']}>
        {canEdit && (
          <Button variant={'secondary'} isCancel={!readonly} onClick={readonly ? onEdit : onCancelEdit}>
            {readonly ? t('edit') : t('cancel')}
          </Button>
        )}
        {
          !readonly && (
            <Button variant={'secondary'} onClick={onSave}>
              {t('save')}
            </Button>
          )
        }
      </div>
    </header>
  )
}
