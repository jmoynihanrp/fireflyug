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
  const config = readBlockConfig(block);
  let { pathToList } = config;
  const articlehost = config.articleHost || 'https://publish-p133739-e1306963.adobeaemcloud.com' || '';
  const articlefolder = config.articleFolder || '/content/dam/aemugdynamic/dynamic-content/contentfragments' || '';
  const currentURL = window.location.href;
  const articlesservicepath = config.articlesServicePath || '/services/aemugdynamic/articles' || '';
  if (!pathToList) {
    pathToList = `${articlehost}${articlesservicepath}?folder=${articlefolder}`;
  }
  const articleList = await fetchArticles(pathToList);

  if (articleList.totalCount === 0) {
    block.innerHTML = '<p>No articles were found.</p>';
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'article-list';

  articleList.articles.forEach((article) => {
    const li = document.createElement('li');
    li.className = 'article-item';

    const link = document.createElement('a');
    link.href = `${currentURL}/article-detail?path=${article.path}`;
    const title = document.createElement('p');
    title.href = article.urlkey || article.path.split('/').pop();
    title.className = 'article-title';
    title.textContent = article.title;

    const image = document.createElement('img');
    image.alt = article.title;
    image.attributes.loading = 'lazy';
    image.className = 'article-image';
    image.src = article.image.startsWith('http') ? article.image : `${articlehost}/${article.image}`;

    const authordatediv = document.createElement('p');
    authordatediv.className = 'article-author-date';

    const author = document.createElement('span');
    author.className = 'article-author';
    author.textContent = `By ${article.author}`;

    const description = document.createElement('span');
    description.className = 'article-description';
    description.textContent = article.description;

    const date = document.createElement('span');
    date.className = 'article-date';
    date.textContent = `Date: ${article.publishDate}`;

    const arrow = document.createElement('div');
    arrow.className = 'article-item-arrow';

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
