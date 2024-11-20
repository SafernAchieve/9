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
        text: "Event 1",
        start: DayPilot.Date.today().addHours(10),
        end: DayPilot.Date.today().addHours(11),
        resource: "R1"
      },
      {
        id: 2,
        text: "Event 2",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(10),
        resource: "R2"
      },
      {
        id: 1,
        text: "Event 3",
        start: DayPilot.Date.today().addHours(10),
        end: DayPilot.Date.today().addHours(11),
        resource: "R3"
      },
      {
        id: 1,
        text: "Event 4",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(10),
        resource: "R4"
      },
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
        text: "Event 3",
        start: DayPilot.Date.today().addHours(10),
        end: DayPilot.Date.today().addHours(11),
        resource: "P3"
      },
      {
        id: 1,
        text: "Event 4",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(10),
        resource: "P4"
      },
      {
        id: 1,
        text: "Event 5",
        start: DayPilot.Date.today().addHours(10),
        end: DayPilot.Date.today().addHours(11),
        resource: "P5"
      },
      {
        id: 1,
        text: "Event 6",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(10),
        resource: "P6"
      },
      {
        id: 1,
        text: "Event 7",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(10),
        resource: "P7"
      },


      {
        id: 1,
        text: "Event 1",
        start: DayPilot.Date.today().addHours(10),
        end: DayPilot.Date.today().addHours(11),
        resource: "T1"
      },
      {
        id: 2,
        text: "Event 2",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(10),
        resource: "T2"
      },
      {
        id: 1,
        text: "Event 3",
        start: DayPilot.Date.today().addHours(10),
        end: DayPilot.Date.today().addHours(11),
        resource: "T3"
      },
      {
        id: 1,
        text: "Event 4",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(10),
        resource: "T4"
      },
      {
        id: 1,
        text: "Event 5",
        start: DayPilot.Date.today().addHours(10),
        end: DayPilot.Date.today().addHours(11),
        resource: "T5"
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
  



  const filterDaysWithEvents = () => {
    const daysWithEvents = Array.from(
      new Set(config.events.map((e) => e.start.toDateLocal().toISOString().split("T")[0]))
    );

    if (daysWithEvents.length > 0) {
      setConfig((prevConfig) => ({
        ...prevConfig,
        startDate: daysWithEvents[0],
        days: daysWithEvents.length,
        filteredDates: daysWithEvents,
      }));
    }
  };














  
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






  const calendarRef = useRef();

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

  const checkResourcesWithEvents = () => {
    const resourceIds = allResources.map(resource => resource.id); // Get all resource IDs
    const resourcesWithEvents = new Set();
  
    // Check each event and record resources with events
    config.events.forEach(event => {
      if (resourceIds.includes(event.resource)) {
        resourcesWithEvents.add(event.resource);
      }
    });
  
    // Log the resources with events and their corresponding times
    resourcesWithEvents.forEach(resourceId => {
      const resource = allResources.find(res => res.id === resourceId);
  
      console.log(`Resource with event scheduled: ${resource.name}`);
  
      // Find all events for this resource
      const resourceEvents = config.events.filter(event => event.resource === resourceId);
      resourceEvents.forEach(event => {
        console.log(`  Event: ${event.text}`);
        console.log(`  Start Time: ${event.start.toString()}`);
        console.log(`  End Time: ${event.end.toString()}`);
      });
    });
  };
  
  // Call this function, e.g., when the component loads or when events/resources are updated
  useEffect(() => {
    checkResourcesWithEvents();
  }, [config.events, allResources]);
  






  



  useEffect(() => {
    // Adding the event for RP 1 on November 7, 2024, at 9:00 AM
    setConfig(prevConfig => ({
      ...prevConfig,
      events: [
        ...prevConfig.events,
        
        {
          id: DayPilot.guid(),
          text: "RP1 Event",
          start: new DayPilot.Date("2024-11-07T09:00:00"),
          end: new DayPilot.Date("2024-11-07T10:00:00"), // Adjust the end time as needed
          resource: "R1" // RP 1 corresponds to "R1"
        }
      ]
    }));
  }, []);















  


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





  const handlePurposeChange = (e) => {
    setSelectedPurpose(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    
  };

  const resources5 = () => {
    setConfig(prevConfig => ({
      ...prevConfig,
      columnWidthSpec: "Auto",
      columns: [
        { name: "Resource 1", id: "R1" },
        { name: "Resource 2", id: "R2" },
        { name: "Resource 3", id: "R3" },
        { name: "Resource 4", id: "R4" },
        { name: "Resource 5", id: "R5" }
      ],
      headerLevels: 1
    }));
  };




  




  const daysResources = () => {
    applyResourceFilter(); // This will set the filtered resources in config.columns based on selectedPurpose and selectedLocation
    
    const columns = Array.from({ length: 28 }, (_, i) => {
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
      columnWidthSpec: "Fixed",
      columnWidth: 80,
      columns,
      headerLevels: 2
    }));
  };
  




  const resourcesDays = () => {
    applyResourceFilter();
  
    // Create a parent column for each filtered resource
    const columns = config.columns.map(resource => {
      // Generate 7 days as sub-columns for each resource
      const children = Array.from({ length: 7 }, (_, i) => {
        const date = DayPilot.Date.today().addDays(i);
        return {
          id: `${resource.id}_${i}`, // Unique ID for each sub-column
          start: date,
          name: date.toString("MMMM d, yyyy") // Display the date as a string
        };
      });
  
      return {
        name: resource.name,
        id: resource.id,
        children // Attach the children array as sub-columns
      };
    });
  
    // Update the calendar configuration with new columns
    setConfig(prevConfig => ({
      ...prevConfig,
      columnWidthSpec: "Fixed",
      columnWidth: 100,
      columns,
      headerLevels: 2
    }));
  };
  
  

  useEffect(() => {
    console.log("Component mounted!");
    // Other code...
  }, []);
  

  const [startRange, setStartRange] = useState(DayPilot.Date.today());
  const [endRange, setEndRange] = useState(DayPilot.Date.today().addDays(7));

  
  const handleDateChange = () => {
    if (!startRange || !endRange) {
      console.error("Invalid date range selected");
      return;
    }

    const days = DayPilot.DateUtil.daysDiff(startRange, endRange) + 1;
    if (days <= 0) {
      console.error("End date must be later than start date");
      return;
    }

    // Update the calendar's date range using the DayPilot API
    const calendar = calendarRef.current.control;
    calendar.update({
      startDate: startRange,
      days: days,
    });

    // Use DayPilot.Scheduler.events.forRange() to filter events based on the date range
    const filteredEvents = DayPilot.Scheduler.events.forRange([startRange, endRange]);

    // Update the events in the state based on the filtered range
    setEvents(filteredEvents);
    console.log(`Date range applied: ${startRange} to ${endRange}`);
  };






  return (
    <div>
    <div className={"wrap"}>








  
<div className={"left"}>
  <DayPilotNavigator
    selectMode={"Day"}
    showMonths={3}
    skipMonths={3}
    selectionDay={startDate}
    startDate={startDate}
    onTimeRangeSelected={ args => setStartDate(args.day) }
  />
</div>
<div className={"calendar"}>

  <div className={"toolbar"}>
  
    <span>Day:</span>
    <button onClick={ev => previous()}>Previous</button>
    <button onClick={ev => next()}>Next</button>


    Resources view:
        <label><input name="view" type="radio" onClick={resources5} defaultChecked={true} /> 5 columns</label>
        <label><input name="view" type="radio" onClick={daysResources} /> Days/resources</label>
        <label><input name="view" type="radio" onClick={resourcesDays} /> Resources/days</label>
        
        <label><input name="view" type="radio" onClick={applyResourceFilter} /> All</label>

        <label>
          Purpose:
          <select onChange={handlePurposeChange} value={selectedPurpose}>
            <option value="All">All</option>
            <option value="Play">Play</option>
            <option value="Couple">Couple</option>
            <option value="Individual">Individual</option>
          </select>
        </label>

        <label>
          Location:
          <select onChange={handleLocationChange} value={selectedLocation}>
            <option value="All">All</option>
            <option value="RP">RP</option>
            <option value="CC">CC</option>
            <option value="Airmont">Airmont</option>
          </select>
        </label>

        
       
  </div>
  <div className="date-picker-container">
        <label>
          Start Date:
          <input
            type="date"
            value={startRange.toString("yyyy-MM-dd")}
            onChange={(e) => setStartRange(new DayPilot.Date(e.target.value))}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endRange.toString("yyyy-MM-dd")}
            onChange={(e) => setEndRange(new DayPilot.Date(e.target.value))}
          />
        </label>
        <button onClick={handleDateChange}>Apply Date Range</button>
      </div>




  <button onClick={filterDaysWithEvents}>Filter Days with Events</button>






  
  <DayPilotCalendar 
     
      {...config}
      ref={calendarRef}
      onTimeRangeSelected={onTimeRangeSelected}
      startDate={startDate}
  
      />

</div>
</div>
    </div>
  );
};

export default Calendar;
