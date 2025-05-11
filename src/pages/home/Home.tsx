import { HeroBanner } from '@pages/home/HeroBanner';
import { Recommend } from '@pages/home/Recommend';
import { QuickSearch } from '@pages/home/QuickSearch';
import { SearchList } from '@pages/home/SearchList';

const Home = () => {
  return (
    <>
      <HeroBanner />
      <Recommend />
      <QuickSearch />
      <SearchList />
    </>
  );
};

export default Home;
