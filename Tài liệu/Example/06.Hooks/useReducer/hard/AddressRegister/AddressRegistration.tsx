import React, { useEffect, useReducer } from 'react';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './AddressRegistration.module.css';
import { fetchCities, fetchDistricts, fetchWards } from './backend/DataFetching';

// Định nghĩa interface cho state
// Các thông tin sẽ quản lý trong state:
// - upperZipCode - code zip upper đang được nhập
// - lowerZipCode - code zip lower đang được nhập
// - selectedCity - thông tin thành phố đang được chọn
// - selectedDistrict - thông tin quận đang được chọn
// - selectedWard - thông tin huyện đang được chọn
// - engCityName - thông tin tên đang được chọn
// - cityDistrictWardCombination - thông tin thành phố, quận, huyện được kết hợp lại
// - cities: danh sách thành phố lấy từ backend
// - districts: danh sách quận lấy từ backend
// - wards: danh sách phường lấy từ backend
interface AddressRegisterState {
  upperZipCode: string;
  lowerZipCode: string;
  selectedCity: string;
  selectedDistrict: string;
  selectedWard: string;
  engCityName: string;
  cityDistrictWardCombination: string;
  cities: string[],
  districts: string[];
  wards: string[];
}

// Danh sách các action type với dữ liệu tương ứng khi đăng ký thông tin địa chỉ
type Action =
  | { type: 'SET_UPPER_ZIP_CODE'; payload: string } // Thiết lập type cho upper zip code
  | { type: 'SET_LOWER_ZIP_CODE'; payload: string } // Thiết lập type cho lower zip code
  | { type: 'SET_SELECTED_CITY'; payload: string; engCityName: string } // Thiết lập type cho thành phố đã chọn
  | { type: 'SET_SELECTED_DISTRICT'; payload: string } // Thiết lập type cho quận đã chọn
  | { type: 'SET_SELECTED_WARD'; payload: string } // Thiết lập type cho phường đã chọn
  | { type: 'SET_CITIES'; payload: string[] } // Thiết lập type cho danh sách thành phố đã chọn
  | { type: 'SET_DISTRICTS'; payload: string[] } // Thiết lập type cho danh sách quận đã chọn
  | { type: 'SET_WARDS'; payload: string[] } // Thiết lập type cho danh sách phường đã chọn
  | { type: 'SET_CITY_DISTRICT_WARD_COMBINATION'; payload: string } // Thiết lập danh sách kết hợp thành phố, quận, phường đã chọn
  | { type: 'RESET' }; // Thiết lập type cho việc reset dữ liệu

// Init state
const initialAddressRegisterState: AddressRegisterState = {
  upperZipCode: '',
  lowerZipCode: '',
  selectedCity: '',
  selectedDistrict: '',
  selectedWard: '',
  engCityName: '',
  cityDistrictWardCombination: '',
  cities: [],
  districts: [],
  wards: []
};

/**
 * reducer function dành cho việc xử lý state. Với mỗi một hoạt động thì thông tin mới được cập nhật vào state thông qua các action
 * @param state trạng thái state hiện tại
 * @param action action tương ứng, trong đó thiết lập type cho từng action
 * @returns giá trị state mới sau khi đã xử lý action
 */
function reducer(state: AddressRegisterState, action: Action): AddressRegisterState {
  switch (action.type) {
    case 'SET_UPPER_ZIP_CODE':
      return { ...state, upperZipCode: action.payload };
    case 'SET_LOWER_ZIP_CODE':
      return { ...state, lowerZipCode: action.payload };
    case 'SET_SELECTED_CITY':
      return {
        ...state,
        selectedCity: action.payload,
        engCityName: action.engCityName,
        selectedDistrict: '',
        selectedWard: '',
        districts: [],
        wards: []
      };
    case 'SET_SELECTED_DISTRICT':
      return {
        ...state,
        selectedDistrict: action.payload,
        selectedWard: '',
        wards: []
      };
    case 'SET_SELECTED_WARD':
      return { ...state, selectedWard: action.payload };
    case 'SET_DISTRICTS':
      return { ...state, districts: action.payload };
    case 'SET_WARDS':
      return { ...state, wards: action.payload };
    case 'SET_CITY_DISTRICT_WARD_COMBINATION':
      return { ...state, cityDistrictWardCombination: action.payload };
    case 'RESET':
      return initialAddressRegisterState;
    default:
      return state;
  }
}

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      enabled: false
    }
  }
})

/**
 * Component này dùng cho việc đăng ký thông tin địa chỉ. Sử dụng useReducer để quản lý state 
 */
