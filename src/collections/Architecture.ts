// collections/Architecture.ts
import { CollectionConfig } from 'payload'

export const Architecture: CollectionConfig = {
  slug: 'architecture',
  admin: {
    useAsTitle: 'title',
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Project Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'Alt',
          type: 'text',
        },
        {
          name: 'orientation',
          type: 'select',
          options: [
            { label: 'Portrait', value: 'portrait' },
            { label: 'Landscape', value: 'landscape' },
          ],
          required: true,
          defaultValue: 'landscape',
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
        description: 'If checked, this project will not be displayed on the website.',
      },
    },
  ],
}
