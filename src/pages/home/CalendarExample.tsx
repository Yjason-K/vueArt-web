import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Calendar, CalendarEvent } from './Calendar'; // Adjust path as needed
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CalendarExample: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [selectedDateInfo, setSelectedDateInfo] = useState<{
    date: Date;
    events: CalendarEvent[];
  } | null>(null);
  const {
    isOpen: isEventModalOpen,
    onOpen: onEventModalOpen,
    onClose: onEventModalClose,
  } = useDisclosure();
  const {
    isOpen: isDateModalOpen,
    onOpen: onDateModalOpen,
    onClose: onDateModalClose,
  } = useDisclosure();

  const navigate = useNavigate();

  // Sample events - replace with your actual data source
  const sampleEvents: CalendarEvent[] = [
    {
      id: '1',
      startDate: '2025-05-02',
      endDate: '2025-05-02',
      title: '오프라인 매장 검수',
      colorScheme: 'purple',
    },
    {
      id: '2',
      startDate: '2025-05-04',
      endDate: '2025-05-06',
      title: '월급날 & 장보기',
      colorScheme: 'orange',
    },
    {
      id: '3',
      startDate: '2025-05-05',
      endDate: '2025-05-10',
      title: '마케팅 전략 수립 기간',
      colorScheme: 'blue',
    },
    {
      id: '4',
      startDate: '2025-05-11',
      endDate: '2025-05-11',
      title: '필라테스 클래스',
      colorScheme: 'green',
    },
    {
      id: '5',
      startDate: '2025-05-11',
      endDate: '2025-05-13',
      title: '휴 레이션 리트릿',
      colorScheme: 'teal',
    },
    {
      id: '6',
      startDate: '2025-04-28',
      endDate: '2025-05-02',
      title: '전시회 A (지난달에 시작된 이벤트)',
      colorScheme: 'gray',
    },
    {
      id: '7',
      startDate: '2025-05-28',
      endDate: '2025-06-03',
      title: '다음달 뮤지컬 B',
      colorScheme: 'pink',
    },
  ];

  // 날짜 셀 클릭
  const handleDateClick = (date: Date, eventsOnDate: CalendarEvent[]) => {
    setSelectedDateInfo({ date, events: eventsOnDate });
    onDateModalOpen();
  };

  // 이벤트 클릭
  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    onEventModalOpen();
  };

  const handleEventDetail = (id: string) => {
    navigate(`/goods/${id}`);
  };

  return (
    <>
      <Box p={{ base: 2, md: 5 }} maxW="1200px" mx="auto">
        <Calendar
          events={sampleEvents}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      </Box>
      {/* Event Detail Modal */}
      {selectedEvent && (
        <Modal isOpen={isEventModalOpen} onClose={onEventModalClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              bg={
                selectedEvent.colorScheme
                  ? `${selectedEvent.colorScheme}.500`
                  : 'gray.500'
              }
              color="white"
            >
              {selectedEvent.title}
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody py={6}>
              <Text>
                <strong>일정</strong>{' '}
                {`${selectedEvent.startDate} ~ ${selectedEvent.endDate}`}
              </Text>
              <Text mt={2}>
                <strong>상세 내용:</strong>
              </Text>
              <Button onClick={() => handleEventDetail(selectedEvent.id)}>
                <Text fontSize="sm">
                  간단하게 공연 정보 보여줄 수 있어야 하고 상세 페이지로 이동할
                  버튼 필요
                </Text>
              </Button>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onEventModalClose}>닫기</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {/* Date Click Modal */}
      {selectedDateInfo && (
        <Modal isOpen={isDateModalOpen} onClose={onDateModalClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {selectedDateInfo.date.toLocaleDateString()} 일정
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody py={6}>
              {selectedDateInfo.events.length > 0 ? (
                <VStack align="stretch" spacing={3}>
                  {selectedDateInfo.events.map((event) => (
                    <Box
                      key={event.id}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      bg={
                        event.colorScheme
                          ? `${event.colorScheme}.50`
                          : 'gray.50'
                      }
                    >
                      <Text
                        fontWeight="bold"
                        color={
                          event.colorScheme
                            ? `${event.colorScheme}.700`
                            : 'gray.700'
                        }
                      >
                        {event.title}
                      </Text>
                      <Text fontSize="sm">ID: {event.id}</Text>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <Text>이 날짜에는 등록된 일정이 없습니다.</Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                mr={3}
                onClick={() => alert('새 일정 추가 기능 구현 필요')}
              >
                새 일정 추가
              </Button>
              <Button onClick={onDateModalClose}>닫기</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
