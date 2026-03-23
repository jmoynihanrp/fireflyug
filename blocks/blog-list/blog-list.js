import { readBlockConfig } from '../../scripts/aem.js';
import { getArticleListData } from './default-data.js';

async function fetchArticles(pathToList) {
  let data = null;
  try {
    const response = await fetch(pathToList);
    const source = response.ok ? await response.json() : getArticleListData();
    data = source;
  } catch (error) {
    const source2 = getArticleListData();
    data = source2 ?? getArticleListData();
    return getArticleListData();
  }

  const articles = {
    totalCount: data.totalCount,
    currentPage: data.currentPage,
    pageSize: data.pageSize,
    articles: data.articles.map((page) => ({
      title: page.title || '',
      description: page.description || '',
      author: page.author || '',
      path: page.path,
      publishDate: page.publishDate,
      image: page.image || '',
      urlkey: page.path.split('/').pop(),
    })),
  };

  return articles;
}
export default async function decorate(block) {
  const currentURL = window.location.href;
  const articleList = await fetchArticles();

  if (articleList.totalCount === 0) {
    block.innerHTML = '<p>No articles were found.</p>';
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'blog-list';

  articleList.articles.forEach((article) => {
    const li = document.createElement('li');
    li.className = 'blog-item';

    const link = document.createElement('a');
    link.href = `${currentURL}/article-detail?path=${article.path.split('/').pop()}`;
    const title = document.createElement('p');
    title.href = article.urlkey || article.path.split('/').pop();
    title.className = 'blog-title';
    title.textContent = article.title;

    const image = document.createElement('img');
    image.alt = article.title;
    image.attributes.loading = 'lazy';
    image.className = 'blog-image';
    image.src = article.image;

    const authordatediv = document.createElement('p');
    authordatediv.className = 'blog-author-date';

    const author = document.createElement('span');
    author.className = 'blog-author';
    author.textContent = `By ${article.author}`;

    const description = document.createElement('span');
    description.className = 'blog-description';
    description.textContent = article.description;

    const date = document.createElement('span');
    date.className = 'blog-date';
    date.textContent = `Date: ${article.publishDate}`;

    const arrow = document.createElement('div');
    arrow.className = 'blog-item-arrow';

    li.appendChild(link);
    link.appendChild(image);
    link.appendChild(title);
    authordatediv.appendChild(author);
    authordatediv.appendChild(date);
    link.appendChild(authordatediv);
    link.appendChild(description);
    link.appendChild(arrow);
    ul.appendChild(li);
  });

  block.innerHTML = '';
  block.appendChild(ul);
}
