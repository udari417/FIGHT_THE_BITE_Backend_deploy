import UserModel from "../model/User.model.js";
import VillagerModel from "../model/Vllager.model.js";

export async function addVillager(req, res) {
  try {
    const { address, gsDivision, divisionNumber, houseHoldNo, members,houseHolderNIC } =
      req.body;

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

    if (!(Object.keys(error).length === 0 && error.constructor === Object)) {
      return res.status(500).send({ error });
    } else {
      try {
        const user = new VillagerModel({
          address,
          gsDivision,
          divisionNumber,
          houseHoldNo,
          members,
          houseHolderNIC
        });

        // return save result as a response
        user
          .save()
          .then((result) =>
            res.status(201).send({ msg: "Register Successfully" })
          )
          .catch((error) => res.status(500).send({ error }));
      } catch (error) {
        return res.status(500).send(error);
      }
    }
  } catch (error) {
    return res.status(500).send({ error: "aiyooo" });
  }
}

export async function getvillager(req,res){
  var email = req.params.email;

  console.log(req.params.email)
  try {
    const user = await UserModel.findOne({email},"-password");
    // console.log(user)
    if(user){
      res.status(200).json({user})
    }else{
      res.status(404).send({message : "User Not Found!"})
    }
  } catch (error) {
    res.status(404).json({error});
  }

}
