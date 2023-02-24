const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({ // find all tags
      include: {
        model: Product, // be sure to include all its associated Product data
      }
    }); 
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, { // find a single tag by its `id`
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

router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body); // create a new tag
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
 
  try {
   await Tag.update(req.body, { // update a category by its `id` value
     where: {
       id: req.params.id,
     },
   })
   let thisTag = await Tag.findByPk(req.params.id); // need to grab the info after the update to return
   if (!thisTag) { // return specific error if there is no category found with this id
     res.status(404).json({ message: 'No tag found with this id!' });
     return;
   }
   res.status(200).json(thisTag);
  } catch (err) {
   res.status(400).json(err);
   }
 });

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({ // delete one tag by its `id` value
      where: {
        id: req.params.id 
      }
    });

    res.status(200).json({message: `Tag with id: ${req.params.id} deleted`});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
