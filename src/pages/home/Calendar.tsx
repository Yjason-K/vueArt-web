import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Text,
  Tag,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

export interface CalendarEvent {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  title: string;
  colorScheme?: string;
  // Add other event properties if needed:
  // description?: string;
  // startTime?: string; // HH:mm
  // endTime?: string; // HH:mm
  // externalLink?: string;
}

interface CalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: Date, eventsOnDate: CalendarEvent[]) => void;
  onEventClick?: (event: CalendarEvent) => void;
  // Prop to control initial view, could be extended for dynamic view switching
  // initialView?: 'month' | 'week' | 'day';
}

interface DayCellProps {
  dateObj: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
  onDateClick?: (date: Date, eventsOnDate: CalendarEvent[]) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

// --- DayCell Component ---
export const DayCell: React.FC<DayCellProps> = ({
  dateObj,
  isCurrentMonth,
  isToday,
  events,
  onDateClick,
  onEventClick,
}) => {
  const dayNumber = dateObj.getDate();

  // YYYY-MM-DD 문자열로 변환
  // const dateStr = `${dateObj.getFullYear()}-${String(
  //   dateObj.getMonth() + 1,
  // ).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;

  // 클릭 시 날짜와 해당 이벤트 목록 전달
  const handleDateClick = () => {
    onDateClick?.(dateObj, events);
  };

  // 표시할 최대 이벤트 개수 (반응형)
  const maxEventsToShow = useBreakpointValue({ base: 1, sm: 2, md: 3 }) || 2;
  const responsiveTagSize = useBreakpointValue({ base: 'xs', md: 'sm' });

  return (
    <VStack
      borderWidth="1px"
      borderColor="gray.200"
      py={2}
      spacing={0} // 붙어 보이도록 spacing 0
      align="stretch"
      minH={{ base: '70px', sm: '100px', md: '120px' }}
      opacity={isCurrentMonth ? 1 : 0.5}
      bg={isToday ? 'blue.50' : isCurrentMonth ? 'white' : 'gray.50'}
      onClick={handleDateClick}
      cursor={onDateClick ? 'pointer' : 'default'}
      overflow="hidden"
      _hover={isCurrentMonth && onDateClick ? { bg: 'gray.100' } : {}}
      transition="background-color 0.2s"
    >
      {/* 날짜 번호 */}
      <Text
        fontSize={{ base: 'sm', md: 'md' }}
        fontWeight={isToday ? 'bold' : 'normal'}
        color={isToday ? 'blue.600' : 'inherit'}
        alignSelf="flex-start"
      >
        {dayNumber}
      </Text>

      {/* 이벤트 바 표시 */}
      {events.slice(0, maxEventsToShow).map((ev) => {
        // const isStart = dateStr === ev.startDate;
        // const isEnd = dateStr === ev.endDate;
        // const isMiddle =
        //   !isStart && !isEnd && dateStr > ev.startDate && dateStr < ev.endDate;

        return (
          <Tag
            key={ev.id}
            size={responsiveTagSize}
            variant="solid"
            colorScheme={ev.colorScheme || 'gray'}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick?.(ev);
            }}
            cursor={onEventClick ? 'pointer' : 'default'}
            isTruncated
            title={ev.title}
            borderRadius={0}
          >
            {ev.title}
          </Tag>
        );
      })}

      {/* "+N more" 처리 */}
      {events.length > maxEventsToShow && (
        <Text fontSize="xs" color="gray.500" mt="auto !important">
          +{events.length - maxEventsToShow} 더 보기
        </Text>
      )}
    </VStack>
  );
};

// --- Calendar Component ---
export const Calendar: React.FC<CalendarProps> = ({
  events = [],
  onDateClick,
  onEventClick,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Represents the month/year to display

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter((ev) => {
      const start = new Date(ev.startDate);
      const end = new Date(ev.endDate);
      // include if date is between start and end (inclusive)
      return date >= start && date <= end;
    });
  };

  // Generate the array of Date objects to render in the calendar grid (6 weeks)
  const renderCalendarDays = (): Date[] => {
    const monthDays: Date[] = [];
    const firstOfMonth = new Date(currentYear, currentMonth, 1);

    // Start from the Sunday of the week the 1st falls on
    const startDate = new Date(firstOfMonth);
    startDate.setDate(startDate.getDate() - firstOfMonth.getDay()); // getDay() is 0 for Sunday

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      monthDays.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    return monthDays;
  };

  const calendarCells = renderCalendarDays();
  const today = new Date();

  // Note: For a true mobile week/day view switch, you'd conditionally render
  // a different component structure here based on useBreakpointValue or a state variable.
  // const viewMode = useBreakpointValue({ base: 'week', md: 'month' });
  // if (viewMode === 'week') return <WeekViewComponent ... />;

  return (
    <Box
      p={{ base: 2, md: 4 }}
      borderWidth="1px"
      borderRadius="lg"
      shadow="base"
      bg="white"
    >
      <Flex
        justify="space-between"
        align="center"
        mb={4}
        direction={{ base: 'column', sm: 'row' }}
      >
        <Heading
          size={useBreakpointValue({ base: 'sm', md: 'md' })}
          mb={{ base: 2, sm: 0 }}
        >
          {currentYear}년 {currentMonth + 1}월
        </Heading>
        <Flex align="center">
          <Button
            size={useBreakpointValue({ base: 'sm', md: 'md' })}
            onClick={goToToday}
            variant="outline"
            mr={2}
          >
            오늘
          </Button>
          <IconButton
            aria-label="Previous month"
            icon={<ChevronLeftIcon />}
            onClick={prevMonth}
            size={useBreakpointValue({ base: 'sm', md: 'md' })}
            variant="ghost"
          />
          <IconButton
            aria-label="Next month"
            icon={<ChevronRightIcon />}
            onClick={nextMonth}
            size={useBreakpointValue({ base: 'sm', md: 'md' })}
            variant="ghost"
          />
        </Flex>
      </Flex>

      <Grid
        templateColumns="repeat(7, 1fr)"
        gap={0}
        borderTopWidth="1px"
        borderLeftWidth="1px"
        borderColor="gray.200"
      >
        {weekdays.map((day) => (
          <Text
            key={day}
            textAlign="center"
            fontWeight="semibold"
            fontSize={{ base: 'xs', md: 'sm' }}
            p={2}
            borderRightWidth="1px"
            borderBottomWidth="1px"
            borderColor="gray.200"
            bg="gray.50"
            color="gray.600"
          >
            {day}
          </Text>
        ))}
        {calendarCells.map((dateCell) => {
          const isCellInCurrentMonth = dateCell.getMonth() === currentMonth;
          const dayEvents = getEventsForDate(dateCell);
          const isTodayFlag =
            dateCell.getFullYear() === today.getFullYear() &&
            dateCell.getMonth() === today.getMonth() &&
            dateCell.getDate() === today.getDate();

          return (
            <DayCell
              key={dateCell.toISOString()}
              dateObj={dateCell}
              isCurrentMonth={isCellInCurrentMonth}
              isToday={isTodayFlag}
              events={dayEvents}
              onDateClick={onDateClick}
              onEventClick={onEventClick}
            />
          );
        })}
      </Grid>
    </Box>
  );
};
