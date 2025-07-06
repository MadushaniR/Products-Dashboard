import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchProducts, setProducts } from './productSlice';

function* fetchProductsWorker() {
  try {
    // Make API call to fetch products
    const response = yield call(fetch, 'https://dummyjson.com/products');

    // Parse response JSON
    const json = yield response.json();

    // Dispatch action to save products in Redux store
    yield put(setProducts(json.products));
  } catch (err) {
    // Log any errors that occur during fetch
    console.error('Error fetching products', err);
  }
}

export default function* productSaga() {
  // Listen for fetchProducts action and run worker saga
  yield takeLatest(fetchProducts.type, fetchProductsWorker);
}
