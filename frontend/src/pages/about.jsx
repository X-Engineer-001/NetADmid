import '../about.css'
import { useState } from 'react'
import reactLogo from '../assets/react.svg'

export default function About() {
    const [count, setCount] = useState(0)
    const [text, setText] = useState("智")
    const clicked = () => {
      setCount(prev => prev === 0 ? 87 : 0)
      setText(prev => prev === "智" ? "智障" : "智")
    }
    return(
        <div className="App">
        <br/>
        <img src={reactLogo} className="logo react anime" alt="React logo" />
        <h1>黃允誠</h1>
        <div className="card">
            <button onClick={clicked}>
            count is {count}
            </button>
            <p>
            大愚若{text}：我有很多<code>小</code>聰明，多到我可以用我的<code>小</code>聰明淹沒你，但我終歸是個笨蛋。
            </p>
        </div>
        </div>
    )
}    