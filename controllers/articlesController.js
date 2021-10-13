import Article from "../models/Article.js";

const article_index = async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {title: "Cha's Blog", articles});
}

const article_get = async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug})
    if(article == null) {
        res.redirect('/articles');
    } else {
        res.render('articles/show', {title:article.title, article});
    }
}

const article_edit_get = async (req, res) => {
    const article = await Article.findById(req.params.id)
    if(article == null) {
        res.redirect('/articles');
    } else {
        res.render('articles/edit', {title:article.title, article});
    }
}

const article_edit_put = async (req, res) => {
    let article = await Article.findById(req.params.id);
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown

    article = await article.save()
        .then(() => {
            res.redirect(`/articles/${article.slug}`);
        })
        .catch((err) => {
            console.log(err);
            res.render('articles/edit', {title:article.title, article})
        })
}

const article_delete = async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/articles');
}

const article_new_get = (req, res) => {
    res.render('articles/new', {title: "New Article", article:""})
}

const article_new_post = async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    article = await article.save()
        .then(() => {
            res.redirect(`/articles/${article.slug}`);
        })
        .catch((err) => {
            console.log(err);
            res.render('articles/new', {title: "New Article", article})
        })
}

export default {
    article_index,
    article_get,
    article_edit_get,
    article_edit_put,
    article_delete,
    article_new_get,
    article_new_post
}