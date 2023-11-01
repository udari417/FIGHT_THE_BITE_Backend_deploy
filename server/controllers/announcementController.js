import AnnouncementModel from "../model/Announcement.model.js";

export async function addAnnouncement(req, res) {
    const { title, massage, receivers, sender } = req.body;

    // current timestamp in milliseconds
    let ts = Date.now();

    let date_ob = new Date(ts);
    let day = date_ob.getDate();
    let month =
        9 < date_ob.getMonth() + 1
            ? date_ob.getMonth() + 1
            : "0" + (date_ob.getMonth() + 1);
    let year = date_ob.getFullYear();

    // prints date & time in YYYY-MM-DD format
    const date = year + "-" + month + "-" + day;
    // return res.status(200).send({ msg: date });

    try {
        const announcement = new AnnouncementModel({
            sender,
            title,
            massage,
            receivers,
            date
        });

        // return save result as a response
        announcement.save()
            .then((result) =>
                res.status(201).send({ msg: "Send Successfully" })
            )
            .catch((error) => res.status(500).send({ error }));
    } catch (error) {
        return res.status(500).send(error);
    }
}


export async function getAnnouncement(req, res) {
    try {
        let data = await AnnouncementModel.find().sort({ date: -1 });

        if (!data)
            return res
                .status(501)
                .send({ error: "Cannot find users data" });

        return res.status(201).send(data);
    } catch (error) {
        return res.status(500).send({ error });
    }
}
        