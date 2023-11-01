import UserModel from "../model/User.model.js";
import VillagerModel from "../model/Vllager.model.js";
import GuestModel from "../model/Guest.model.js";

export async function addVillager(req, res) {
    try {
        const {
            address,
            gsDivision,
            divisionNumber,
            houseHoldNo,
            members
        } = req.body;
        // check for existing details
        let error = {};
        // let i = 0;
        // while (members[i]) {
        //     const existNIC = await VillagerModel.find({ "members.nic": "123456" } );
        //     const existContact = await VillagerModel.findOne({ contact: members[i].contact });
            
        //     if (existNIC) {
        //         return res.status(500).send({ nic: members[i].nic });
        //         error.nic = [i, "Please use unique NIC"];
        //     }
        //     if (existContact) {
        //         error.contact = [i, "Please use unique Contact Number"];
        //     }
        //     i++;
        // }
        
        if (
            !(Object.keys(error).length === 0 && error.constructor === Object)
        ) {
            return res.status(500).send({ error });
        } else {
            
            try{
                const user = new VillagerModel({
                    address,
                    gsDivision,
                    divisionNumber,
                    houseHoldNo,
                    members,
                });
                // return res.status(200).send({ msg: user });

                // return save result as a response
                user.save()
                    .then((result) =>
                        res
                            .status(201)
                            .send({ msg: "Register Successfully" })
                    )
                    .catch((error) => res.status(500).send({ error }));
            }
            catch (error) {
                return res.status(500).send(error);    
            }
            
        }
    } catch (error) {
        return res.status(500).send({error});
    }
}


export async function getFammly(req, res) {
    let divisionNumber = req.params.gnd;
    // return res.send(divisionNumber)
    try {
        if (!divisionNumber) return res.status(404).send({ error: "Invalid URL" });

        try {
            let users1 = await VillagerModel.find({ divisionNumber });
            let users2 = await GuestModel.find({ divisionNumber, status: 1 });
            let users = users1.concat(users2);
            // return res.status(201).send(users);

            if (!users)
                return res
                    .status(501)
                    .send({ error: "Cannot find users data" });

            return res.status(201).send(users);
        } catch (error) {
            return res.status(500).send({ error });
        }
    } catch (error) {
        return res.status(501).send({ error: "Cannot find users data" });
    }
}
