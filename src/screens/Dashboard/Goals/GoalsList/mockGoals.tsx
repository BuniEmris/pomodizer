import React from 'react'
import Emoji1 from 'assets/images/Dashboard/emoji1.svg'
import Emoji2 from 'assets/images/Dashboard/emoji2.svg'
import { Goal } from 'types'

export const mockGoals = [
  {
    title: 'Finish landing page',
    emoji: <Emoji1 width={30} height={30} />,
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    isMonthly: true,
    status: '0',
    dueData: new Date(),
  },
  {
    title: 'Finish landing page',
    emoji: <Emoji2 width={30} height={30} />,
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    isMonthly: false,
    status: '0',
    dueData: new Date(),
  },
  {
    title: 'Finish landing page',
    emoji: <Emoji2 width={30} height={30} />,
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    isMonthly: false,
    status: '0',
    dueData: new Date(),
  },
]
