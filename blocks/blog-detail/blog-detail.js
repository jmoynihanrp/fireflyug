export default function decorate(block) {
  const articleItem = document.createElement('div');
  articleItem.className = 'blog-item';
  const article = document.createElement('div');
  article.className = 'blog-content';
  const firstchild = block.firstElementChild.firstElementChild.querySelector('p') ? block.firstElementChild.firstElementChild.querySelector('p') : '';
  const lastchild = block.firstElementChild.lastElementChild;
  const articleImage = document.createElement('div');
  articleImage.className = 'blog-image';

  const img = firstchild.textContent ? firstchild.textContent : '';
  const optimizedPic = document.createElement('img');
  optimizedPic.src = img !== '' ? img : '';
  articleImage.appendChild(optimizedPic);
  const title = lastchild.querySelector('h2');
  const title2 = document.createElement('h1');
  title2.textContent = title && title.textContent ? title.textContent : '';
  title2.classList.add('blog-title');
  article.appendChild(title2);
  const specs = lastchild.querySelectorAll('div p');
  const authorLine = specs[0] && specs[0].textContent ? specs[0].textContent : '';
  const dateLine = specs[1] && specs[1].textContent ? specs[1].textContent : '';
  const articleBody = lastchild.querySelectorAll('div');
  const author = document.createElement('p');
  author.className = 'blogauthor';
  author.textContent = `By ${authorLine}`;
  const date = document.createElement('p');
  date.className = 'blog-date';
  date.textContent = `Date: ${dateLine}`;
  const body = document.createElement('div');
  body.className = 'blog-body';
  for (let i = 2; i < specs.length; i += 1) {
    const articleBodyChild = document.createElement('p');
    articleBodyChild.innerHTML = specs[i].innerHTML;
    body.appendChild(articleBodyChild);
  }

  body.insertAdjacentHTML('beforeend', articleBody);
  articleItem.appendChild(articleImage);
  article.appendChild(title2);
  article.appendChild(author);
  article.appendChild(date);
  article.appendChild(body);
  articleItem.appendChild(article);
  block.replaceChildren(articleItem);
}
