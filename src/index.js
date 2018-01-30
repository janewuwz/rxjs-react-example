import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import {Observable} from 'rxjs'
import {setObservableConfig, componentFromStream} from 'recompose'
import config from 'recompose/rxjsObservableConfig'

setObservableConfig(config)

// const App = componentFromStream(props$ => {
// 	return Observable.interval(1000).map(i => (
// 		<div>{i}</div>
// 	))
// })

const App = props => (
	<div>
		<h1>{props.message}</h1>
	</div>
)

const StreamingApp = componentFromStream(props$ =>
	props$.switchMap(props => createTypewriter(props.message, props.speed))
		.map(message => ({message}))
		.map(App))
const createTypewriter = (message, speed) => Observable.zip(
	Observable.from(message),
	Observable.interval(speed),
	letter => letter
).scan((acc, curr) => acc + curr)

ReactDOM.render(<StreamingApp message='Hello world' speed={1000} />, document.getElementById('root'));
// registerServiceWorker();
