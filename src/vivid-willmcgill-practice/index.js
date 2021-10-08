import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const {COMPONENT_BOOTSTRAPPED} = actionTypes;

const view = (state, helpers) => {
	const {items} = state.properties;
	//const field  = 'number';

	return (
		<div>
			<h1>
				Will's Header
			</h1>
			{items.map((item)=>{
				return (
					<p>
						{item}
					</p>
				)
			})}
		</div>
	);
};

createCustomElement('vivid-willmcgill-practice', {
	renderer: {type: snabbdom},
	view,
	actionHandlers:{
		[COMPONENT_BOOTSTRAPPED]: (coeffects) =>{
			const {dispatch} = coeffects;
			const {state} = coeffects;
			const {field} = state.properties;

			dispatch('GET_THINGS', {
				field: field
			});
		},

		'GET_THINGS': createHttpEffect('/api/x_vivid_practice_4/recent/getField', {
			method: 'GET',
			queryParams: [
				'field'
			],
			successActionType: 'TABLE_SUCCESS',
			errorActionType: 'TABLE_FAIL'
		}),
		'TABLE_SUCCESS': (coeffects) => {
			const {updateProperties} = coeffects;
			const {items} = coeffects.action.payload.result;
			
			
			updateProperties({
				items: items
			})
		},
		'TABLE_FAIL': (coeffects) => {
			alert('failed')
		}
	},
	properties: {
		items:{
			default:[1,2,3]
		},
		field:{
			default: "number"
		}
	},
	styles
});