const AddressRegistration: React.FC = () => {
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /// Hooks
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  const [state, dispatch] = useReducer(reducer, initialAddressRegisterState);
  const queryClient = useQueryClient(defaultQueryClient);

  const {data: cities, isSuccess: isSuccessSearchCities} = useQuery({
    queryKey: ['cities', state.upperZipCode, state.lowerZipCode],
    queryFn: () => fetchCities(state.upperZipCode, state.lowerZipCode),
    enabled: !!state.upperZipCode && !!state.lowerZipCode,
  }, queryClient);

  useEffect(() => {
    if (isSuccessSearchCities) {
      dispatch({ type: 'SET_SELECTED_CITY', payload: '', engCityName: '' });
      dispatch({ type: 'SET_CITIES', payload: cities });
      dispatch({ type: 'RESET' });
    }
  }, [isSuccessSearchCities]);

  const {data: districts, isSuccess: isSuccessSearchDistricts} = useQuery({
    queryKey: ['districts', state.selectedCity],
    queryFn: () => fetchDistricts(state.selectedCity),
    enabled: !!state.selectedCity,
  }, queryClient);

  useEffect(() => {
    if (isSuccessSearchDistricts) {
      dispatch({ type: 'SET_DISTRICTS', payload: districts });
    }
  }, [isSuccessSearchDistricts]);

  const { data: wards, isSuccess: isSuccessSearchWards } = useQuery(
    {
      queryKey: ['wards', state.selectedDistrict],
      queryFn: () => fetchWards(state.selectedDistrict),
      enabled: !!state.selectedDistrict,
    }, queryClient
  );

  useEffect(() => {
    if (isSuccessSearchWards) {
      dispatch({ type: 'SET_WARDS', payload: wards });
    }
  }, [isSuccessSearchWards]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /// Actions
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSearchCity = async () => {
    dispatch({ type: 'RESET' });
    const upperZipCode = state.upperZipCode;
    const lowerZipCode = state.lowerZipCode;

    queryClient.invalidateQueries({
      queryKey: ['cities', upperZipCode, lowerZipCode]
    }, {
      cancelRefetch: false
    });
  };

  const handleCityChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
    dispatch({ type: 'SET_SELECTED_CITY', payload: selectedCity, engCityName: selectedCity });
    if (selectedCity) {
      queryClient.invalidateQueries({
        queryKey: ['districts', selectedCity]
      }, {
        cancelRefetch: false
      });
    }
  };

  const handleDistrictChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = event.target.value;
    dispatch({ type: 'SET_SELECTED_DISTRICT', payload: selectedDistrict });
    if (selectedDistrict) {
      queryClient.invalidateQueries({
        queryKey: ['wards', selectedDistrict]
      }, {
        cancelRefetch: false
      });
    }
  };

  const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWard = event.target.value;
    dispatch({ type: 'SET_SELECTED_WARD', payload: selectedWard });
    if (state.selectedCity && state.selectedDistrict && selectedWard) {
      const combination = `${state.selectedCity}, ${state.selectedDistrict}, ${selectedWard}`;
      dispatch({ type: 'SET_CITY_DISTRICT_WARD_COMBINATION', payload: combination });
    }
  };

  return (
    <div className={styles.addressForm}>
      <h2>Address Registration</h2>
      <div className={styles.label}>
        <label>Upper Zip Code:</label>
        <input
          type="text"
          className={styles.input}
          value={state.upperZipCode}
          onChange={(e) => dispatch({ type: 'SET_UPPER_ZIP_CODE', payload: e.target.value })}
        />
      </div>
      <div className={styles.label}>
        <label>Lower Zip Code:</label>
        <input
          type="text"
          className={styles.input}
          value={state.lowerZipCode}
          onChange={(e) => dispatch({ type: 'SET_LOWER_ZIP_CODE', payload: e.target.value })}
        />
      </div>
      <button
        className={styles.button}
        onClick={handleSearchCity}
        disabled={!state.upperZipCode || !state.lowerZipCode}
      >
        Tìm kiếm
      </button>
      <div className={styles.label}>
        <label>Thành phố:</label>
        <select
          className={styles.select}
          value={state.selectedCity}
          onChange={handleCityChange}
        >
          <option value="">Chọn thành phố</option>
          {state.cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.label}>
        <label>Tên thành phố (tiếng Anh):</label>
        <input type="text" className={styles.input} value={state.engCityName} disabled />
      </div>
      <div className={styles.label}>
        <label>Quận:</label>
        <select
          className={styles.select}
          value={state.selectedDistrict}
          onChange={handleDistrictChange}
        >
          <option value="">Chọn quận</option>
          {state.districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.label}>
        <label>Phường:</label>
        <select className={styles.select} value={state.selectedWard} onChange={handleWardChange}>
          <option value="">Chọn phường</option>
          {state.wards.map((ward) => (
            <option key={ward} value={ward}>
              {ward}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.label}>
        <label>Địa chỉ đầy đủ:</label>
        <input
          type="text"
          className={`${styles.input} ${styles.disabled}`}
          value={state.cityDistrictWardCombination}
          disabled
        />
      </div>
    </div>
  );
};

export default AddressRegistration;
