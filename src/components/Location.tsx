import React, { useState, useCallback, useEffect } from "react";
import {
  InputAdornment,
  Popover,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  TextField,
} from "@mui/material";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import useSearchAirport, {
  type LocationOption,
} from "../hooks/useSearchAirpots";
import debounce from "lodash.debounce";
import { useAppState } from "../contexts/AppStateContext";

export default function FlightSearchHeader() {
  const {
    from,
    setFrom,
    to,
    setTo,
    startDate,
    endDate,
    setEndDate,
    setStartDate,
  } = useAppState();
  const [rotated, setRotated] = useState(false);

  const swapLocations = () => {
    setRotated((r) => !r);
    setFrom(to);
    setTo(from);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="p-4 w-full mb-4 h-14">
        <div className="flex items-center gap-2">
          <div className="flex items-center w-[60%] h-full relative">
            <LocationSelector
              value={from}
              onChange={(val) => setFrom(val)}
              isStart={true}
            />

            <button
              onClick={swapLocations}
              className={`
                absolute
                left-1/2
                transform -translate-x-1/2
                w-8 h-8
                flex items-center justify-center
                rounded-full bg-gray-100 hover:bg-gray-200
                transition-transform duration-300
                z-10
                ${rotated ? "rotate-180" : "rotate-0"}
              `}
              title="Swap"
            >
              <SwapHorizIcon fontSize="small" className={`text-gray-600`} />
            </button>
            <LocationSelector
              value={to}
              onChange={(val) => setTo(val)}
              isStart={false}
            />
          </div>

          <div className="flex items-center w-[40%] border border-gray-200 rounded-sm h-full">
            {[startDate, endDate].map((value, idx) => (
              <DatePicker
                key={idx}
                value={value}
                onChange={idx === 0 ? setStartDate : setEndDate}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    className: "h-full",
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonthIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export function LocationSelector({
  value,
  onChange,
  isStart,
}: {
  value: LocationOption | null;
  onChange: (value: LocationOption | null) => void;
  isStart: boolean;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: LocationOption) => {
    onChange(option);
    handleClose();
  };

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <div
        onClick={handleOpen}
        className={`
        flex items-center gap-2
        px-4 py-2
        rounded-md w-full h-14
        cursor-text
        hover:border-gray-400
        border
        ${open ? "border-blue-600" : "border-gray-300"}
        ${isStart ? "mr-1" : "ml-1"}
      `}
      >
        {isStart ? (
          <TripOriginIcon className="text-gray-600" fontSize="small" />
        ) : (
          <LocationOnOutlinedIcon className="text-gray-600" fontSize="small" />
        )}
        <span className="text-sm text-gray-700">
          {value ? value.actualName : isStart ? "Where from?" : "Where to"}
        </span>
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <PopoverContent
          handleSelect={handleSelect}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          toggleGroup={toggleGroup}
          openGroups={openGroups}
          defaultInput={value?.actualName || ""}
        />
      </Popover>
    </>
  );
}

export const PopoverContent: React.FC<{
  handleSelect: (option: LocationOption) => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  toggleGroup: (label: string) => void;
  openGroups: Record<string, boolean>;
  defaultInput: string;
}> = ({
  openGroups,
  handleSelect,
  setSearchTerm,
  searchTerm,
  toggleGroup,
  defaultInput,
}) => {
  const { airports } = useSearchAirport(searchTerm);

  const [inputValue, setInputValue] = useState<string>(defaultInput || "");

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 1000),
    []
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSetSearchTerm(value);
  };

  useEffect(() => {
    if (!open) {
      setInputValue("");
      setSearchTerm("");
      debouncedSetSearchTerm.cancel();
    }
  }, [open, debouncedSetSearchTerm]);

  return (
    <>
      <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
        <TextField
          autoFocus
          fullWidth
          variant="outlined"
          placeholder="Search..."
          value={inputValue}
          onChange={handleInputChange}
          size="small"
        />
      </Box>
      <List disablePadding>
        {airports.data?.map((opt) => {
          const hasChildren = Array.isArray(opt.children);
          const isOpen = openGroups[opt.label] || false;

          return (
            <React.Fragment key={opt.label}>
              <ListItemButton
                onClick={
                  hasChildren
                    ? () => toggleGroup(opt.label)
                    : () => handleSelect(opt)
                }
                className="py-2 px-4"
              >
                {opt.icon && (
                  <ListItemIcon className="min-w-fit pr-2">
                    {opt.icon}
                  </ListItemIcon>
                )}
                <ListItemText primary={opt.label} secondary={opt.subtitle} />
                {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {/* {hasChildren && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {opt.children!.map((child) => (
                      <ListItemButton
                        key={child.label}
                        onClick={() => handleSelect(child)}
                        disableGutters
                        sx={{
                          pl: 6,
                          pr: 2,
                        }}
                      >
                        {child.icon && (
                          <ListItemIcon sx={{ minWidth: 32, pr: 1 }}>
                            {child.icon}
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={child.label}
                          secondary={child.subtitle}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )} */}
            </React.Fragment>
          );
        })}
      </List>
    </>
  );
};
