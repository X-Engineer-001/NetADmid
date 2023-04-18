import { prisma } from "../../../../adapters";
import dotenv from "dotenv";
dotenv.config({path: "src/AI.env"});
import Replicate from "replicate";

export async function getAvatar(req, res) {
    try{
        const replicate = new Replicate({auth: process.env.AI_KEY});
        const response = await replicate.run(
            "laion-ai/erlich:92fa143ccefeed01534d5d6648bd47796ef06847a6bc55c0e5c5b6975f2dcdfb",
            {
                input: {
                    prompt: req.body.text.slice(0,10),
                    guidance_scale: 10,
                    steps: 100,
                    batch_size: 1,
                    width: 128,
                    height: 128,
                    aesthetic_rating: 1,
                    aesthetic_weight: 0
                }
            }
        );
        const img_url = response[0][0];
        if(img_url){
            return res.status(201).json({img:img_url});
        }else{
            throw "API get failed.";
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
    if(name.trim().length>0&&name.length<=10&&pass.trim().length>0&&pass.length<=20
    &&(img.slice(0,22)==="data:image/png;base64,"||img.slice(0,23)==="data:image/jpeg;base64,"||img.slice(0,32)==="https://replicate.delivery/pbxt/"||img==="")){
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
    if(name.trim().length>0&&name.length<=10&&pass.trim().length>0&&pass.length<=20){
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
    if(name.trim().length>0&&name.length<=10&&pass.trim().length>0&&pass.length<=20&&text.trim().length>0&&text.length<=30){
        try{
            const user = await prisma.user.findUnique({ where:{ name: name} });
            if(user&&pass===user.pass){
                const posted = await prisma.post.create({
                    data:{
                        text:text.replaceAll("'","’").replaceAll('"','”').replaceAll('\\','＼').replaceAll('/','／').replaceAll(':','：').replaceAll(';','；').replaceAll('(','（').replaceAll(')','）').replaceAll('[','［').replaceAll(']','］').replaceAll('{','｛').replaceAll('}','｝').replaceAll('!','！').replaceAll('?','？').replaceAll('#','＃').replaceAll('$','＄').replaceAll('&','＆').replaceAll('|','｜').replaceAll('+','＋').replaceAll('-','－').replaceAll('*','＊').replaceAll('=','＝'),
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
    if(name.trim().length>0&&name.length<=10&&pass.trim().length>0&&pass.length<=20){
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