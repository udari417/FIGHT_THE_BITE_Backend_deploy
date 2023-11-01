import CampaignModel from "../model/Campaign.model.js";

export async function getAllCampaigns(req, res) {
    try {
        let data = await CampaignModel.find();

        if (!data)
            return res.status(501).send({ error: "Cannot find users data" });

        return res.status(201).send(data);
    } catch (error) {
        return res.status(500).send({ error });
    }
}

export async function getCampaignsGND(req, res) {
    let gnd = req.params.gnd;
    try {
        let data = await CampaignModel.find({ divisionNumber : gnd });

        if (!data)
            return res.status(501).send({ error: "Cannot find users data" });

        return res.status(201).send(data);
    } catch (error) {
        return res.status(500).send({ error });
    }
}


export async function acceptCampaign(req, res) {
    try {
        let _id = req.params.id;
        try {
            const updateOk = await CampaignModel.findByIdAndUpdate(
                { _id },
                { status: 1 },
                { new: true }
            );
            if (!updateOk) {
                return res
                    .status(501)
                    .send({ error: "Cannot update data" });
            }
            return res.status(201).send({ msg: "Update Successfully" });
        } catch (error) {
            return res.status(500).send({ error });
        }
    } catch (error) {
        return res.status(401).send({ error });
    }
}