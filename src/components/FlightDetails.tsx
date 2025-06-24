// FlightCardList.tsx
import React from "react";
import { AccordionDetails, Typography, Box, Divider } from "@mui/material";

export interface FlightLeg {
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  travelTime: string;
  airline: string;
  aircraft: string;
  flightNumber: string;
  co2Emissions: string;
  amenities: string[];
}

export interface FlightOption {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  layoverInfo: string;
  co2Emissions: string;
  emissionsChange: string;
  price: string;
  totalLayoverDuration?: string;
  legs: FlightLeg[];
}

export const FlightDetails: React.FC<{ flight: FlightOption }> = ({
  flight,
}) => {
  return (
    <AccordionDetails className="p-4 border-t border-gray-200">
      {flight.legs.map((leg, legIndex) => (
        <React.Fragment key={legIndex}>
          <Box className="flex items-start mb-2 space-x-3">
            <Box className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full border border-gray-400 bg-white flex-shrink-0"></div>
              <div
                className="flex-shrink-0 w-1 h-15 border-r-4 border-dotted"
                style={{ borderColor: "#dadce0" }}
              ></div>
              <div className="w-3 h-3 rounded-full border border-gray-400 bg-white flex-shrink-0"></div>

              {legIndex < flight.legs.length - 1 && (
                <div className="w-px h-full bg-gray-300 my-1 flex-grow"></div>
              )}
            </Box>

            <Box className="flex-grow">
              <Box className="flex justify-between items-center mb-1">
                <Typography variant="body1" className="font-semibold">
                  {leg.departureTime} - {leg.arrivalTime}
                  {legIndex === flight.legs.length - 1 &&
                    leg.arrivalTime.includes("+1") && (
                      <span className="text-red-500 text-xs ml-1">
                        Overnight
                      </span>
                    )}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {leg.departureAirport}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Travel time: {leg.travelTime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {leg.airline} - {leg.aircraft} - {leg.flightNumber}
              </Typography>

              <div className="grid grid-cols-2 gap-1 text-sm text-gray-600 mt-2">
                {leg.amenities.map((amenity, amenityIndex) => (
                  <div key={amenityIndex} className="flex items-center">
                    <span className="mr-1">✓</span> {amenity}
                  </div>
                ))}
              </div>
            </Box>
          </Box>

          {legIndex < flight.legs.length - 1 && flight.totalLayoverDuration && (
            <Box className="pl-6 py-2">
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" className="text-gray-600 font-medium">
                {flight.totalLayoverDuration}
              </Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
          )}
        </React.Fragment>
      ))}
    </AccordionDetails>
  );
};
