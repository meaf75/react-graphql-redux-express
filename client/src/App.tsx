import { AppRouter } from "./screens/AppRouter";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { REACT_APP_GITHUB_ACCESS_KEY, REACT_APP_GITHUB_ENDPOINT } from "./constants/ApiEndpoint";


const App = () => {

  const store = configureStore();
  
  const client = new ApolloClient({
    uri: REACT_APP_GITHUB_ENDPOINT,
    cache: new InMemoryCache(),
    headers: {
      'Authorization': `token ${REACT_APP_GITHUB_ACCESS_KEY}`
    }
  });

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
