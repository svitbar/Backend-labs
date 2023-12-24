const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = async (req, res) => {
  const {name} = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: {name},
    });

    return res.status(201).json({
      message: 'Category was successfully created.',
      category: newCategory,
    });
  } catch (error) {
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

const findCategoryById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const foundCategory = await prisma.category.findUnique({
      where: {id},
    });

    if (foundCategory) {
      return res.status(200).json(foundCategory);
    } else {
      return res.status(404).json({message: 'Not found'});
    }
  } catch (error) {
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

const findAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

const deleteCategoryById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const deletedCategory = await prisma.category.delete({
      where: {id},
    });

    if (deletedCategory) {
      return res.status(200).json({
        message: 'Category was successfully deleted.',
        category: deletedCategory,
      });
    } else {
      return res.status(404).json({message: 'Not found'});
    }
  } catch (error) {
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

module.exports = {
  createCategory,
  findCategoryById,
  findAllCategories,
  deleteCategoryById,
};
