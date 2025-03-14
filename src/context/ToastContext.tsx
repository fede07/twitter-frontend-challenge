import Toast ,{ToastType} from "../components/toast/Toast"
import {createContext ,ReactNode ,useContext ,useState} from "react"

interface ToastContextValue {
  showToast: (message: string, type: ToastType, show?:boolean) => void;
}

const TIMEOUT_SECONDS = 60

export const ToastContext = createContext<ToastContextValue | undefined>({
  showToast: () => {
  }
})

export const ToastProvider = ({children}: { children: ReactNode }) => {
  const [toast, setToast] = useState<{message: string, type: ToastType, show?: boolean} | null>(null)

  const showToast = (message: string, type: ToastType) => {
    setToast({message, type})
    setTimeout(() => {
      setToast(null)
    }, TIMEOUT_SECONDS * 1000)
  }

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} show={toast.show? toast.show : true} />}
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
