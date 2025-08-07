import Substituicao from "../models/Substituicao.js";
import  {Op} from "sequelize";
import {sequelize} from "../config/database.js";

export const gerarRelatorio = async (req, res) => {
    try {
        const {inicio, fim, grupo} = req.body;
        const where = {}
        if(inicio && fim){
            where.dataSubstituicao = {
                [Op.between]: [new Date(inicio), new Date(fim)]
            }
        }
        const relatorio = await Substituicao.findAll({
            where,
            attributes:[
                [grupo, "categoria"],
                [sequelize.fn("COUNT", sequelize.col("id")), "total"]
            ],
            group:['categoria'],
            order:[[sequelize.literal("total"), "DESC"]],
        })
        res.json(relatorio);
    }catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}