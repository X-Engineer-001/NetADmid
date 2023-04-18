import services from "../services";
import { useEffect,useState } from 'react';
function Login({loginInput,login,loginRes}) {
    return(
        <div>
            <div style={{float: "left",textAlign:"left",marginRight:"10px"}}>
                Username:
                <br/>
                Password:
            </div>
            <div style={{textAlign:"left"}}>
                <input name="username" maxLength="20" onChange={loginInput}/>
                <br/>
                <input name="password" maxLength="20" onChange={loginInput} style={{display:"block"}}/>
                <form onSubmit={login} style={{display: "inline"}}>
                    <input type="submit" value="Login" />
                </form>
                <p style={{display: "inline",color:"red"}}>{loginRes}</p>
            </div>
        </div>
    )
}

function Post({postInput,post,text}) {
    return(
        <div>
            <div style={{float: "left",textAlign:"left",marginRight:"10px"}}>
                Say something:
            </div>
            <div style={{textAlign:"left"}}>
                <input name="post" maxLength="30" value={text} onChange={postInput} style={{display:"block"}}/>
                <form onSubmit={post}>
                    <input type="submit" value="Post" />
                </form>
            </div>
        </div>
    )
}

export default function View() {
    const [logins, setLogins] = useState({username: "", password: ""});
    const [message, setMessage] = useState("");
    const [page, setPage] = useState("Login");
    const [post, setPost] = useState("");
    const [data, setData] = useState([]);
    const refresh = () => {
        services.user.getPosts().then((gotData) => {
            setData(gotData);
        });
    }
    useEffect(()=>refresh(),[]);
    const handleLoginInputChange = ({ target: { name, value } }) => {
        setLogins(prev => ({...prev, [name]: value}))
    }
    const handleLogin = (event) => {
        if(logins.username.trim().length>0&&logins.password.trim().length>0){
            services.user.login(logins).then((gotData) => {
                if(gotData.name){
                    refresh();
                    setPage("Post");
                }else{
                    setMessage("Login failed.");
                }
            });
            event.preventDefault();
        }
    }
    const handlePostInputChange = ({ target: { name, value } }) => {
        setPost(value)
    }
    const handlePost = (event) => {
        if(post.trim().length>0){
            services.user.post(post,logins).then((gotData) => {
                if(gotData.id){
                    refresh();
                    setPost("");
                }
            });
            event.preventDefault();
        }
    }
    const onPostDelete = (target) => {
        services.user.delPost(target,logins).then((gotData) => {
            if(gotData.id){
                refresh();
            }
        });
    }
    return (
        <div style={{paddingLeft:"calc(50% - 130px)"}}>
            {page==="Login"?
                <Login loginInput={handleLoginInputChange} login={handleLogin} loginRes={message}/>
                :
                <Post postInput={handlePostInputChange} post={handlePost} text={post}/>}
            <br/>
            {data.map((value,index) => 
                <div style={{display: "block",textAlign:"left"}} key={value.id}>
                    <img src={value.poster.img} width="80" height="80" style={{display: "inline-block",verticalAlign:"top"}} />
                    <span style={{display: "inline-block",fontSize:"1.1em"}}>
                        {value.poster.name}:<br/>
                        {value.text}<br/>
                        {logins.username===value.poster.name&&page==="Post"?
                            <button key={value.id} onClick={()=>onPostDelete(value.id)} style={{color:"red",height:"20px",padding:"0px 5px",fontSize:"0.5em"}}>delete</button>
                        :<p></p>}
                    </span>
                </div>
            )}
            {nope}
        </div>
    );
}