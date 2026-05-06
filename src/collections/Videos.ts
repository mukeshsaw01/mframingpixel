import type { CollectionConfig } from 'payload'

const youtubeURLPattern =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]{11}([&?].*)?$/

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'videos',
      type: 'array',
      label: 'Video Collection',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'youtubeURL',
          label: 'YouTube URL',
          type: 'text',
          required: true,
          validate: (value) => {
            if (typeof value !== 'string') return 'Please provide a YouTube URL.'
            if (!youtubeURLPattern.test(value.trim())) {
              return 'Please enter a valid YouTube watch or share URL.'
            }
            return true
          },
        },
      ],
    },
    {
      name: 'archive',
      type: 'checkbox',
      label: 'Archive',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'If checked, this video will not be displayed on the website.',
      },
    },
  ],
}
