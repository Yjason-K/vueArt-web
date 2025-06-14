import type { StateCreator, StoreApi, UseBoundStore } from 'zustand';
import { devtools, PersistStorage } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

/**
 * Zustand store에 Persist 미들웨어를 적용하는 함수
 * @template T - Store의 상태 타입
 * @param {StateCreator<T, [], []>} config - 초기 store 설정
 * @param {Object} options - Persist 옵션
 * @param {string} options.name - 저장소 이름
 * @param {Function} [options.partialize] - 저장할 상태를 선택하는 함수
 * @param {PersistStorage} [options.storage] - 저장소 구현체
 * @param {number} [options.version] - 저장소 버전
 * @returns {StateCreator<T, [], [['zustand/persist', Partial<T>]]>} Persist가 적용된 store 생성자
 */
export const withPersist = <T>(
  config: StateCreator<T, [], []>,
  options: {
    name: string;
    partialize?: (state: T) => Partial<T>;
    storage?: PersistStorage<Partial<T>>;
    version?: number;
  },
): StateCreator<T, [], [['zustand/persist', Partial<T>]]> =>
  persist(config, options);

/**
 * Zustand store에 Devtools 미들웨어를 적용하는 함수
 * @template T - Store의 상태 타입
 * @param {StateCreator<T, [], []>} config - 초기 store 설정
 * @param {string} storeName - Redux DevTools에서 표시될 store 이름
 * @returns {StateCreator<T, [], [['zustand/devtools', never]]>} Devtools가 적용된 store 생성자
 */
export const withDevtools = <T>(
  config: StateCreator<T, [], []>,
  storeName: string,
): StateCreator<T, [], [['zustand/devtools', never]]> =>
  devtools(config, { name: storeName });

/**
 * Zustand store에 Persist와 Devtools 미들웨어를 순차적으로 적용하는 함수
 * @template T - Store의 상태 타입
 * @param {StateCreator<T, [], []>} config - 초기 store 설정
 * @param {string} storeName - Redux DevTools에서 표시될 store 이름
 * @param {Object} [options] - Persist 옵션
 * @param {Function} [options.partialize] - 저장할 상태를 선택하는 함수
 * @param {PersistStorage} [options.storage] - 저장소 구현체
 * @param {number} [options.version] - 저장소 버전
 * @returns {StateCreator<T, [], [['zustand/devtools', never], ['zustand/persist', Partial<T>]]>} Persist와 Devtools가 적용된 store 생성자
 */
export const withDevtoolsAndPersist = <T>(
  config: StateCreator<T, [], []>,
  storeName: string,
  options?: {
    partialize?: (state: T) => Partial<T>;
    storage?: PersistStorage<Partial<T>>;
    version?: number;
  },
): StateCreator<
  T,
  [],
  [['zustand/devtools', never], ['zustand/persist', Partial<T>]]
> =>
  devtools(persist(config, { name: storeName, ...options }), {
    name: storeName,
  });

// store 데이터 셀렉터 문법 사용 적용
type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

/**
 * Zustand 스토어 객체에 `.use` 프로퍼티를 붙여 상태 타입 T의 각 키별로 selector 훅을 자동 생성.
 * @template T - 스토어 상태 객체의 타입
 * @template S - zustand의 UseBoundStore<StoreApi<T>> 타입
 * @param {S} store - Zustand 스토어 인스턴스
 * @returns {S & { use: { [K in keyof T]: () => T[K] } }} selector 훅이 추가된 스토어
 */
export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

/**
 * Proxy 기반으로 selector 훅을 lazy하게 생성
 * 실제로 사용되는 키에 대해서만 selector 훅을 생성합니다.
 * @template T - 스토어 상태 객체의 타입
 * @template S - zustand의 UseBoundStore<StoreApi<T>> 타입
 * @param {S} store - Zustand 스토어 인스턴스
 * @returns {S & { use: { [K in keyof T]: () => T[K] } }} selector 훅이 추가된 스토어
 */
export function createSelectorsProxy<
  T extends object,
  S extends UseBoundStore<StoreApi<T>>,
>(store: S) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cache = new Map<keyof T, () => any>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handler: ProxyHandler<Record<string, any>> = {
    get(_, prop: string) {
      if (!cache.has(prop as keyof T)) {
        cache.set(prop as keyof T, () =>
          store((state) => state[prop as keyof T]),
        );
      }
      return cache.get(prop as keyof T);
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useProxy = new Proxy({} as Record<string, any>, handler);

  return Object.assign(store, {
    use: useProxy as { [K in keyof T]: () => T[K] },
  });
}
