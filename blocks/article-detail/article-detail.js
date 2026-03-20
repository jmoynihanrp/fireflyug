import { readBlockConfig } from '../../scripts/aem.js';
import { getArticleDetailData } from './default-data.js';

async function fetchArticle(pathToList, pagename) {
  let data = null;

  if (pagename === 'article-detail') {
    return getArticleDetailData();
  }
  try {
    const response = await fetch(pathToList);
    const source = response.ok ? await response.json() : getArticleDetailData();
    data = source;
  } catch (error) {
    return '';
  }

  const article = {
    title: data.title || '',
    description: data.description || '',
    author: data.author || '',
    path: data.path,
    publishDate: data.publishDate,
    image: data.image || '',
    body: data.body || '',
    urlkey: data.path.split('/').pop(),
  };

  return article;
}
export default async function decorate(block) {
  const config = readBlockConfig(block);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const path = urlParams.get('path') || 'article-detail';

  const articlehost = config.articleHost || 'https://publish-p133739-e1306963.adobeaemcloud.com' || '';
  const articleservicepath = config.articleSingleServicePath || '/services/aemugdynamic/blog' || '';
  const pathToList = `${articlehost}${articleservicepath}?id=${path}`;

  const articleDetail = await fetchArticle(pathToList, path);
  if (!articleDetail || !articleDetail.title) {
    block.innerHTML = '<p>Article not found.</p>';
    return;
  }
  // Create article container
  const article = document.createElement('div');
  article.className = 'article-content';
  const articleImage = document.createElement('div');
  articleImage.className = 'article-image';
  const image = document.createElement('img');
  articleImage.appendChild(image);
  image.src = `${articlehost}/${articleDetail.image}`;
  const title = document.createElement('h1');
  title.className = 'article-title';
  title.textContent = articleDetail.title;
  const author = document.createElement('p');
  author.className = 'article-author';
  author.textContent = `By ${articleDetail.author}`;
  const date = document.createElement('p');
  date.className = 'article-date';
  date.textContent = `Date: ${articleDetail.publishDate}`;
  const body = document.createElement('p');
  body.className = 'article-body';
  body.insertAdjacentHTML('beforeend', articleDetail.body || articleDetail.description);

  article.appendChild(title);
  article.appendChild(author);
  article.appendChild(date);
  article.appendChild(body);

  block.innerHTML = '';
  block.appendChild(articleImage);
  block.appendChild(article);
}
