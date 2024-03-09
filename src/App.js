import "./App.css"
import { Provider } from "react-redux";
import store from "./Utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchVideo from "./components/WatchVideo";
import Results from "./components/Results";
import AppContainer from "./AppContainer";

const appRouter = createBrowserRouter([
 {
  path: "/",
  element: <AppContainer/>,
  children: [
    {
    path: "/",
    element: <MainContainer/>,
    },
    {
      path: "/watch",
      element: <WatchVideo/>
    },
    {
      path: "/results/:id",
      element: <Results/>
    }

   ]
  },
])

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* Wrap the entire application, including the Head component, with RouterProvider */}
        {/* <Head/> */}
        <RouterProvider router={appRouter}>
            <AppContainer/>
        </RouterProvider>
      </div>
    </Provider>
  );
}


export default App;
