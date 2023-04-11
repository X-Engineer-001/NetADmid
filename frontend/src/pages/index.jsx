import { Link, Outlet } from "react-router-dom";
import reactLogo from '../assets/react.svg'

export default function RootLayout() {
    return (
        <div>
            <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/view">View Users</Link> | <Link to="/create">Create User</Link>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
export function RootIndex() {
  return (
    <div className="App">
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>黃允誠</h1>
    </div>
  )
}