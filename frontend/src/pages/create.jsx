import services from "../services";
import { useState } from 'react'
export default function Create() {
    const [username, setUsername] = useState("")
    const handleTextInputChange = ({ target: { name, value } }) => {
        // const { name, value } = event.target
        // obj = { ...prev }; obj[name] = value
        setUsername(value)
    }
    const handleFormSubmit = (event) => {
        services.user.createOne(username);
        setUsername("");
        event.preventDefault();
    }
    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input name="name" value={username} onChange={handleTextInputChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}