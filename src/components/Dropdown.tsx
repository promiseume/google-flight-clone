import * as React from "react";
import {
  MenuItem,
  Select,
  FormControl,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CheckIcon from "@mui/icons-material/Check";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const TripType = [
  { label: "Round trip", icon: <SyncAltIcon fontSize="small" /> },
  { label: "One-way", icon: <ArrowRightAltIcon fontSize="small" /> },
  { label: "Multi-city", icon: <MultipleStopIcon fontSize="small" /> },
];

const TripClass = [
  { label: "Economy" },
  { label: "Premium economy" },
  { label: "Business" },
  { label: "First" },
];

export default function FlightHeader() {
  const [tripType, setTripType] = React.useState<string>(TripType[0].label);
  const [tripClass, setTripClass] = React.useState<string>(TripClass[0].label);

  const handleTripTypeChange = (value: string) => {
    setTripType(value);
  };
  const handleTripClassChange = (value: string) => {
    setTripClass(value);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex gap-3 mt-6 ml-4">
        <DropDownWrapper
          value={tripType}
          setValue={handleTripTypeChange}
          options={TripType}
        />
        <PassengerDropdown />
        <DropDownWrapper
          value={tripClass}
          setValue={handleTripClassChange}
          options={TripClass}
        />
      </div>
    </div>
  );
}

const DropDownWrapper = ({
  value,
  setValue,
  options,
}: {
  value: string;
  setValue: (val: string) => void;
  options: { label: string; icon?: React.ReactNode }[];
}) => {
  const selectedOption = options.find((item) => item.label === value);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const getWrapperClasses = () => {
    if (isFocused) return "bg-blue-100 border-b border-blue-600";
    if (isHovered) return "bg-gray-100";
    return "bg-white";
  };

  return (
    <div
      className={`
          inline-block 
          ${getWrapperClasses()} 
          px-2 py-1 text-sm rounded-t-md
          transition
    ${isHovered ? "bg-gray-100" : "bg-white"}
    focus-within:bg-blue-100 focus-within:border-b focus-within:border-blue-600
        `}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <FormControl variant="standard">
        <Select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disableUnderline
          className="bg-transparent text-sm text-gray-600 font-medium px-1"
          renderValue={(selected) => (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {selectedOption?.icon}
              <span>{selected}</span>
            </div>
          )}
          MenuProps={{
            PaperProps: {
              className: "mt-2 rounded-md",
            },
          }}
        >
          {options.map((type) => (
            <MenuItem
              key={type.label}
              value={type.label}
              className="text-sm text-gray-600 flex items-center gap-2"
            >
              <ListItemIcon>
                {value === type.label && <CheckIcon fontSize="small" />}
              </ListItemIcon>
              <ListItemText className="text-sm text-gray-600">
                {type.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const PassengerDropdown = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const [committedPassengers, setCommittedPassengers] = React.useState({
    adults: 2,
    children: 0,
    infantsSeat: 0,
    infantsLap: 0,
  });

  const [tempPassengers, setTempPassengers] =
    React.useState(committedPassengers);

  const total = Object.values(committedPassengers).reduce((a, b) => a + b, 0);

  const updateCount = (type: keyof typeof tempPassengers, delta: number) => {
    setTempPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const handleOpen = () => {
    setTempPassengers(committedPassengers); // reset temp to current values
    setIsOpen(true);
  };

  const handleDone = () => {
    setCommittedPassengers(tempPassengers);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempPassengers(committedPassengers); // discard changes
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        onClick={handleOpen}
        className={`flex items-center gap-1 px-3 py-1 rounded-t-md h-10 ${
          isOpen ? "bg-blue-100 border-b border-blue-500" : "hover:bg-gray-100"
        }`}
      >
        <PersonOutlineIcon className="text-gray-600" fontSize="small" />
        <span className="text-sm">{total}</span>
        <ArrowDropUpIcon
          className={`text-gray-500 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
          fontSize="small"
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-64 bg-white shadow-md rounded-md p-4">
          {[
            { label: "Adults", sub: "", key: "adults" },
            { label: "Children", sub: "Aged 2–11", key: "children" },
            { label: "Infants", sub: "In seat", key: "infantsSeat" },
            { label: "Infants", sub: "On lap", key: "infantsLap" },
          ].map(({ label, sub, key }) => (
            <div key={key} className="flex justify-between items-center my-2">
              <div>
                <div className="text-sm font-medium text-gray-500">{label}</div>
                {sub && (
                  <div className="text-xs text-gray-500 leading-tight">
                    {sub}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`w-8 h-8 text-sm rounded 
                    ${
                      tempPassengers[key as keyof typeof tempPassengers] > 0
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  onClick={() => updateCount(key as any, -1)}
                  disabled={
                    tempPassengers[key as keyof typeof tempPassengers] === 0
                  }
                >
                  −
                </button>
                <span className="w-4 text-center text-sm">
                  {tempPassengers[key as keyof typeof tempPassengers]}
                </span>
                <button
                  className="w-8 h-8 text-sm rounded bg-blue-100 text-blue-600"
                  onClick={() => updateCount(key as any, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {/* Footer Buttons */}
          <div className="flex justify-between mt-4">
            <button
              className="text-sm hover:bg-blue-50 hover:text-blue-800 text-blue-600 px-4 py-1 rounded-full"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="text-sm hover:bg-blue-50 hover:text-blue-800 text-blue-600 px-4 py-1 rounded-full"
              onClick={handleDone}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
