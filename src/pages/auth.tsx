import { useNavigate } from 'react-router-dom';
import baseAxios from '../api/baseAxios';
import parseCookie from '../utils/parseCookie';
import { useCallback, useEffect } from 'react';

async function sendTokenToBotExt(jwt: string) {
	const response = await chrome.runtime.sendMessage(
		'bbbjiafbjddogiodpkbjfcjnoalgklgn',
		{ jwt }
	);
	if (!response.success) {
		console.log('error sending message', response);
		throw response;
	}
	console.log('Sucesss ::: ', response.message);
}

const AuthPage = () => {
	const navigate = useNavigate();

	const revalidate = useCallback(async () => {
		try {
			await baseAxios.get('/revalidate');
			sendTokenToBotExt(parseCookie(document.cookie).spirogyra);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			if (error.name === 'AxiosError') {
				if (error.response.data.name === 'TokenExpiredError') {
					alert('Your session has expired');
					navigate('/login?redirect=/auth');
				}
			}
		}
	}, [navigate]);

	useEffect(() => {
		revalidate();
	}, [revalidate]);

	return <></>;
};

export default AuthPage;
