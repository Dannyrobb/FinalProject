import Categories from "../model/CategoriesModel.js";
import Businesses from "../model/BusinessesModel.js";
import Reviews from "../model/ReviewsModel.js";
import Locations from "../model/LocationsModel.js";
Categories.hasMany(Businesses, { foreignKey: "businesse_category_id" });
Businesses.belongsTo(Categories, { foreignKey: "businesse_category_id" });
Businesses.hasMany(Reviews, { foreignKey: "business_id" });
Businesses.belongsTo(Locations, { foreignKey: "businesse_location_id" });
export const getCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll({
      attributes: ["category_id", "category"],
    });

    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "categories not found" });
  }
};

export const getCategoriesAndBusinesses = async (req, res) => {
  try {
    const categories = await Categories.findAll({
      include: [{ model: Businesses, include: [Reviews, Locations] }],
    });
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "categories not found" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Categories.findAll({
      where: { category_id: req.body.id },
      attributes: ["category_id", "category"],
    });

    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "categories not found" });
  }
};
