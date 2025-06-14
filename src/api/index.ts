import { createAxiosInstance } from '@/utils/axios';
import { apiModule } from '@utils/axios/module';

const AuthApi = createAxiosInstance({
  baseURL: apiModule.vueArt.url + apiModule.vueArt.subModule?.auth?.url,
  auth: false,
});

const UserApi = createAxiosInstance({
  baseURL: apiModule.vueArt.url + apiModule.vueArt.subModule?.user?.url,
  auth: true,
});

const CategoryApi = createAxiosInstance({
  baseURL: apiModule.vueArt.url + apiModule.vueArt.subModule?.category?.url,
  auth: true,
});

const ExhibitionApi = createAxiosInstance({
  baseURL: apiModule.vueArt.url + apiModule.vueArt.subModule?.exhibition?.url,
  auth: true,
});

const FavoriteCategoryApi = createAxiosInstance({
  baseURL:
    apiModule.vueArt.url + apiModule.vueArt.subModule?.favoriteCategory?.url,
  auth: true,
});

const NotificationApi = createAxiosInstance({
  baseURL: apiModule.vueArt.url + apiModule.vueArt.subModule?.notification?.url,
  auth: true,
});

const ReservationApi = createAxiosInstance({
  baseURL: apiModule.vueArt.url + apiModule.vueArt.subModule?.reservation?.url,
  auth: true,
});

const SubscriptionApi = createAxiosInstance({
  baseURL: apiModule.vueArt.url + apiModule.vueArt.subModule?.subscription?.url,
  auth: true,
});

const TicketApi = createAxiosInstance({
  baseURL: apiModule.vueArt.url + apiModule.vueArt.subModule?.ticket?.url,
  auth: true,
});

export {
  AuthApi,
  UserApi,
  CategoryApi,
  ExhibitionApi,
  FavoriteCategoryApi,
  NotificationApi,
  ReservationApi,
  SubscriptionApi,
  TicketApi,
};
