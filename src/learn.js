import React from 'react';
import ReactDOM from 'react-dom';
import {cloneElement, Children} from 'react';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import {Observable} from 'rxjs'
import {
	setObservableConfig, 
	componentFromStream,
	createEventHandler,
	mapPropsStream,
	compose
} from 'recompose'
import * as R from 'ramda'
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
// const SimpleForm = ({text, onInput}) => (
// 	<div>
// 		<input type='text' onInput={onInput} />
// 		<h2>{text}</h2>
// 	</div>
// )

// const SimpleFormStream = componentFromStream(
// 	props$ => {
// 	const {stream: onInput$, handler: onInput} = createEventHandler()
// 	const text$ = onInput$.map(e => e.target.value)
// 		.delay(500)
// 		.startWith('')
// 	return text$.map(text => ({text, onInput}))
// 		.map(SimpleForm)
// })

// const logInput = e => console.log(e.target.value)
// const App = () => (
// 	<div>
// 		<SimpleFormStream />
// 	</div>
// )

// example 5
// const Counter = ({value, onInc, onDec}) => (
// 	<div>
// 		<button onClick={onInc}>+</button>
// 		<h2>{value}</h2>
// 		<button onClick={onDec}>-</button>
// 	</div>
// )

// const CounterStream = componentFromStream(
// 	props$ => {
// 		const {stream:onInc$, handler:onInc} = createEventHandler()
// 		const {stream:onDec$, handler:onDec} = createEventHandler() 
// 		return props$
// 			.switchMap(props =>
// 				Observable.merge(
// 					onInc$.mapTo(1), 
// 					onDec$.mapTo(-1)
// 					)
// 				.startWith(props.value)
// 				.scan((acc,cur) => acc + cur)
// 			.map(value => ({value, onInc, onDec}))
// 			.map(Counter)
// 		)
// 	}
// )

// const App = () => (
// 	<div>
// 		<CounterStream value={3} />
// 	</div>
// )

// example 6
// const Counter = ({value, onInc, onDec}) => (
// 	<div>
// 		<button onClick={onInc}>+</button>
// 		<h2>{value}</h2>
// 		<button onClick={onDec}>-</button>
// 	</div>
// )

// const CounterStream = componentFromStream(
// 	props$ => {
// 		const {stream:onInc$, handler:onInc} = createEventHandler()
// 		const {stream:onDec$, handler:onDec} = createEventHandler() 
// 		return props$
// 			.switchMap(props =>
// 				Observable.merge(
// 					onInc$.mapTo(1), 
// 					onDec$.mapTo(-1)
// 					)
// 				.startWith(props.value)
// 				.scan((acc,cur) => acc + cur)
// 			.map(value => ({...props, value, onInc, onDec}))
// 			.map(props => cloneElement(props.children, props))
// 		)
// 	}
// )

// const App = () => (
// 	<div>
// 		<CounterStream value={3}>
// 			<Counter />
// 		</CounterStream>
// 	</div>
// )

// example 7
// const Counter = ({value, onInc, onDec}) => (
// 	<div>
// 		<button onClick={onInc}>+</button>
// 		<h2>{value}</h2>
// 		<button onClick={onDec}>-</button>
// 	</div>
// )

// const CounterStream = componentFromStream(
// 	props$ => {
// 		const {stream:onInc$, handler:onInc} = createEventHandler()
// 		const {stream:onDec$, handler:onDec} = createEventHandler() 
// 		return props$
// 			.switchMap(props =>
// 				Observable.merge(
// 					onInc$.mapTo(1), 
// 					onDec$.mapTo(-1)
// 					)
// 				.startWith(props.value)
// 				.scan((acc,cur) => acc + cur)
// 			.map(value => ({...props, value, onInc, onDec}))
// 			.map(props => Children.map(props.children, child => cloneElement(child, props)))
// 		)
// 	}
// )

// const App = () => (
// 	<div>
// 		<CounterStream value={3}>
// 			<Counter />
// 			<Counter />
// 		</CounterStream>
// 	</div>
// )

// example 8
// const interval = mapPropsStream(props$ =>
// 	props$.switchMap(props => Observable.interval(1000),
// 	(props, count) => ({...props, count}))
// )

// const Counter = props => <h1>{props.count}</h1>
// const CounterWithInterval = interval(Counter)

