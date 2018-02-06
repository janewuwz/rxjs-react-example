import React from 'react'
import ReactDOM from 'react-dom'
import {compose, lifecycle, branch, renderComponent} from 'recompose'

const withUserData = lifecycle({
  state: { loading: true },
  componentDidMount() {
    fetchData().then((data) =>
      this.setState({ loading: false, ...data }));
  }
});

const Spinner = () =>
  <div className="Spinner">
    <div className="loader">Loading...</div>
  </div>;

const isLoading = ({ loading }) => loading;

const withSpinnerWhileLoading = branch(
  isLoading,
  renderComponent(Spinner)
);

const enhance = compose(
  withUserData,
  withSpinnerWhileLoading
);

const User = enhance(({ name, status }) =>
  <div className="User">{ name }—{ status }</div>
);

const App = () =>
  <div>
    <User />
  </div>

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: "Tim", status: "active" }), 1500);
  });
}

export default App
