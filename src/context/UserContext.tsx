import {User} from "../service"
import React ,{createContext ,useEffect ,useState} from "react"
import {useHttpRequestService} from "../service/HttpRequestService"
import Loader from "../components/loader/Loader"

interface UserContextValue {
  user: User | null
  loading: boolean
  reloadUser: () => Promise<void>
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode}> = ({children}) => {
  const service = useHttpRequestService()
  const [user, setUser] = useState<User | null> (null)
  const [loading, setLoading] = useState(true)

  const loadUser = async () => {
    try{
      setLoading(true)
      const fetchedUser = await service.me()
      setUser(fetchedUser)
    } catch (error) {
      console.error("Error fetching user: ", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUser().then()
  } ,[]);

  return (
    <>
      {loading? (
        <Loader/>
      ) : (
        <UserContext.Provider value={{user, loading, reloadUser: loadUser}}>
          {children}
        </UserContext.Provider>
      )
      }

    </>

  )
}

export const useUser = (): UserContextValue => {
  const context = React.useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
