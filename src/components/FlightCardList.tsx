// FlightCardList.tsx
import React, { useState } from "react";
import {
  Card,
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { FlightDetails, type FlightOption } from "./FlightDetails";

interface Props {}

const flights: FlightOption[] = [
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

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedCard((prev) => ({ ...prev, [panel]: isExpanded }));
    };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {flights.map((flight, index) => (
        <Card
          key={flight.id}
          elevation={0}
          className={`
            ${
              !!expandedCard[flight.id]
                ? index === 0
                  ? "mb-4"
                  : index === flights.length - 1
                  ? "mt-4"
                  : "mt-4 mb-4"
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
              className="px-4 py-3 flex items-center justify-between"
            >
              <Box className="flex flex-col md:flex-row justify-between items-center w-full">
                <div className="flex items-center space-x-4 mb-2 md:mb-0">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div>
                    <Typography variant="body1" className="font-semibold">
                      {flight.airline}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {flight.departureTime} – {flight.arrivalTime}
                    </Typography>
                  </div>
                </div>

                <div className="text-center mb-2 md:mb-0">
                  <Typography variant="body1" className="font-semibold">
                    {flight.duration}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {flight.stops}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="text-xs"
                  >
                    {flight.layoverInfo}
                  </Typography>
                </div>

                <div className="text-center mb-2 md:mb-0">
                  <Typography variant="body1" className="font-semibold">
                    {flight.co2Emissions}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={`text-sm ${
                      flight.emissionsChange.startsWith("-")
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {flight.emissionsChange}
                  </Typography>
                </div>

                <div className="text-right mr-5">
                  <Typography variant="h6" className="font-bold">
                    {flight.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    round trip
                  </Typography>
                </div>
              </Box>
            </AccordionSummary>
            <FlightDetails flight={flight} />
          </Accordion>
        </Card>
      ))}
    </div>
  );
};
