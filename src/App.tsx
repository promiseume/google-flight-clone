import "./App.css";
import "./index.css";
import FlightHeader from "./components/Dropdown";
import LocationInputs from "./components/Location";
import { FlightCardList } from "./components/FlightCardList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FlightHeader />
        <LocationInputs />
        <FlightCardList />
      </QueryClientProvider>
    </>
  );
}

export default App;
