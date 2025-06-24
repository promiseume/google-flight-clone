import "./App.css";
import "./index.css";
import FlightHeader from "./components/Dropdown";
import LocationInputs from "./components/Location";
import { FlightCardList } from "./components/FlightCardList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppStateProvider } from "./contexts/AppStateContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppStateProvider>
          <div className="max-w-4xl mx-auto">
            <FlightHeader />
            <LocationInputs />
            <FlightCardList />
          </div>
        </AppStateProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
