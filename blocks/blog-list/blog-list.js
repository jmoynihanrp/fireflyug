import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorateBlogList(block) {
  // setup image columns
  [...block.children].forEach((ul) => {
    ul.classList.add('blog-list-row');
    [...ul.children].forEach((li) => {
      li.classList.add('blog-list-item');

      const img = li.querySelector('picture > img').closest('picture');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.classList.add('blog-image');
      img.closest('picture').replaceWith(optimizedPic);
      const title = li.querySelector('h1, h2, h3, h4, h5, h6');
      title.classList.add('blog-title');
      const specs = li.querySelector('div:first-child');
      specs.classList.add('blog-author-date');
      const author = specs.querySelector('p:first-child');
      author.classList.add('blog-author');
      const date = specs.querySelector('p:last-child');
      date.classList.add('blog-date');
      const description = li.querySelector('div:nth-child(2)');
      description.classList.add('blog-description');
      const arrow = li.querySelector('div:last-child');
      arrow.classList.add('blog-arrow');
    });
  });
}
const els = document.querySelectorAll('.blog-list');
els.forEach((el) => {
  decorateBlogList(el);
});
