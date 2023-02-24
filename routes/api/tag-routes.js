const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try {
    const tags = Tag.findAll({ // find all tags
      include: {
        model: Product, // be sure to include all its associated Product data
      }
    }); 
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const tag = Tag.findByPk(req.params.id, { // find a single tag by its `id`
      include: {
        model: Product, // be sure to include all its associated Product data
      }
    });
    
    if (!tag) { // return specific error if there is no tag found with this id
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const tag = Tag.create(req.body); // create a new tag
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  try {
    const tag = Tag.destroy({ // delete one tag by its `id` value
      where: {
        id: req.params.id 
      }
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
