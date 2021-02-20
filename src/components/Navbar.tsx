import { Link } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from '../context/auth'

const Navbar: React.FC = () => {
  const { authenticated, loading } = useAuthState()

  const dispatch = useAuthDispatch()
  const logout = () => {
    dispatch('LOGOUT')
  }
  return (
    <nav className="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 px-5 bg-gray-900">
      {/* Logo and title */}
      <div className="flex items-center">
        <p className="text-2xl font-semibold text-blue-200">🧑‍🚀Space</p>
      </div>
      <div className="flex">
        {authenticated ? (
          // Show logout
          <button
            className="w-20 py-1 mr-4 leading-5 text-blue-200 capitalize border border-blue-200 rounded sm:block lg:w-32"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="hidden w-20 py-1 mr-4 leading-5 text-blue-200 capitalize border border-blue-200 rounded sm:block lg:w-32">
                log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="hidden w-20 py-1 leading-5 text-white capitalize bg-blue-400 rounded sm:block lg:w-32">
                sign up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
