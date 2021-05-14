const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces')

router.post('/', saucesCtrl.createSauce);
router.get('/:id', saucesCtrl.getOneSauce);
router.put('/:id', saucesCtrl.modifySauce);
router.delete('/:id', saucesCtrl.deleteSauce);
router.get('/', saucesCtrl.getAllSauces);

module.exports = router;