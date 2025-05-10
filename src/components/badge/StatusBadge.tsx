import { Badge } from '@chakra-ui/react';
import type { BadgeProps } from '@chakra-ui/react';

export type ExhibitionStatus = 'upcoming' | 'bookingOpen' | 'onGoing' | 'ended';

interface StatusBadgeProps extends BadgeProps {
  status: ExhibitionStatus;
}

const statusConfig: Record<ExhibitionStatus, { text: string }> = {
  upcoming: {
    text: '시작 전',
  },
  bookingOpen: {
    text: '예매 중',
  },
  onGoing: {
    text: '진행 중',
  },
  ended: {
    text: '종료',
  },
};

export const StatusBadge = ({ status, ...badgeProps }: StatusBadgeProps) => {
  const { text } = statusConfig[status];

  return (
    <Badge
      position="absolute"
      bottom={2}
      left={2}
      variant={status}
      {...badgeProps}
    >
      {text}
    </Badge>
  );
};
