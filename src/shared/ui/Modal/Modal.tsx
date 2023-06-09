import {
  PropsWithChildren, useCallback, useEffect, useRef, useState,
} from 'react'
import { clsx } from 'shared/lib'
import { Portal } from 'shared/ui/Portal/Portal'
import { Button } from 'shared/ui/Button/Button'
import { IoMdClose } from 'react-icons/io'
import cls from './Modal.module.scss'

const ANIMATION_DELAY = 300

interface Props {
  isOpen?: boolean
  onClose?: () => void
  className?: string,
  lazy?: boolean
}

export const Modal = ({
  isOpen, onClose, lazy, className, children,
}: PropsWithChildren<Props>) => {
  const [isClosing, setIsClosing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>()

  const onCloseHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true)
      timerRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, ANIMATION_DELAY)
    }
  }, [onClose])

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onCloseHandler()
    }
  }, [onCloseHandler])

  const mods:Record<string, boolean> = {
    [cls.opened]: isMounted,
    [cls['is-closing']]: isClosing,
  }

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      setIsMounted(false)
      clearTimeout(timerRef.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  if (lazy && !isOpen) {
    return null
  }

  return (
    <Portal>
      <div className={clsx(cls.modal, mods, className)}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div className={cls.overlay} onClick={onCloseHandler} />
        <div className={cls.content}>
          <Button variant={'clear'} onClick={onCloseHandler} className={cls.button}>
            <IoMdClose size={20} fill={'currentColor'} />
          </Button>
          {children}
        </div>
      </div>
    </Portal>
  )
}
