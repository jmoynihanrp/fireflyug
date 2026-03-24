export default function decorate(block) {
  const ul = [...block.firstElementChild];
  block.classList.add('blog-list');
  ul.classList.add('blog-list');

  // setup image columns
  [...block.children].forEach((row) => {
    row.classList.add('blog-list-item');
    [...row.children].forEach((col) => {
      const pic = col.querySelector('img');
      pic.classList.add('blog-image');
      const title = col.querySelector('p:first-child');
      title.classList.add('blog-title');
      const specs = col.querySelector('p:nth-child(2)');
      specs.classList.add('blog-author-date');
      const author = specs.querySelector('span:first-child');
      author.classList.add('blog-author');
      const date = specs.querySelector('span:nth-child(2)');
      date.classList.add('blog-date');
      const description = col.querySelector('p:nth-child(3)');
      description.classList.add('blog-description');
      const arrow = col.querySelector('div');
      arrow.classList.add('blog-arrow');
    });
  });
}
