import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO & social'},
    {name: 'structured', title: 'FAQs / links / schema'},
    {name: 'meta', title: 'Meta'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      group: 'content',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
        defineField({
          name: 'url',
          title: 'External image URL',
          type: 'url',
          description: 'Set by Unvoro when the featured image is hosted elsewhere. Used only if no asset is uploaded above.',
        }),
        defineField({
          name: 'credit',
          title: 'Credit',
          type: 'object',
          fields: [
            defineField({name: 'photographer', title: 'Photographer', type: 'string'}),
            defineField({name: 'photographerUrl', title: 'Photographer URL', type: 'url'}),
            defineField({name: 'sourceUrl', title: 'Source URL', type: 'url'}),
            defineField({name: 'source', title: 'Source', type: 'string'}),
          ],
        }),
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'content',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({name: 'metaTitle', title: 'Meta title', type: 'string'}),
        defineField({name: 'metaDescription', title: 'Meta description', type: 'text', rows: 3}),
        defineField({name: 'canonicalUrl', title: 'Canonical URL', type: 'url'}),
        defineField({name: 'focusKeyword', title: 'Focus keyword', type: 'string'}),
        defineField({
          name: 'openGraph',
          title: 'Open Graph',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'OG title', type: 'string'}),
            defineField({name: 'description', title: 'OG description', type: 'text', rows: 2}),
            defineField({name: 'type', title: 'OG type', type: 'string'}),
            defineField({name: 'image', title: 'OG image URL', type: 'url'}),
          ],
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter card',
          type: 'object',
          fields: [
            defineField({name: 'card', title: 'Card type', type: 'string'}),
            defineField({name: 'title', title: 'Twitter title', type: 'string'}),
            defineField({name: 'description', title: 'Twitter description', type: 'text', rows: 2}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      group: 'seo',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),

    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'structured',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string'}),
            defineField({name: 'answer', title: 'Answer', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'question'}},
        }),
      ],
    }),
    defineField({
      name: 'internalLinks',
      title: 'Internal links',
      type: 'array',
      group: 'structured',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'internalLink',
          fields: [
            defineField({name: 'anchor', title: 'Anchor text', type: 'string'}),
            defineField({name: 'targetUrl', title: 'Target URL', type: 'url'}),
          ],
          preview: {select: {title: 'anchor', subtitle: 'targetUrl'}},
        }),
      ],
    }),
    defineField({
      name: 'externalCitations',
      title: 'External citations',
      type: 'array',
      group: 'structured',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'citation',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
          preview: {select: {title: 'title', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({
      name: 'outline',
      title: 'Outline',
      type: 'array',
      group: 'structured',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'outlineItem',
          fields: [
            defineField({name: 'heading', title: 'Heading', type: 'string'}),
            defineField({name: 'level', title: 'Level', type: 'number'}),
          ],
          preview: {
            select: {title: 'heading', level: 'level'},
            prepare({title, level}) {
              return {title, subtitle: level ? `H${level}` : undefined}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'jsonLd',
      title: 'JSON-LD (schema.org)',
      type: 'object',
      group: 'structured',
      description:
        'Pre-rendered JSON-LD strings. Inject these verbatim into your page <head> inside <script type="application/ld+json"> tags.',
      fields: [
        defineField({name: 'blogPosting', title: 'BlogPosting', type: 'text', rows: 6}),
        defineField({name: 'faqPage', title: 'FAQPage', type: 'text', rows: 6}),
        defineField({name: 'breadcrumbList', title: 'BreadcrumbList', type: 'text', rows: 6}),
      ],
    }),

    defineField({name: 'wordCount', title: 'Word count', type: 'number', group: 'meta'}),
    defineField({
      name: 'readingTimeMinutes',
      title: 'Reading time (min)',
      type: 'number',
      group: 'meta',
    }),
    defineField({
      name: 'unvoroEntryId',
      title: 'Unvoro entry id',
      type: 'string',
      group: 'meta',
      readOnly: true,
      description: 'Set by Unvoro: the source calendar entry. Do not edit.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
