import { Router } from "express";

const router = Router();

/** import all controllers */
import * as controller from "../controllers/appController.js";
import * as villagerController from "../controllers/villagersController.js";
import { registerMail } from "../controllers/mailerController.js";
import Auth, { localVariables } from "../middleware/Auth.js";
import * as organizationcontroller from "../controllers/organizationController.js"
import * as Guestcontroller from "../controllers/guestVillagerController.js"
// import * as patientcontroller from "../controllers/patientController.js";
import * as patientcontroller from "../controllers/patientController.js";
import * as phicontroller from "../controllers/phiController.js";
// import nicValidator from "../middleware/nicValidator.js";
// import ValidateNIC from "../middleware/nicValidator.js";
// import * as validity from "../middleware/nicValidator.js"



// ========= POST Methods =============
router.route('/register').post(controller.register); // register user
router.route("/registermail").post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser, controller.login); // login in to the app
router.route('/addfammily').post(villagerController.addVillager); // add fammily details
// router.route('/villager/register').post(controller.validatenic,controller.register);
router.route('/organization/campaign/create').post(organizationcontroller.createcampaign);
router.route('/organization/campaigns').post(organizationcontroller.getOrganizationCampaigns);
router.route('/patient/addpatient').post(patientcontroller.addPatients);
router.route('/patient/getPatientcount').post(patientcontroller.getCountPatients);
router.route('/phi/getdivition').post(phicontroller.getDivisions);
// router.route('/validatenic').get(villagerController.getvillager);
router.route("/getVillages/:nic").get(villagerController.getVillagers);
// ========= GET Methods ==============
router.route('/user/:id').get(controller.getUser); // user with userID
router.route('/getUsers').post(controller.getUsers); // user with username
// router.route('/getUsers/:role').get(controller.getUsers); // users with role
router.route("/generateOTP").get(controller.verifyUser, localVariables, controller.generateOTP); // generate random OTP
router.route("/getFammily/123AS").get()
router.route("/villager/:email").get(villagerController.getvillager)
// router.route("/generateOTPMobile").post(controller.generateOTPMobile);
// router.route("/verifyotpmobile").post(controller);
// router.route(""
router.route("/verifyOTP").get(controller.verifyUser, controller.verifyOTP); // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables

// ========= PUT Methods ==============
router.route('/updateuser').put(Auth, controller.updateUser); //is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); //is use to reset the password

// ========= Delete Meyhods ===========
router.route('/deletedata/:id').delete(controller.verifyUser, controller.deleteData); // data with dataID


export default router;