// const App = () => (
// 	<div>
// 		<CounterWithInterval />
// 	</div>
// )

// example 9
// const count = mapPropsStream(props$ => {
// 	const {
// 		stream: onInc$,
// 		handler: onInc
// 	} = createEventHandler()
// 	const {
// 		stream: onDec$,
// 		handler: onDec
// 	} = createEventHandler()
// 	return props$.switchMap(
// 		props =>
// 			Observable.merge(
// 				onInc$.mapTo(1),
// 				onDec$.mapTo(-1)
// 			)
// 		.startWith(0)
// 		.scan((acc, curr) => acc + curr),
// 			(props, count) => ({
// 				...props,
// 				count,
// 				onInc,
// 				onDec
// 			})
// 	)
// })
// const load = mapPropsStream(props$ =>
// 	props$.switchMap(
// 		props =>
// 			Observable.ajax(
// 				`https://swapi.co/api/prople/${props.count}`
// 			)
// 			.pluck('response')
// 			.startWith({name: 'loading...'})
// 			.catch(err =>
// 				Observable.of({name: 'Not found'})),
// 			(props, person) => ({...props, person})
// 	))
// // just for fun
// const typewriter = mapPropsStream(props$ =>
// 	props$.switchMap(
// 		props =>
// 			Observable.zip(
// 				Observable.from(props.person.name),
// 				Observable.interval(100),
// 				letter => letter
// 		).scan((acc, cur) => acc + cur),
// 		(props, name) => ({
// 			...props,
// 			person: {...props.person, name}
// 		})
// 	))
// const Counter = props => <div>
// 	<button onClick={props.onInc}>+</button>
// 	<button onClick={props.onDec}>-</button>
// 	<h3>{props.count}</h3>
// 	<h1>{props.person.name}</h1>
// 	</div>
// const CounterWithPersonLoader = compose(count, load, typewriter)(Counter)
// const App = () => (
// 	<div>
// 		<CounterWithPersonLoader />
// 	</div>
// )

// example 10
// const count = mapPropsStream(props$ => {
// 	const {
// 		stream: onInc$,
// 		handler: onInc
// 	} = createEventHandler()
// 	const {
// 		stream: onDec$,
// 		handler: onDec
// 	} = createEventHandler()
// 	return props$.switchMap(
// 		props =>
// 			Observable.merge(
// 				onInc$.mapTo(1),
// 				onDec$.mapTo(-1)
// 			)
// 		.startWith(0)
// 		.scan((acc, curr) => acc + curr),
// 			(props, count) => ({
// 				...props,
// 				count,
// 				onInc,
// 				onDec
// 			})
// 	)
// })
// const load = mapPropsStream(props$ =>
// 	props$.switchMap(
// 		props =>
// 			Observable.ajax(
// 				`https://swapi.co/api/prople/${props.count}`
// 			)
// 			.pluck('response')
// 			.startWith({name: 'loading...'})
// 			.catch(err =>
// 				Observable.of({name: 'Not found'})),
// 			(props, person) => ({...props, person})
// 	))

// const personNameLens = R.lensPath([
// 	"person",
// 	"name"
// ])

// // just for fun
// const typewriter = lens => mapPropsStream(props$ =>
// 	props$.switchMap(
// 		props =>
// 			Observable.zip(
// 				Observable.from(R.view(lens, props)),
// 				Observable.interval(100),
// 				letter => letter
// 		).scan((acc, cur) => acc + cur),
// 		(props, name) => R.set(lens, name, props)
// 	))
// const Counter = props => <div>
// 	<button onClick={props.onInc}>+</button>
// 	<button onClick={props.onDec}>-</button>
// 	<h3>{props.count}</h3>
// 	<h1>{props.person.name}</h1>
// 	</div>
// const CounterWithPersonLoader = compose(count, load, typewriter(personNameLens))(Counter)
// const DateDisplay = props => <h1>{props.date}</h1>
// const dateLens = R.lensProp('date')
// const DateTypewriter = typewriter(dateLens)(DateDisplay)

// const App = () => (
// 	<div>
// 		<DateTypewriter date={new Date().toDateString()}></DateTypewriter>
// 		<CounterWithPersonLoader />
// 	</div>
// )

// // ReactDOM.render(<StreamingApp message="I'm jane" speed={1000} />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Counter />, document.getElementById('root'));
// registerServiceWorker();

// example 11
