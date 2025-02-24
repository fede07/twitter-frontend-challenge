import {FC} from "react"
import {useUser} from "../context/UserContext"
import {Navigate ,Outlet} from "react-router-dom"
import {useHttpRequestService} from "../service/HttpRequestService"
import Loader from "../components/loader/Loader"

const ProtectedRoute: FC = () => {
  const { user, loading } = useUser()
  const service = useHttpRequestService()

  if (loading) {
    return <Loader/>
  }

  if (!user || !service.isLogged()) {
    return <Navigate to="/sign-in" />
  }

  return <Outlet/>
}

export default ProtectedRoute
