import { defineField, defineType, defineArrayMember } from 'sanity';
import { RocketIcon } from '@sanity/icons';

export const productUpdateType = defineType({
  name: 'productUpdate',
  title: 'Product Update',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'version',
      title: 'Version Number',
      type: 'string',
      description: 'e.g., v1.2.0',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updateType',
      title: 'Update Type',
      type: 'string',
      options: {
        list: [
          { title: 'Major Release', value: 'major' },
          { title: 'Feature Update', value: 'feature' },
          { title: 'Enhancement', value: 'enhancement' },
          { title: 'Bug Fix', value: 'bugfix' },
          { title: 'Security Update', value: 'security' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'changes',
      title: 'Changes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'change',
          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'New Features', value: 'new' },
                  { title: 'Improvements', value: 'improvement' },
                  { title: 'Bug Fixes', value: 'fix' },
                  { title: 'Breaking Changes', value: 'breaking' },
                  { title: 'Security', value: 'security' },
                  { title: 'Documentation', value: 'docs' },
                ],
              },
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'technicalDetails',
              title: 'Technical Details',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Featured Changes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'image',
              title: 'Feature Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'relatedDocs',
      title: 'Related Documentation',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Document Title',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'contributors',
      title: 'Contributors',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'author' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      version: 'version',
      updateType: 'updateType',
      date: 'releaseDate',
    },
    prepare({ title, version, updateType, date }) {
      return {
        title: `${version} - ${title}`,
        subtitle: `${new Date(date).toLocaleDateString()} - ${updateType.charAt(0).toUpperCase() + updateType.slice(1)}`,
      };
    },
  },
}); 