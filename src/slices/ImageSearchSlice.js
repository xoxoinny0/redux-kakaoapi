import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getKakaoSearch = createAsyncThunk("ImageSearchSlice/getKakaoSearch", async(payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(process.env.REACT_APP_KAKAO_IMAGE_SEARCH_API_URL, {
            params: {
                // 두 개 이상으 파라미터를 json으로 전달할 경우 payload가 json 객체
                query: payload.query,
                page: payload.page? payload.page : 1
            },
            headers: { Authorization : `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`}
        });
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** Slice 정의 */
const ImageSearchSlice = createSlice({
    name: 'ImageSearchSlice',
    initialState: {
        // API의 응답 결과 구조를 고려하여 상태값을 초기화한다.
        data: null,
        loading: false,
        error: null
    },
    reducers: {},
    // 외부 action 및 비동기 action (Ajax용)
    extraReducers: {
        [getKakaoSearch.pending] : (state, { payload }) => {
            return {...state, loading: true}
        },
        [getKakaoSearch.fulfilled] : (state, { meta, payload }) => {
            // action함수의 meta에는 API에 요청시 전송한 파라미터가 포함되어 있다.
            // 1페이지 이후의 검색 결과는 기존 데이터를 덧붙여야 한다.
            if (meta.arg.page > 1) {
                payload.documents = state.data.documents.concat(payload.documents);
                console.log(`누적 데이터 길이=${payload.documents.length}`);
            }
            return {
                data: payload,
                loading : false,
                error: null
            }
        },
        [getKakaoSearch.rejected] : (state, { payload }) => {
           
            return {
                ...state,
                loading: false,
                error: {
                    code: payload?.status ? payload.status : 500,
                    message: payload?.statusText ? payload.statusText : 'Server Error'
                }
            }
        }
    }
});

// 리듀서 객체 내보내기
export default ImageSearchSlice.reducer;