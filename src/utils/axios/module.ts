/**
 * API 경로 모듈 정의 파일
 *
 * 이 파일은 애플리케이션에서 사용하는 모든 API 엔드포인트를 중앙 집중식으로 관리합니다.
 * 각 서비스 모듈과 하위 모듈의 URL을 구조화된 방식으로 정의합니다.
 */

/**
 * Module 인터페이스
 *
 * 재귀적 구조로 API 모듈과 하위 모듈을 표현합니다.
 * @property [key: string] - 모듈 이름을 키로 사용
 * @property url - 모듈의 기본 URL 경로
 * @property subModule - 선택적 하위 모듈 객체 (재귀적 구조)
 *
 *  @example
 * // 단일 모듈 예시
 * const authModule: Module = {
 *   auth: {
 *     url: 'https://api.example.com/auth',
 *     subModule: {
 *       login: { url: '/login' },
 *       register: { url: '/register' }
 *     }
 *   }
 * };
 */
interface Module {
  [key: string]: {
    url: string;
    subModule?: Module;
  };
}

/**
 * API 모듈 정의
 *
 * 환경 변수(.env)에서 각 서비스의 기본 URL을 가져와 사용합니다.
 * 서비스별로 구조화된 API 엔드포인트 맵을 제공합니다.
 *
 */
// Auth, User, Category, Exhibition, Favorite Category, Notification, Reservation, Subscription, Ticket
export const module: Module = {
  auth: {
    url: import.meta.env.VITE_API_URL,
    subModule: {
      login: {
        url: '/auth',
      },
      user: {
        url: '/user',
      },
      category: {
        url: '/category',
      },
      exhibition: {
        url: '/exhibition',
      },
      favoriteCategory: {
        url: '/favorite-category',
      },
      notification: {
        url: '/notification',
      },
      reservation: {
        url: '/reservation',
      },
      subscription: {
        url: '/subscription',
      },
      ticket: {
        url: '/ticket',
      },
    },
  },
};
