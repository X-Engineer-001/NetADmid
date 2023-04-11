import { prisma } from "../../../../adapters";
export async function getAllUsers(req, res) {
    const allUsers = await prisma.user.findMany();
    return res.json(allUsers);
}

export async function createOneUser(req, res) {
    const user = await prisma.user.create({ data: { name: req.body.name } });
    return res.status(201).json(user);
}