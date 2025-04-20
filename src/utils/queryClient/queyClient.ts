import { keepPreviousData, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // [1분] 데이터 fetch 후, fresh 상태에서 stale 상태로 변경되는 시간 - default : 0 (0 이상으로 설정한 경우 fetch 요청을 해도 stale 데이터 사용)
      gcTime: 120000, // [2분] 데이터를 사용하지 않거나 inactive 상태일때 캐싱 된 상태로 남아있는 시간(밀리초), 모든 컴포넌트가 마운트 해제되는 시점에서 inactive 상태로 전환  - default : 300000(5분)
      refetchOnWindowFocus: false, // 데이터가 stale 상태일 경우 윈도우 포커싱 될 때 마다 refetch를 실행하는 옵션 - default : true
      refetchOnMount: true, // 데이터가 stale 상태일 경우 컴포넌트 mount 시 마다 refetch를 실행하는 옵션 - default : true
      refetchOnReconnect: true, // 네트워크 연결이 다시 설정될때 데이터를 다시 가져와야 하는지 여부 - default : true
      refetchInterval: false, // 시간(ms)을 값으로 넣어주면 일정 시간 마다 자동으로 refetch 해주는 옵션
      refetchIntervalInBackground: false, // 브라우저 탭, 창이 백드라운드에 있는 동안 refetch 해주는 옵션
      throwOnError: true, // Error Boundary 설정을 위한 옵션
      placeholderData: keepPreviousData, // 이전 데이터를 유지하기 위한 옵션
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
