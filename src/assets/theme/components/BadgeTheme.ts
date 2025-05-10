import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

// Define base styles that apply to all badge variants
const baseStyle = {
  borderRadius: 'full',
  px: 3,
  py: 1,
  fontSize: 'xs',
  fontWeight: 'medium',
};

// Define variant styles based on StatusBadge configurations
const upcomingVariant = defineStyle({
  bg: 'offWhite',
  color: 'mediumGray',
});

const bookingOpenVariant = defineStyle({
  bg: 'peach',
  color: 'darkGray',
});

const onGoingVariant = defineStyle({
  bg: 'peach',
  color: 'darkGray',
});

const endedVariant = defineStyle({
  bg: 'mediumGray',
  color: 'offWhite',
});

// Export the badge theme configuration
export const badgeTheme = defineStyleConfig({
  baseStyle,
  variants: {
    upcoming: upcomingVariant,
    bookingOpen: bookingOpenVariant,
    onGoing: onGoingVariant,
    ended: endedVariant,
  },
  defaultProps: {
    variant: 'upcoming',
  },
});
