import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
	const action = removeExpense({id: '123abc'});
	expect(action).toEqual({
		type:'REMOVE_EXPENSE',
		id:'123abx'
	})
});

test('should setup an action', () => {
	const action = editExpense('123abc', {note:'New note value'});
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {
			note: 'New note value'
		}
	});
});

test('should setup add expense action object with prvided values',() => {
	const expenseData = {
		description: 'rent',
		amount: 109500,
		createdAt: 1000,
		note: 'This was last months rent'
	};
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type:'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String)
		}
	});
};

test('should setup add expense acton obect with default values', () => {
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expenses: {
			id: expect.any(String),
			description: '',
			note: '',
			amount: 0,
			createdAt: 0
		}
	});
});