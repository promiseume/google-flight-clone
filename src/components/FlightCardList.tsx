import React, { useEffect, useState } from "react";
import { Card, Accordion, AccordionSummary, IconButton } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { FlightDetails, type FlightOption } from "./FlightDetails";
import useSearchFlights, { type FlightParams } from "../hooks/useSearchFlights";
import { useAppState } from "../contexts/AppStateContext";

interface Props {}

const _flights: FlightOption[] = [
  {
    id: "1",
    airline: "Ethiopian",
    departureTime: "13:40",
    arrivalTime: "02:55+1",
    duration: "10 hrs 15 min",
    stops: "1 stop",
    layoverInfo: "45 min ADD",
    co2Emissions: "449 kg CO2e",
    emissionsChange: "-14% emissions",
    price: "NGN 874,612",
    legs: [
      {
        departureTime: "13:40",
        arrivalTime: "21:00",
        departureAirport: "Murtala Muhammed International Airport (LOS)",
        arrivalAirport: "Bole Addis Ababa International Airport (ADD)",
        travelTime: "5 hrs 20 min",
        airline: "Ethiopian",
        aircraft: "Airbus A350",
        flightNumber: "ET 900",
        co2Emissions: "228 kg CO2e",
        amenities: [
          "Average legroom (79 cm)",
          "Wi-Fi for a fee",
          "In-seat power and USB outlets",
          "On-demand video",
        ],
      },
      {
        departureTime: "22:05", // This assumes a 1hr 5min layover starting at 21:00 + 1 hr 5 min = 22:05
        arrivalTime: "02:55+1",
        departureAirport: "Bole Addis Ababa International Airport (ADD)",
        arrivalAirport: "Dubai International Airport (DXB)",
        travelTime: "4 hrs 20 min",
        airline: "Ethiopian",
        aircraft: "Boeing 737MAX 8",
        flightNumber: "ET 622",
        co2Emissions: "221 kg CO2e", // Adjusted to match total
        amenities: [
          "Average legroom (76 cm)",
          "In-seat USB outlet",
          "Stream media to your device",
        ],
      },
    ],
  },
  {
    id: "2",
    airline: "Ethiopian",
    departureTime: "13:40",
    arrivalTime: "03:25+1",
    duration: "10 hrs 45 min",
    stops: "1 stop",
    layoverInfo: "1 hr 5 min ADD", // Corrected layover info
    co2Emissions: "446 kg CO2e", // Corrected total CO2
    emissionsChange: "-15% emissions",
    price: "NGN 1,125,893",
    totalLayoverDuration: "1 hr 5 min layover Addis Ababa (ADD)", // Specific for this flight
    legs: [
      {
        departureTime: "13:40",
        arrivalTime: "21:00",
        departureAirport: "Murtala Muhammed International Airport (LOS)",
        arrivalAirport: "Bole Addis Ababa International Airport (ADD)",
        travelTime: "5 hrs 20 min",
        airline: "Ethiopian",
        aircraft: "Airbus A350",
        flightNumber: "ET 900",
        co2Emissions: "228 kg CO2e",
        amenities: [
          "Average legroom (79 cm)",
          "Wi-Fi for a fee",
          "In-seat power and USB outlets",
          "On-demand video",
        ],
      },
      {
        departureTime: "22:05",
        arrivalTime: "03:25+1",
        departureAirport: "Bole Addis Ababa International Airport (ADD)",
        arrivalAirport: "Sharjah International Airport (SHJ)", // Corrected arrival airport
        travelTime: "4 hrs 20 min",
        airline: "Ethiopian",
        aircraft: "Boeing 737MAX 8",
        flightNumber: "ET 622",
        co2Emissions: "218 kg CO2e", // Corrected CO2
        amenities: [
          "Average legroom (76 cm)",
          "In-seat USB outlet",
          "Stream media to your device",
        ],
      },
    ],
  },
  {
    id: "3",
    airline: "Qatar Airways",
    departureTime: "09:00",
    arrivalTime: "21:25",
    duration: "9 hrs 25 min",
    stops: "1 stop",
    layoverInfo: "45 min DOH",
    co2Emissions: "520 kg CO2e",
    emissionsChange: "Avg emissions",
    price: "NGN 1,812,212",
    legs: [
      {
        departureTime: "09:00",
        arrivalTime: "14:30", // Example time
        departureAirport: "Murtala Muhammed International Airport (LOS)",
        arrivalAirport: "Hamad International Airport (DOH)",
        travelTime: "8 hrs 30 min",
        airline: "Qatar Airways",
        aircraft: "Boeing 777",
        flightNumber: "QR 1406",
        co2Emissions: "300 kg CO2e",
        amenities: [
          "Average legroom (81 cm)",
          "Wi-Fi",
          "In-seat power and USB outlets",
          "Personal TV",
        ],
      },
      {
        departureTime: "15:15", // Example, 45 min layover
        arrivalTime: "21:25",
        departureAirport: "Hamad International Airport (DOH)",
        arrivalAirport: "Dubai International Airport (DXB)",
        travelTime: "1 hr 10 min",
        airline: "Qatar Airways",
        aircraft: "Airbus A320",
        flightNumber: "QR 104",
        co2Emissions: "220 kg CO2e",
        amenities: ["Average legroom (79 cm)", "In-seat USB outlet"],
      },
    ],
  },
];

