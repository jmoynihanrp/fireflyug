export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add('blog-list-row');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const firstchild = row.firstElementChild;
    const lastchild = row.lastElementChild;
    li.classList.add('blog-item');

    const anchor = firstchild.firstElementChild;
    const href = anchor ? anchor.textContent : '';
    const anchor2 = document.createElement('a');
    if (href) {
      anchor2.href = href;
    }
    const img = firstchild.lastElementChild ? firstchild.lastElementChild.textContent : '';
    const optimizedPic = document.createElement('img');
    optimizedPic.src = img !== '' ? img : '';
    optimizedPic.classList.add('blog-image');
    anchor2.appendChild(optimizedPic);
    const title = lastchild.querySelector('h2');
    const title2 = document.createElement('p');
    title2.textContent = title && title.textContent ? title.textContent : '';
    title2.classList.add('blog-title');
    anchor2.appendChild(title2);
    const specs = lastchild.querySelectorAll('div p');
    const authorLine = specs[0];
    const dateLine = specs[1];
    const authordateparagraph = document.createElement('p');
    authordateparagraph.classList.add('blog-author-date');
    const authorspan = document.createElement('span');
    authorspan.classList.add('blog-author');
    authorspan.textContent = authorLine ? authorLine.textContent : '';
    authordateparagraph.appendChild(authorspan);
    const datespan = document.createElement('span');
    datespan.classList.add('blog-date');
    datespan.textContent = dateLine && dateLine.textContent ? dateLine.textContent : '';
    authordateparagraph.appendChild(datespan);
    anchor2.appendChild(authordateparagraph);
    const summaryspan = document.createElement('span');
    const summaryparagraph = document.createElement('p');
    summaryparagraph.classList.add('blog-summary');
    summaryparagraph.textContent = specs[2] ? specs[2].textContent : '';
    summaryspan.appendChild(summaryparagraph);
    anchor2.appendChild(summaryspan);

    const arrow = document.createElement('div');
    arrow.classList.add('blog-item-arrow');
    anchor2.appendChild(arrow);
    li.appendChild(anchor2);
    ul.appendChild(li);
  });
  block.replaceChildren(ul);
}
