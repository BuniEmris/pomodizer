import React from 'react'
import Emoji1 from 'assets/images/Dashboard/emoji1.svg'
import Emoji2 from 'assets/images/Dashboard/emoji2.svg'
import { colors } from 'styles'

export const mockCarouselInfo = [
  {
    id: 0,
    name: 'Goals',
    goals: [
      { name: 'Finish landing page', emoji: <Emoji1 width={18} height={18} /> },
      { name: 'Finish landing page', emoji: <Emoji2 width={18} height={18} /> },
      { name: 'Finish landing page', emoji: <Emoji2 width={18} height={18} /> },
    ],
  },
  {
    id: 1,
    name: 'Notes',
    notes: [
      { name: 'Moodboard for illustrations', date: '23.05.2020 13:10' },
      { name: 'Moodboard for illustrations', date: '23.05.2020 13:10' },
    ],
  },
]

export const mockTasks = [
  {
    id: 0,
    name: 'Creating the first block for landing page',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    heshtag: 'LANDINGPAGE',
    date: '12 SEP 2020',
    time: '10 pm',
    color: colors.LIGHT_PINK,
    pomidors: 4,
  },
  {
    id: 1,
    name: 'Creating the first block for landing page',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    heshtag: 'MOBILEAPP',
    date: '12 SEP 2020',
    time: '12 pm',
    color: colors.LEMON,
    pomidors: 2,
  },
]
