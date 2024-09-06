import { useContext } from 'react';
import { CreateResumeContext } from './provider';

const useCreateResumeContext = () => {
	const _createResumeContext = useContext(CreateResumeContext);

	console.log('_createResumeContext', _createResumeContext);
	

	if (!_createResumeContext) {
		throw new Error(
			'useCreateResumeContext has to be used within <CreateResumeContext.Provider>'
		);
	}

	return _createResumeContext;
};

export default useCreateResumeContext;
