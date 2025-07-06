import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchProducts, setProducts } from './productSlice';

function* fetchProductsWorker() {
  try {
    const response = yield call(fetch, 'https://dummyjson.com/products');
    const json = yield response.json();
    yield put(setProducts(json.products));
  } catch (err) {
    console.error('Error fetching products', err);
  }
}

export default function* productSaga() {
  yield takeLatest(fetchProducts.type, fetchProductsWorker);
}
