const ARTICLE_LIST_DATA = {
  totalCount: 1,
  currentPage: 0,
  pageSize: 10,
  articles: [
    {
      path: '/content/dam/aemugdynamic/dynamic-content/contentfragments/test',
      title: 'Test',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac luctus est, ac accumsan odio. Ut placerat mollis mauris sed consequat. Morbi vehicula gravida iaculis. Quisque congue leo quis lectus suscipit, ut laoreet augue malesuada. Aenean consectetur risus pellentesque ipsum tincidunt, quis congue mauris euismod. Donec lorem est, molestie sit amet lacinia vitae, auctor nec ipsum. Curabitur turpis lorem, egestas vel neque non, auctor commodo sapien. Sed aliquam porttitor mattis. Mauris est mi, sollicitudin vitae pellentesque a, tincidunt at leo. Vivamus ut consequat tellus.',
      author: 'Julie Moynihan',
      image: 'https://publishhttps://publish-p133739-e1306963.adobeaemcloud.com:443/content/dam/fireflyug/images/DogWatching.jpg',
      tags: '',
      publishDate: '2026-03-11',
    },
    {
      path: '/content/dam/aemugdynamic/dynamic-content/contentfragments/test',
      title: 'Test',
      description: 'Vestibulum sodales sollicitudin turpis, sit amet dictum elit vulputate vel. Maecenas ipsum purus, placerat et tellus non, luctus consectetur tellus. Fusce sagittis, orci id semper dapibus, diam sapien aliquam enim, non elementum lectus orci sit amet mi. Integer tristique erat in ante scelerisque faucibus. Maecenas vitae eros augue. Cras commodo malesuada gravida. Nunc convallis, sem eu tincidunt cursus, purus orci mattis velit, at interdum enim ante sit amet ex. Aenean ut commodo erat, a finibus dui. Phasellus sed condimentum sapien.',
      author: 'Julie Moynihan',
      image: 'https://publishhttps://publish-p133739-e1306963.adobeaemcloud.com:443/content/dam/fireflyug/images/DogWatching.jpg',
      tags: '',
      publishDate: '2026-03-11',
    },
  ],
};

export function getArticleListData() {
  return ARTICLE_LIST_DATA;
}

export default ARTICLE_LIST_DATA;
