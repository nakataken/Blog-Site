import express from 'express';
import articlesController from '../controllers/articlesController.js';
const router = express.Router();

router.get('/', articlesController.article_index);
router.route('/new')
    .get(articlesController.article_new_get)
    .post(articlesController.article_new_post);
router.route('/edit/:id')
    .get(articlesController.article_edit_get)
    .put(articlesController.article_edit_put);
router.get('/:slug', articlesController.article_get);
router.delete('/:id', articlesController.article_delete);
export default router;