export const FlightCardList: React.FC<Props> = () => {
  const [expandedCard, setExpandedCard] = useState<Record<string, boolean>>({});
  const [params, setParams] = useState<FlightParams>({});
  const { from, to, startDate } = useAppState();
  const { data: flights, refetch } = useSearchFlights(params);

  useEffect(() => {
    console.log(startDate);
    console.log(from);
    console.log(to);

    if (from && to && startDate) {
      setParams({
        originEntityId: from?.entityId,
        originSkyId: from?.skyId,
        destinationEntityId: to?.entityId,
        destinationSkyId: to?.skyId,
        date: startDate?.toDateString(),
        adults: "2",
        sortBy: "best",
        currency: "USD",
        market: "en-US",
        countryCode: "US",
      });

      refetch();
    }
  }, [from, to, startDate]);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedCard((prev) => ({ ...prev, [panel]: isExpanded }));
    };

  return (
    <div className="p-4 w-full">
      <div className="flex items-center w-full mb-2 cursor-pointer">
        <div
          className={`flex items-center justify-center align-center w-[50%] h-12 border rounded-tl-md rounded-bl-md ${
            true
              ? "bg-blue-100 border-blue-600 border-b-2 text- border-b-blue-600"
              : "border-gray-300"
          }`}
        >
          <p>Best</p>
        </div>
        <div
          className={`flex items-center justify-center align-center w-[50%] h-12 border border-gray-300 border-l-0 rounded-tr-md rounded-br-md`}
        >
          <p>Cheapest</p>
        </div>
      </div>
      {_flights.map((flight, index) => (
        <Card
          key={flight.id}
          elevation={0}
          className={`
            ${
              !!expandedCard[flight.id]
                ? index === 0
                  ? "mb-1.5"
                  : index === _flights.length - 1
                  ? "mt-1.5"
                  : "mt-1.5 mb-1.5"
                : ""
            }
            overflow-hidden
            shadow-none
            border border-gray-300
          `}
        >
          <Accordion
            expanded={!!expandedCard[flight.id]}
            onChange={handleChange(flight.id)}
          >
            <AccordionSummary
              expandIcon={
                <IconButton
                  size="large"
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              }
              aria-controls={`${flight.id}-content`}
              id={`${flight.id}-header`}
              className="px-4 py-2 flex items-center gap-2"
            >
              {!expandedCard[flight.id] ? (
                <div className="flex items-center gap-8 w-[40%]">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-300">
                    <img
                      src="your-image-url.jpg"
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {flight.departureTime} - {flight.arrivalTime}
                    </p>
                    <p className="font-light text-xs">{flight.airline}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-8 w-[50%]">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-300">
                    <img
                      src="your-image-url.jpg"
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      Departure &middot; {flight.departureTime}
                    </p>
                  </div>
                </div>
              )}

              {!expandedCard[flight.id] ? (
                <div className="flex gap-4 w-[40%] justify-between">
                  <div className="flex flex-col justify-center">
                    <p className="font-medium text-sm">{flight.duration}</p>
                    {/* <p className="font-light text-xs">{flight.stops}</p> */}
                  </div>

                  <div className="flex flex-col justify-center">
                    <p className="font-medium text-sm">{flight.stops}</p>
                    <p className="font-light text-xs">{flight.layoverInfo}</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-medium text-sm">{flight.co2Emissions}</p>
                    <p className="font-medium text-[10px] text-green-900 bg-green-50 p-0.5 rounded-sm">
                      {flight.emissionsChange}{" "}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4 w-[30%] justify-between">
                  <div className="flex flex-col justify-center">
                    <p className="font-medium text-sm">{flight.co2Emissions}</p>
                    <p className="font-medium text-[10px] text-green-900 bg-green-50 p-0.5 rounded-sm">
                      {flight.emissionsChange}{" "}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-light text-sm text-blue-600 border border-gray-200 py-1 px-4 hover:bg-gray-50 rounded-4xl">
                      Select flight
                    </p>
                  </div>
                </div>
              )}

              <div className="flex align-right w-[20%] justify-end">
                <div className="flex flex-col justify-end items-end align-right">
                  <p className="font-medium text-sm text-green-700">
                    {flight.price}
                  </p>
                  <p className="font-light text-xs">{"round price"}</p>
                </div>
              </div>

              {/* </Box> */}
            </AccordionSummary>
            <FlightDetails flight={flight} />
          </Accordion>
        </Card>
      ))}
    </div>
  );
};
