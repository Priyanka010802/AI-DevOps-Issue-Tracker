const express = require('express');
const { createIssue, getIssues, updateIssue } = require('../controllers/issueController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', createIssue);
router.get('/:projectId', getIssues);
router.put('/:id', updateIssue);

module.exports = router;
