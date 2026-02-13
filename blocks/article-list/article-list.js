/**
 * Article List Block
 * Displays a list of the top 10 articles sorted by publish date descending
 */

async function fetchArticles() {
  try {
    // Fetch articles from the query index
    const response = await fetch('/query-index.json');
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const data = await response.json();

    // Filter for article pages (pages with /articles/ path)
    const articles = data.data
      .filter((page) => page.path && page.path.startsWith('/articles/'))
      .filter((page) => page.lastModified) // Only include articles with valid dates
      .map((page) => ({
        title: page.title || '',
        description: page.description || '',
        path: page.path,
        date: page.lastModified,
        urlkey: page.path.split('/').pop(),
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    return articles;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function decorate(block) {
  const articles = await fetchArticles();

  if (articles.length === 0) {
    block.innerHTML = '<p>No articles found.</p>';
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'article-list';

  articles.forEach((article) => {
    const li = document.createElement('li');
    li.className = 'article-item';

    const titleLink = document.createElement('a');
    titleLink.href = article.path;
    titleLink.className = 'article-title';
    titleLink.textContent = article.title || article.urlkey;

    const description = document.createElement('p');
    description.className = 'article-description';
    description.textContent = article.description;

    const date = document.createElement('p');
    date.className = 'article-date';
    const dateObj = new Date(article.date);
    date.textContent = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    li.appendChild(titleLink);
    li.appendChild(date);
    li.appendChild(description);
    ul.appendChild(li);
  });

  block.innerHTML = '';
  block.appendChild(ul);
}
