import Locations from "../model/LocationsModel.js";
export const getLocations = async (req, res) => {
  try {
    const locations = await Locations.findAll({
      attributes: ["location_id", "location_name", "latitude", "longitude"],
    });

    res.json(locations);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "categories not found" });
  }
};
