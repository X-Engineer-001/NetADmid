import services from "../services";
import { useState } from 'react';
import ImageUploading from "react-images-uploading";
export default function Create() {
    const [inputs, setInputs] = useState({username: "", password: "", image: ""});
    const [message, setMessage] = useState("");
    const [img, setImg] = useState("");
    const handleTextInputChange = ({ target: { name, value } }) => {
        setInputs(prev => ({...prev, [name]: value}));
    }
    const handleFormSubmit = (event) => {
        if(inputs.username.trim().length>0&&inputs.password.trim().length>0){
            if(inputs.image===""){
                services.user.createOne({...inputs,image:"AI:"+inputs.username}).then((gotData) => {
                    if(gotData.name){
                        setInputs({username: "", password: "", image:""});
                        setImg("");
                        setMessage("Wellcome. Now go login to Message.");
                    }else{
                        setInputs(prev => ({...prev, image: ""}));
                        setMessage("Username used!");
                        setTimeout(() => {
                            setMessage("");
                        }, 1000);
                    }
                });
            }else{
                services.user.createOne(inputs).then((gotData) => {
                    if(gotData.name){
                        setInputs({username: "", password: "", image:""});
                        setImg("");
                        setMessage("Wellcome. Now go login to Message.");
                    }else{
                        setMessage("Username used!");
                        setTimeout(() => {
                            setMessage("");
                        }, 1000);
                    }
                });
            }
            event.preventDefault();
        }
    }
    const [text, setText] = useState("");
    const [AIprocessing, setAIprocessing] = useState(false);
    const handleAIinput = ({ target: { name, value } }) => {
        setText(value)
    }
    const handleAI = () => {
        if(text.trim().length>0&&!AIprocessing){
            setAIprocessing(true);
            setMessage("AI processing, please wait...");
            services.user.getAvatar(text).then((gotData)=>{
                if(gotData){
                    setInputs(prev => ({...prev, image: ("AI:"+text)}));
                    setImg(gotData);
                    setText("");
                    setMessage("");
                }else{
                    setMessage("AI API went wrong, please try again later.");
                    setTimeout(() => {
                        setMessage("");
                    }, 1000);
                }
                setAIprocessing(false);
            });
        }
    }
    const onChange = (imageList, addUpdateIndex) => {
        const tmp = imageList[0].url;
        setInputs(prev => ({...prev, image: tmp}));
        setImg(tmp);
    };
    return (
        <div style={{paddingLeft:"calc(50% - 130px)"}}>
            <div style={{float: "left",textAlign:"left",marginRight:"10px"}}>
                Username:
                <br/>
                Password:
                <img src={img} width="80" height="80" style={{display:"block"}}/>
                <form onSubmit={handleAI}>
                    <input type="submit" value="↑用AI感化←" style={{width:"80px",height:"40px"}}/>
                </form>
            </div>
            <div style={{textAlign:"left"}}>
                <input name="username" maxLength="10" value={inputs.username} onChange={handleTextInputChange}/>
                <br/>
                <input name="password" maxLength="20" value={inputs.password} onChange={handleTextInputChange} style={{display:"block"}}/>
                <ImageUploading onChange={onChange} dataURLKey="url" maxFileSize={5120} acceptType={["jpg", "png"]} style={{display: "block"}}>
                    {({imageList, onImageUpload}) => (
                        <button onClick={onImageUpload}>Upload avatar... (5KB max)</button>
                    )}
                </ImageUploading>
                <form onSubmit={handleFormSubmit}>
                    <input type="submit" value="Register" style={{width:"234px",height:"40px"}}/>
                </form>
                <input name="ai" maxLength="100" value={text} onChange={handleAIinput}/>
                <p style={{margin:"0px"}}>{message}</p>
            </div>
        </div>
    );
}