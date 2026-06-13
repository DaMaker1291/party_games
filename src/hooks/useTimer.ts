import { useState, useEffect, useCallback, useRef } from 'react'

interface UseTimerOptions {
  initialTime: number
  onExpire?: () => void
  onTick?: (timeLeft: number) => void
  autoStart?: boolean
  paused?: boolean
}

export function useTimer({
  initialTime,
  onExpire,
  onTick,
  autoStart = false,
  paused = false,
}: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(autoStart)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const onExpireRef = useRef(onExpire)
  const onTickRef = useRef(onTick)

  onExpireRef.current = onExpire
  onTickRef.current = onTick

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const stop = useCallback(() => {
    setIsRunning(false)
    clearTimer()
  }, [clearTimer])

  const reset = useCallback((newTime?: number) => {
    clearTimer()
    setTimeLeft(newTime ?? initialTime)
    setIsRunning(false)
  }, [initialTime, clearTimer])

  useEffect(() => {
    if (!isRunning || paused) {
      clearTimer()
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = Math.max(0, prev - 0.1)
        if (next <= 0) {
          clearTimer()
          setIsRunning(false)
          onExpireRef.current?.()
        }
        onTickRef.current?.(next)
        return next
      })
    }, 100)

    return clearTimer
  }, [isRunning, paused, clearTimer])

  useEffect(() => {
    return clearTimer
  }, [clearTimer])

  const progress = initialTime > 0 ? timeLeft / initialTime : 1

  return {
    timeLeft: Math.max(0, timeLeft),
    progress: Math.max(0, progress),
    isRunning,
    start,
    stop,
    reset,
    setTimeLeft,
  }
}
