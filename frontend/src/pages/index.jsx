import { Link, Outlet } from "react-router-dom";
import avatar from '../assets/avatar.jpg'

export default function RootLayout() {
    return (
        <div>
            <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/view">Message</Link> | <Link to="/create">Register</Link>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
export function RootIndex() {
  return (
    <div className="App">
      <img src={avatar} className="logo react" alt="React logo" style={{display:"inline",verticalAlign:"middle"}}/>
      <h1 style={{display:"inline"}}>黃允誠的期中網站</h1>
    </div>
  )
}