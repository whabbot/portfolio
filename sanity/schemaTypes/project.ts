import {RocketIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

const portableText = (opts: {name: string; title: string; description?: string}) =>
  defineField({
    name: opts.name,
    title: opts.title,
    description: opts.description,
    type: 'array',
    of: [defineArrayMember({type: 'block'})],
  })

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.current) return 'Slug is required'
          if (!/^[a-z0-9-]+$/.test(value.current))
            return 'Use lowercase letters, numbers, and hyphens'
          return true
        }),
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'string',
      validation: (rule) => [
        rule.required(),
        rule.max(180).warning('Keep this under 180 characters for cards and listings'),
      ],
    }),
    defineField({
      name: 'techTags',
      title: 'Tech tags',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().unique().max(5),
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).warning('Use a full URL starting with https://'),
    }),
    defineField({
      name: 'demoUrl',
      title: 'Demo URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).warning('Use a full URL starting with https://'),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),

    portableText({
      name: 'problem',
      title: 'Problem',
    }),
    portableText({
      name: 'whyItMattered',
      title: 'Why it mattered',
    }),
    portableText({
      name: 'constraints',
      title: 'Constraints',
    }),
    portableText({
      name: 'architectureDecisions',
      title: 'Architecture decisions',
    }),
    portableText({
      name: 'tradeoffs',
      title: 'Tradeoffs',
    }),
    portableText({
      name: 'outcomes',
      title: 'Outcomes',
    }),
    portableText({
      name: 'improve',
      title: 'What I’d improve',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      featured: 'featured',
      techTags: 'techTags',
    },
    prepare: (value) => {
      const tagCount = Array.isArray(value.techTags) ? value.techTags.length : 0
      const parts = [
        value.featured ? 'Featured' : undefined,
        tagCount ? `${tagCount} tag${tagCount === 1 ? '' : 's'}` : undefined,
      ].filter(Boolean)

      return {
        title: value.title || 'Project',
        subtitle: parts.join(' • '),
      }
    },
  },
  orderings: [
    {title: 'Sort order', name: 'sortOrderAsc', by: [{field: 'sortOrder', direction: 'asc'}]},
    {title: 'Title', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]},
  ],
})
