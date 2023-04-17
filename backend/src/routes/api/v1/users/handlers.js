import { prisma } from "../../../../adapters";
import dotenv from "dotenv";
dotenv.config({path: "src/openAI.env"});
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export async function getAvatar(req, res) {
    try{
        const response = await openai.createImage({
            prompt: req.body.text,
            n: 1,
            size: "256x256",
        });
        const img_url = response.data.data[0].url;
        if(img_url){
            return res.status(201).json({img:img_url});
        }else{
            throw "OpenAI get failed.";
        }
    }catch(e){
        console.log(e.response);
        return res.status(201).json({});
    }
}

export async function getAllPosts(req, res) {
    try{
        const allPosts = await prisma.post.findMany({
            orderBy: {id: 'desc'},
            select:{id:true,text:true,poster:{select:{name:true,img:true,pass:false,id:false}}}
        });
        return res.json(allPosts);
    }catch(e){
        return res.status(201).json({});
    }
}

export async function createOneUser(req, res) {
    const name = req.body.name;
    const pass = req.body.pass;
    const img = req.body.img;
    if(name.trim().length>0&&name.length<=20&&pass.trim().length>0&&pass.length<=20
    &&(img.slice(0,22)==="data:image/png;base64,"||img.slice(0,23)==="data:image/jpeg;base64,"||img.slice(0,3)==="AI:")){
        try{
            const user = await prisma.user.create({ data: { name: name, pass: pass, img: img} });
            return res.status(201).json(user);
        }catch(e){
            if(e.code === "P2002"){
                return res.status(201).json({});
            }
        }
    }else{
        return res.status(404);
    }
}

export async function login(req, res) {
    const name = req.body.name;
    const pass = req.body.pass;
    if(name.trim().length>0&&name.length<=20&&pass.trim().length>0&&pass.length<=20){
        try{
            const user = await prisma.user.findUnique({where:{ name: name} });
            if(pass===user.pass){
                return res.status(201).json(user);
            }else{
                return res.status(201).json({});
            }
        }catch(e){
            return res.status(201).json({});
        }
    }else{
        return res.status(404);
    }
}

export async function post(req, res) {
    const name = req.body.name;
    const pass = req.body.pass;
    const text = req.body.text;
    if(name.trim().length>0&&name.length<=20&&pass.trim().length>0&&pass.length<=20&&text.trim().length>0&&text.length<=30){
        try{
            const user = await prisma.user.findUnique({ where:{ name: name} });
            if(user&&pass===user.pass){
                const posted = await prisma.post.create({
                    data:{
                        text:text.replaceAll("'","’").replaceAll('"','”').replaceAll('\\','＼').replaceAll('/','／').replaceAll(':','：').replaceAll(';','；').replaceAll('(','（').replaceAll(')','）').replaceAll('[','［').replaceAll(']','］').replaceAll('{','｛').replaceAll('}','｝'),
                        poster:{connect:{name:name}}
                    }
                });
                return res.status(201).json(posted);
            }else{
                return res.status(404);
            }
        }catch(e){
            return res.status(201).json({});
        }
    }else{
        return res.status(404);
    }
}

export async function delPost(req, res) {
    const name = req.body.name;
    const pass = req.body.pass;
    if(name.trim().length>0&&name.length<=20&&pass.trim().length>0&&pass.length<=20){
        try{
            const user = await prisma.user.findUnique({ where:{ name: name} });
            if(user&&pass===user.pass){
                const target = await prisma.post.findUnique({ select:{posterID:true},where:{id:req.body.id} });
                if(target.posterID === user.id){
                    const deleted = await prisma.post.delete({ where:{id:req.body.id} });
                    return res.status(201).json(deleted);
                }else{
                    return res.status(404);
                }
            }else{
                return res.status(404);
            }
        }catch(e){
            return res.status(201).json({});
        }
    }else{
        return res.status(404);
    }
}