import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import {Observable} from 'rxjs'
import {
	setObservableConfig, 
	componentFromStream,
	createEventHandler
} from 'recompose'
import config from 'recompose/rxjsObservableConfig'

setObservableConfig(config)

// example 1
// const App = componentFromStream(props$ => {
// 	return Observable.interval(1000).map(i => (
// 		<div>{i}</div>
// 	))
// })

// example 2
// const App = props => (
// 	<div>
// 		<h1>{props.message}</h1>
// 	</div>
// )

// const StreamingApp = componentFromStream(props$ =>
// 	props$.switchMap(props => createTypewriter(props.message, props.speed))
// 		.map(message => ({message}))
// 		.map(App))
// const createTypewriter = (message, speed) => Observable.zip(
// 	Observable.from(message),
// 	Observable.interval(speed),
// 	letter => letter
// ).scan((acc, curr) => acc + curr)

// example 3
// const personById = id =>
//   `https://swapi.co/api/people/${id}`

// const Card = props => (
//   <div>
//     <h1>{props.name}</h1>
//     <h2>{props.homeworld}</h2>
//   </div>
// )

// const loadById = id =>
//   Observable.ajax(personById(id))
//     .pluck("response")
//     .switchMap(
//       response =>
//         Observable.ajax(response.homeworld)
//           .pluck("response")
//           .startWith({ name: "" }),
//       (person, homeworld) => ({
//         ...person,
//         homeworld: homeworld.name
//       })
//     )

// const CardStream = componentFromStream(props$ =>
//   props$
//     .switchMap(props => loadById(props.id))
//     .map(Card)
// )

// const App = () => (
//   <div>
//     <Card name="John" homeworld="Earth" />
//     <CardStream id={1} />
//     <CardStream id={12} />
//     <CardStream id={10} />
//     <CardStream id={24} />
//   </div>
// )

// example 4
const SimpleForm = ({text, onInput}) => (
	<div>
		<input type='text' onInput={onInput} />
		<h2>{text}</h2>
	</div>
)

const SimpleFormStream = componentFromStream(
	props$ => {
	const {stream: onInput$, handler: onInput} = createEventHandler()
	const text$ = onInput$.map(e => e.target.value)
		.delay(500)
		.startWith('')
	return text$.map(text => ({text, onInput}))
		.map(SimpleForm)
})

const logInput = e => console.log(e.target.value)
const App = () => (
	<div>
		<SimpleFormStream />
	</div>
)

// ReactDOM.render(<StreamingApp message="I'm jane" speed={1000} />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
