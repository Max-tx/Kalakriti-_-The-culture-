const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM categories');
      const categoryList = result.rows;
  
      if (!categoryList || categoryList.length === 0) {
        res.status(500).json({ success: false, message: 'Categories not found' });
      } else {
        res.status(200).json(categoryList);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  
// router.get('/:id', async(req,res)=>{
//     const category = await Category.findById(req.params.id);

//     if(!category) {
//         res.status(500).json({message: 'The category with the given ID was not found.'})
//     } 
//     res.status(200).send(category);
// })



router.post('/', async (req, res) => {
    const { name, icon, color } = req.body;
  
    const insertQuery = `
      INSERT INTO categories (name, icon, color)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
  
    try {
      const result = await pool.query(insertQuery, [name, icon, color]);
      const newCategory = result.rows[0];
  
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error adding category:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

// router.put('/:id',async (req, res)=> {
//     const category = await Category.findByIdAndUpdate(
//         req.params.id,
//         {
//             name: req.body.name,
//             icon: req.body.icon || category.icon,
//             color: req.body.color,
//         },
//         { new: true}
//     )

//     if(!category)
//     return res.status(400).send('the category cannot be created!')

//     res.send(category);
// })

// router.delete('/:id', (req, res)=>{
//     Category.findByIdAndRemove(req.params.id).then(category =>{
//         if(category) {
//             return res.status(200).json({success: true, message: 'the category is deleted!'})
//         } else {
//             return res.status(404).json({success: false , message: "category not found!"})
//         }
//     }).catch(err=>{
//        return res.status(500).json({success: false, error: err}) 
//     })
// })

module.exports = router;