import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'

//ADD_EXPENSE

const addExpense = (
	{
		 description = '',
		 note = '',
		 amount = 0,
		 createdAt = 0
		} = {}
		) =>( {
			type: 'ADD_EXPENSE',
			expense: {
				id: uuid(),
				desctiption,
				note,
				amount,
				createdAt
			}
	});
//REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
			type: 'REMOVE_EXPENSE',
			id
});

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
});
//SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
	type:'SET_TEXT_FILTER',
	text
});
//SORT_BY_AMOUNT
const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT'
});

//SORT_BY_DATE
const sortByDate = () => ({
	type: 'SORT_BY_DATE'
});
//SET_START_DATE
const setStartDate = (startDate) => ({
	type:'SET_START_DATE',
	startDate
});
//SET_END_DATE
const setEndtDate = (startDate) => ({
	type:'SET_END_DATE',
	endDate
});

//Expenses reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state =expensesReducerDefaultState ,action) => {
	switch(action.type) {
		case 'ADD_EXPENSE':
			return [
				...state,
				action.expense
			];
		case 'REMOVE_EXPENSE':
			return state.filter(({id}) =>  id !== action.id);
		case 'EDIT_EXPENSE':
			return state.map((expense) => {
				if(expense.id === action.id) {
					return {
						...expense,
						...action.updates
					}
				}else {
					return expense;
				}
			})
		default:
			return state;
	}
};

//Filters Reducer

const = filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate:undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch(action.type) {
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text: action.text
			};
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy: 'amount'
			};
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy: 'date'
			};
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.startDate
			};
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.endDate
			}
		default:
			return state;
	}
}
//timestamps

//Get visible expenses

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
	return exenses.filter((expense) =>{
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
		const textMatch = expense.description.toLowerCase().include(text.toLowerCase());

		return startDateMatch && endDateMatch && textMatch;
	}).sort((a,b) => {
		if(sortBy === 'date') {
			return a.createdAt < b.createdAt ? 1 : -1;
		} else if(sortBy === 'amount') {
			return a.amount < b.amount ? 1 : -1;
		}
	});
};

//Store creation

const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer
	})
	);

store.susbscribe(() =>{
	const state = store.getState();
	const VisibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(VisibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'Rent', amount:100, createdAt: 1000}));
const expenseTwo store.dispatch(addExpense({description: 'Cofee', amount:300, createdAt: -1000}));

store.dispatch(removeExpense({id: expenseOne.expense.id}));
store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));
store.dispatch(setTextFilter('rent'));

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

store.dispatch(setStartDate(0));
store.dispatch(setEndDate(1250));

const demoState = {
	expenses: [{
		id: 'darfar',
		description: 'January rent',
		note: 'this was the final payment for tat adress',
		amount:  54500,
		createdAt: 0
	}],
	filters: {
		text: 'rent',
		sortBy:'amount', // date or amount
		startDate: undefined,
		endDate: undefined
	}
};