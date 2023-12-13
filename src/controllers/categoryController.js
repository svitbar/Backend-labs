const Category = require('../entities/category');
const categories = require('../db/categoryDb');

const createCategory = (req, res) => {
  const {name} = req.body;
  const categoryId = categories.length + 1;

  const newCategory = new Category(categoryId, name);

  categories.push(newCategory);

  return res.status(201).json({
    message: 'Category was successfully created.',
    category: newCategory,
  });
};

const findCategoryById = (req, res) => {
  const id = req.params.id;

  const found = categories.find((category) => category.id === parseInt(id));

  if (found) return res.status(200).json(found);
  else return res.status(404).json({message: 'Not found'});
};

const findAllCategories = (req, res) => {
  return res.status(200).json(categories);
};

const deleteCategoryById = (req, res) => {
  const id = req.params.id;

  const index = categories.findIndex((category) => {
    category.id === parseInt(id);
  });

  if (index !== -1) {
    const deletedCategory = categories.splice(index, 1)[0];

    return res.status(201).json({
      message: 'category was successfully deleted.',
      category: deletedCategory,
    });
  } else {
    return res.status(404).json({message: 'Not found'});
  }
};

module.exports = {
  createCategory,
  findCategoryById,
  findAllCategories,
  deleteCategoryById,
};
