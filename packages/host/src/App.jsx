import './App.css';
import Button from 'remoteApp/Button';
import { useSharedState } from 'remoteApp/MyProvider';
import ProductPieChart from 'remoteApp/ProductPieChart';
import Filter from './components/Filter';

const sampleData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Books', value: 200 },
  { name: 'Home', value: 100 },
];

function App() {
  const { count, increment } = useSharedState();

  const handleFilter = (filters) => {
    console.log('Applied Filters:', filters);
    // You can implement actual filtering logic
  };

  return (
    <>
      <h1>MicroFrontend Dashboard</h1>
      <button onClick={increment}>Count: {count}</button>
      <Button />

      <h2>Product Categories</h2>
      <ProductPieChart data={sampleData} />

      <h2>Filter Products</h2>
      <Filter onFilter={handleFilter} />
    </>
  );
}

export default App;
