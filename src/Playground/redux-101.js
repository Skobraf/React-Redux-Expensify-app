import { createStore} from 'redux';

const incrementCount = (payload = {}) => {
	return {
		type: 'INCREMENT',
		incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
	} 
		
}

const countReducer = (state = { count: 0}, action) => {
	switch(action.type) {
		case 'INCREMENT':
			return {
				count: state.count +action.incrementBy
			};
	}
}
