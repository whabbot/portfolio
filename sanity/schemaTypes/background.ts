import {CaseIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

function formatTimelineLabel(opts: {
  startDate?: string
  endDate?: string
  timelineLabel?: string
}): string | undefined {
  if (opts.timelineLabel?.trim()) return opts.timelineLabel.trim()
  if (!opts.startDate) return undefined

  const start = new Date(opts.startDate)
  const end = opts.endDate ? new Date(opts.endDate) : undefined

  const fmt = (d: Date) =>
    new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    }).format(d)

  return end ? `${fmt(start)}–${fmt(end)}` : `${fmt(start)}–Present`
}

export const background = defineType({
  name: 'background',
  title: 'Background Item',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'employerType',
      title: 'Employer type',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'date',
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = context.document?.startDate as string | undefined
          if (!startDate || !endDate) return true
          if (new Date(endDate) < new Date(startDate)) return 'End date must be after start date'
          return true
        }),
    }),
    defineField({
      name: 'timelineLabel',
      title: 'Timeline label (override)',
      type: 'string',
      description: 'Optional override for display (e.g., “Summer 2021”).',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule.required().max(240).warning('Keep it concise (≤ 240 chars works best on the homepage).'),
    }),
    defineField({
      name: 'bullets',
      title: 'Bullets',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .error('Add at least one bullet.')
          .max(6)
          .warning('Consider keeping this to 6 bullets or fewer.')
          .unique(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {
      employerType: 'employerType',
      jobTitle: 'jobTitle',
      startDate: 'startDate',
      endDate: 'endDate',
      timelineLabel: 'timelineLabel',
    },
    prepare: (value) => {
      const timeline = formatTimelineLabel({
        startDate: value.startDate,
        endDate: value.endDate,
        timelineLabel: value.timelineLabel,
      })

      return {
        title: value.jobTitle || 'Background Item',
        subtitle: [value.employerType, timeline].filter(Boolean).join(' • '),
      }
    },
  },
  orderings: [
    {
      title: 'Sort order',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
})

