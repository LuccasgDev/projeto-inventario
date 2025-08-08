import { Op } from "sequelize";
import { sequelize } from "../config/database.js";
import Substituicao from "../models/Substituicao.js";

export const gerarRelatorio = async (req, res) => {
    try {
        const { inicio, fim, groupBy } = req.query;
        const where = {};

        if (inicio && fim) {
            where.dataSubstituicao = {
                [Op.between]: [new Date(inicio), new Date(fim)]
            };
        }

        const relatorio = await Substituicao.findAll({
            where,
            attributes: [
                [groupBy, "categoria"],
                [sequelize.fn("COUNT", sequelize.col("id")), "total"]
            ],
            group: [groupBy],
            order: [[sequelize.literal("total"), "DESC"]],
        });

        res.json(relatorio);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};