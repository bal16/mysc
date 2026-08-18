import { useRegisterSW } from 'virtual:pwa-register/react'
import { useEffect, useState } from 'react'

export function PWABadge() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  const [show, setShow] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // Sync internal show state with PWA states
  useEffect(() => {
    if (offlineReady || needRefresh) {
      setShow(true)
      setIsClosing(false)
    }
  }, [offlineReady, needRefresh])

  const close = () => {
    setIsClosing(true)
    // Wait for the exit animation to finish before removing from DOM
    setTimeout(() => {
      setShow(false)
      setOfflineReady(false)
      setNeedRefresh(false)
      setIsClosing(false)
    }, 300) // matches duration-300
  }

  if (!show) return null

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 p-4 w-80 rounded-[2rem] 
                  bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl 
                  border border-slate-200/50 dark:border-white/10
                  shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]
                  duration-300 ease-out
                  ${
                    isClosing
                      ? 'animate-out slide-out-to-bottom-5 fade-out zoom-out-95'
                      : 'animate-in slide-in-from-bottom-5 fade-in zoom-in-95'
                  }`}
      role="alert"
    >
      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {offlineReady
            ? 'App ready to work offline'
            : 'New update available'}
        </div>
        <div className="flex gap-2">
          {needRefresh && (
            <button
              className="flex-1 rounded-xl bg-zinc-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 shadow-sm transition-transform active:scale-95"
              onClick={() => updateServiceWorker(true)}
            >
              Update & Reload
            </button>
          )}
          <button
            className="flex-1 rounded-xl bg-black/5 dark:bg-white/10 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-transform active:scale-95"
            onClick={() => close()}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
