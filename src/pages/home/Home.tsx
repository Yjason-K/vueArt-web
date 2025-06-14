import { HeroBanner } from '@pages/home/HeroBanner';
import { Recommend } from '@pages/home/Recommend';
import { QuickSearch } from '@pages/home/QuickSearch';
import { SearchList } from '@pages/home/SearchList';
import { ExhTabs } from '@pages/home/ExhTabs';
// import { CommonStore, useCommonStore } from '@/store/common';

const Home = () => {
  // const user = useCommonStore.use.user();
  // const {} = CommonStore((state) => state.user);

  return (
    <>
      <HeroBanner />
      <Recommend />
      <QuickSearch />
      <SearchList />
      <ExhTabs />
    </>
  );
};

export default Home;
