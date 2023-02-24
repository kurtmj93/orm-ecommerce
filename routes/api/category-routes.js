const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const categories = Category.findAll({ // find all categories
      include: {
        model: Product, // be sure to include its associated Products
      }
    }); 
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const category = Category.findByPk(req.params.id, { // find one category by its `id` value
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

router.post('/', (req, res) => {
  try {
    const category = Category.create(req.body); // create a new category
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  try {
    const category = Category.destroy({ // delete a category by its `id` value
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
