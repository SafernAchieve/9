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
    events: [
      {
        id: 1,
        text: "Event 1",
        start: DayPilot.Date.today().addHours(10),
        end: DayPilot.Date.today().addHours(11),
        resource: "R1"
      },
      {
        id: 1,
        text: "Event 2",
        start: DayPilot.Date.today().addHours(9),
        end: DayPilot.Date.today().addHours(10),
        resource: "R1"
      },
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
    
    const columns = Array.from({ length: 7 }, (_, i) => {
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
      columnWidthSpec: "Auto",
      columns,
      headerLevels: 2
    }));
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


  <DayPilotCalendar 
      {...config}
      onTimeRangeSelected={onTimeRangeSelected}
      startDate={startDate}
  
      ref={calendarRef} />

</div>
</div>
    </div>
  );
};

export default Calendar;
