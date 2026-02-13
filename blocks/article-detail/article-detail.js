/**
 * Article Block
 * Displays article content with title, date, author, and body
 */

export default function decorate(block) {
  const rows = [...block.children];

  // Create article container
  const article = document.createElement('article-detail');
  article.className = 'article-content';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      const content = cells[1];

      if (label === 'title') {
        const title = document.createElement('h1');
        title.className = 'article-title';
        title.textContent = content.textContent.trim();
        article.appendChild(title);
      } else if (label === 'date') {
        const dateEl = document.createElement('div');
        dateEl.className = 'article-meta-date';
        const dateText = content.textContent.trim();
        const dateObj = new Date(dateText);
        if (!Number.isNaN(dateObj.getTime())) {
          dateEl.textContent = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        } else {
          dateEl.textContent = dateText;
        }
        article.appendChild(dateEl);
      } else if (label === 'author') {
        const authorEl = document.createElement('div');
        authorEl.className = 'article-meta-author';
        authorEl.textContent = `By ${content.textContent.trim()}`;
        article.appendChild(authorEl);
      } else if (label === 'image') {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'article-image';
        const img = content.querySelector('img');
        if (img) {
          imageContainer.appendChild(img);
        }
        article.appendChild(imageContainer);
      } else if (label === 'body') {
        const bodyEl = document.createElement('div');
        bodyEl.className = 'article-body';
        bodyEl.innerHTML = content.innerHTML;
        article.appendChild(bodyEl);
      }
    }
  });

  block.innerHTML = '';
  block.appendChild(article);
}
