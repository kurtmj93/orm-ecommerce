const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ // find all categories
      include: {
        model: Product, // be sure to include its associated Products
      }
    }); 
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { // find one category by its `id` value
      include: {
        model: Product, // be sure to include its associated Products
      }
    });
    
    if (!category) { // return specific error if there is no category found with this id
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body); // create a new category
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  await Category.update({ name: req.body.name }, { where: req.params.id }) // update a category by its `id` value
    .then(function (rowsUpdated) {
      res.json(rowsUpdated)
    })
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({ // delete a category by its `id` value
      where: {
        id: req.params.id 
      }
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
