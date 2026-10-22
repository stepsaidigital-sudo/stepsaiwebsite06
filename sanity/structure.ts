import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Product Updates')
        .child(
          S.documentTypeList('productUpdate')
            .title('Product Updates')
            .filter('_type == "productUpdate"')
            .defaultOrdering([{ field: 'releaseDate', direction: 'desc' }])
        ),
      S.divider(),
      S.documentTypeListItem('post').title('Blog Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'productUpdate'].includes(item.getId()!),
      ),
    ])