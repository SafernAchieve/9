import React, { useState, useEffect, useRef } from 'react';
import { DayPilot, DayPilotCalendar } from "daypilot-pro-react";
import { DayPilotNavigator} from "daypilot-pro-react";
import "./Calendar.css";


const Calendar = () => {
  const [config, setConfig] = useState({
    locale: "en-us",
    columnWidthSpec: "Auto",
    viewType: "Resources",
    headerLevels: 1,
    headerHeight: 30,
    cellHeight: 30,
    crosshairType: "Header",
    showCurrentTime: false,
    eventArrangement: "Cascade",
    allowEventOverlap: true,
    timeRangeSelectedHandling: "Enabled",


   
    eventDeleteHandling: "Disabled",
    eventMoveHandling: "Update",
    onEventMoved: (args) => {
      args.control.message("Event moved: " + args.e.text());
    },
    eventResizeHandling: "Update",
    onEventResized: (args) => {
      args.control.message("Event resized: " + args.e.text());
    },
    eventClickHandling: "Disabled",
    eventHoverHandling: "Disabled",


    startDate: DayPilot.Date.today(),
    days: 28, 
    events: [
   
      {
        id: 1,
        text: "Event 5",
        start: DayPilot.Date.today().addHours(10),
        end: DayPilot.Date.today().addHours(11),
        resource: "R5"
      },
      {
        id: 1,
        text: "Event 6",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(10),
        resource: "R6"
      },
      {
        id: 1,
        text: "Event 7",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(10),
        resource: "R7"
      },


      {
        id: 1,
        text: "Event 1",
        start: DayPilot.Date.today().addHours(10),
        end: DayPilot.Date.today().addHours(11),
        resource: "P1"
      },
      {
        id: 2,
        text: "Event 2",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(10),
        resource: "P2"
      },
 
      {
        id: 1,
        text: "Event 6",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(10),
        resource: "T6"
      },
      {
        id: 1,
        text: "Event 7",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addDays(1).addHours(10),
        resource: "T7"
      }
    ]
  });
  



  
  const [startDate, setStartDate] = useState(new DayPilot.Date("2024-11-07"));
  const [events, setEvents] = useState([]);



  const next = () => {
    setStartDate(startDate.addDays(1));
  };

  const previous = () => {
    setStartDate(startDate.addDays(-1));
  };


  const onTimeRangeSelected = async args => {
    const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
    calendarRef.current.control.clearSelection();
    if (modal.canceled) { return; }
    setEvents([...events, {
      start: args.start,
      end: args.end,
      id: DayPilot.guid(),
      resource: args.resource,
      text: modal.result
    }]);
  };






 

  const [selectedPurpose, setSelectedPurpose] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const [allResources, setAllResources] = useState([
    { name: "RP 1", id: "R1", purpose: "Play", location: "RP" },
    { name: "RP 2", id: "R2", purpose: "Play", location: "RP" },
    { name: "RP 3", id: "R3", purpose: "Couple", location: "RP" },
    { name: "RP 4", id: "R4", purpose: "Couple", location: "RP" },
    { name: "RP 5", id: "R5", purpose: "Couple", location: "RP" },
    { name: "RP 6", id: "R6", purpose: "Individual", location: "RP" },
    { name: "RP 7", id: "R7", purpose: "Individual", location: "RP" },
    { name: "CC 1", id: "P1", purpose: "Play", location: "CC" },
    { name: "CC 2", id: "P2", purpose: "Play", location: "CC" },
    { name: "CC 3", id: "P3", purpose: "Couple", location: "CC" },
    { name: "CC 4", id: "P4", purpose: "Couple", location: "CC" },
    { name: "CC 5", id: "P5", purpose: "Couple", location: "CC" },
    { name: "CC 6", id: "P6", purpose: "Individual", location: "CC" },
    { name: "CC 7", id: "P7", purpose: "Individual", location: "CC" },
    { name: "Airmont 1", id: "T1", purpose: "Play", location: "Airmont" },
    { name: "Airmont 2", id: "T2", purpose: "Play", location: "Airmont" },
    { name: "Airmont 3", id: "T3", purpose: "Couple", location: "Airmont" },
    { name: "Airmont 4", id: "T4", purpose: "Couple", location: "Airmont" },
    { name: "Airmont 5", id: "T5", purpose: "Couple", location: "Airmont" },
    { name: "Airmont 6", id: "T6", purpose: "Individual", location: "Airmont" },
    { name: "Airmont 7", id: "T7", purpose: "Individual", location: "Airmont" }
  ]);





  


  useEffect(() => {
    applyResourceFilter();
  }, [selectedPurpose, selectedLocation]);



  const applyResourceFilter = () => {
    const filteredResources = allResources.filter(resource => {
      return (selectedPurpose === "All" || resource.purpose === selectedPurpose) &&
             (selectedLocation === "All" || resource.location === selectedLocation);
    });

    setConfig(prevConfig => ({
      ...prevConfig,
      columns: filteredResources.map(resource => ({
        name: resource.name,
        id: resource.id
      }))
    }));
  };







  const [startRange, setStartRange] = useState(DayPilot.Date.today());
  const [endRange, setEndRange] = useState(DayPilot.Date.today().addDays(7));

  const startDateRef = useRef(null); // Reference to the start date picker
  const endDateRef = useRef(null);   // Reference to the end date picker
  const calendarRef = useRef(null);  // Reference to the DayPilot calendar

  // Set default values for the date pickers immediately on mount
  useEffect(() => {
    if (startDateRef.current && endDateRef.current) {
      startDateRef.current.value = startRange.toString(); // Initialize start date
      endDateRef.current.value = endRange.toString();     // Initialize end date
    }
  }, [startRange, endRange]);










  const daysResources = () => {
    // Convert the date strings into native JavaScript Date objects
    const startDate = new Date(startRange);
    const endDate = new Date(endRange);
  
    // Calculate the difference in days, including the end date
    const daysDifference = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  
    // Create columns for each day in the selected range
    const columns = Array.from({ length: daysDifference }, (_, i) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i); // Add i days to the start date
  
      // Add all resources as children for the current day
      return {
        id: i,
        name: currentDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        children: allResources.map((resource) => ({
          id: `${resource.id}-${i}`, // Unique ID for each child
          name: resource.name,
          purpose: resource.purpose,
          location: resource.location,
        })),
      };
    });
  
    // Update the calendar configuration
    setConfig((prevConfig) => ({
      ...prevConfig,
      columnWidthSpec: "Fixed",
      columnWidth: 80,
      columns,         // Update columns with the computed date range
      startDate: startDate.toISOString(), // Set the calendar start date
      days: daysDifference, // Update number of days
      headerLevels: 2, // Use two header levels for better visualization
    }));
  };
  


  
 const daysResourcess = () => {

    
    const columns = Array.from({ length: 3 }, (_, i) => {
      const start = DayPilot.Date.today().addDays(i);
      return {
        id: i,
        start,
        name: `${start.toString("MMMM d, yyyy")}`,
        children: config.columns // use the columns set by applyResourceFilter
      };
    });
  
    setConfig(prevConfig => ({
      ...prevConfig,
      columnWidthSpec: "100",
      columns,
      headerLevels: 2
    }));
  };
  
  



  



  const handleDateChange = (args) => {
    if (!startRange || !endRange) {
      console.log("Please select both start and end dates.");
      return;
    }    
  
    const startDate = new Date(startRange);
    const endDate = new Date(endRange)

    const daysDifference = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

    // Update the calendar's date range using the DayPilot API
    const calendar = calendarRef.current.control;
    calendar.update({
      startDate: startRange,
      days: daysDifference, // Number of days to display
     
      

    });
    daysResources()
   
  };







  return (
    <div>
    <div className={"wrap"}>








  
<div className={"left"}>
  <DayPilotNavigator
    selectMode={"Day"}
    showMonths={3}
    skipMonths={3}
    selectionDay={startRange}
    startDate={startRange}
    onTimeRangeSelected={ args => setStartRange(args.day) }
  />
</div>
<div className={"calendar"}>

  <div className={"toolbar"}>
  
    <span>Day:</span>
    <button onClick={ev => previous()}>Previous</button>
    <button onClick={ev => next()}>Next</button>


    Resources view:
      
        <label><input name="view" type="radio" onClick={daysResources} /> Days/resources</label>
       
        
     

    

     
       
  </div>
  <div className="date-picker-container">
        <label>
          Start Date:
          <input
            type="date " ref={startDateRef}
            value={startRange.toString("yyyy-MM-dd")}
            onChange={(e) => setStartRange(new DayPilot.Date(e.target.value))} // Update start date state
          />
        </label>
        <label>
          End Date:
          <input
            type="date" ref={endDateRef}
            value={endRange.toString("yyyy-MM-dd")}
            onChange={(e) => setEndRange(new DayPilot.Date(e.target.value))} // Update end date state
          />
        </label>
        <button onClick={handleDateChange}>Apply Date Range</button>
      </div>




  






  
  <DayPilotCalendar 
     
      {...config}
      ref={calendarRef}
      onTimeRangeSelected={onTimeRangeSelected}
      startDate={startRange}

      viewType="Resources" // Ensures support for daysResources
      showTime={true}
      durationBarVisible={true}
    
   
      />

</div>
</div>
    </div>
  );
};

export default Calendar;
