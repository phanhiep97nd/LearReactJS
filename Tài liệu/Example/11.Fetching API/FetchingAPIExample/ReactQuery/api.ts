import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const requestToken = process.env.REACT_APP_REQUEST_TOKEN;

/**
 * Function log error
 */
const logError = async (message: string, error: unknown) => {
	console.error(message, error);
	// Ghi log
	try {
	await axios.post('/api/logError', {
		message,
		error: error instanceof Error ? error.message : String(error)
	});
	} catch (logError) {
	console.error('Error logging to external service', logError);
	}
};

/**
 * Function tạo session
 */
const createSession = async () => {
	try {
	const response = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`, {
		request_token: requestToken
	});
	return response.data.session_id;
	} catch (error) {
	await logError('Error creating session', error);
	throw new Error('Có lỗi bất thường khi thao tác');
	}
};

/**
 * Function xóa session
 */
const deleteSession = async (sessionId: string) => {
	try {
	const response = await axios.delete(`https://api.themoviedb.org/3/authentication/session?api_key=${apiKey}`, {
		data: { session_id: sessionId }
	});
	if (response.status !== 200) {
		throw new Error('Failed to delete session');
	}
	} catch (error) {
	await logError('Error deleting session', error);
	throw new Error('Có lỗi bất thường khi thao tác');
	}
};

/**
 * Thực hiện tạo channel
 */
const performApiPost = async ({ sessionId, channelName, channelDescription }: 
	{ sessionId: string, channelName: string, channelDescription: string }) => {
	try {
	const response = await axios.post(`https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`, {
		name: channelName,
		description: channelDescription,
		language: "en"
	});
	return response.data;
	} catch (error) {
	await logError('Error performing API POST', error);
	throw new Error('Có lỗi bất thường khi thao tác');
	}
};

/**
 * Lấy dữ liệu danh sách movie
 */
const fetchGenres = async () => {
	const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=en`, {
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${apiKey}`,
	},
	});
	return response.data.genres;
};

/**
 * Custom hook thực hiện việc tạo session
 */
export const useCreateSession = () => {
	const queryClient = useQueryClient();
	return useMutation({
	mutationFn: createSession,
	onSuccess: () => {
		// Vô hiệu hóa và refetch query trong cache dựa theo các query key để react query tìm nạp lại
		// dữ liệu đó. Lúc này dữ liệu liên quan đến query key ['session'] được nạp lại
		// (data được nạp vào cache với thông tin session vừa tạo)
		queryClient.invalidateQueries({queryKey: ['session']});
	}
	});
};

/**
 * Custom hook thực hiện việc xóa session
 */
export const useDeleteSession = () => {
	const queryClient = useQueryClient();
	return useMutation({
	mutationFn: deleteSession,
	onSuccess: () => {
		// Vô hiệu hóa và refetch query trong cache dựa theo các query key để react query tìm nạp lại
		// dữ liệu đó. Lúc này dữ liệu liên quan đến query key ['session'] được nạp lại
		// (data được nạp vào cache với thông tin session vừa xóa - hiểu là hiện tại cache dữ liệu session là rỗng)
		queryClient.invalidateQueries({ queryKey: ['session'] });
	}
	});
};

/**
 * Custom hook thực hiện việc tạo kênh
 */
export const usePerformApiPost = () => {
	const queryClient = useQueryClient();
	return useMutation({
	mutationFn: performApiPost,
	onSuccess: (data) => {
		// Cập nhật thông tin dữ liệu. Giả định sau khi tạo kênh thành công, server trả về dữ liệu kênh
		// vừa được tạo trong data. Lúc này, đối tượng oldData được cập nhật mới theo các giá trị hiện
		// tại trong data
		queryClient.setQueryData(['channels'], (oldData: any) => [...oldData, data]);
	}
	});
};

// Type của dữ liệu trả về
type DataType = {
	id: string,
	name: string
}

/**
 * Custom hook thực hiện việc lấy dữ liệu
 */
export const useGenres = () => {
	const queryClient = useQueryClient();
	return useQuery<DataType[]>({
	queryKey: ['genres'],
	queryFn: fetchGenres
	}, queryClient);
};