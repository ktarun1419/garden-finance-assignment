import { Routes, Route, NavLink } from 'react-router-dom';
import { PriceProvider } from '@/context/PriceContext';
import Summary from '@/pages/Summary';
import ChartPage from '@/pages/ChartPage';
import Statistics from '@/pages/Statistics';
import Analysis from '@/pages/Analysis';
import Settings from '@/pages/Settings';
import Tabs from '@/components/Tabs/Tabs';
import PriceHeader from '@/components/Header/PriceHeader';
import GlobalStyles from './GlobalStyles';

export default function App() {
  return (
    <PriceProvider>
      <GlobalStyles />
      <div>
        <PriceHeader />
        <Tabs />
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </PriceProvider>
  );
}
