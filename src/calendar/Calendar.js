import React, { useState, useEffect, useRef } from 'react';
import { DayPilot, DayPilotCalendar } from "daypilot-pro-react";

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
    onTimeRangeSelected: async (args) => {
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      const dp = args.control;
      dp.clearSelection();
      if (modal.canceled) { return; }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result,
        resource: args.resource
      });
    },
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
        end: DayPilot.Date.today().addHours(12),
        resource: "R1"
      },
      {
        id: 2,
        text: "Event 2",
        start: "2018-06-02T10:00:00",
        end: "2018-06-02T11:00:00",
        resource: "R2",
        barColor: "#38761d",
        barBackColor: "#93c47d"
      }
    ]
  });

  const calendarRef = useRef();

  const [selectedPurpose, setSelectedPurpose] = useState("All");

  // Define allResources state and applyResourceFilter function
  const [allResources, setAllResources] = useState([
    { name: "RP 1", id: "R1", purpose: "Play" },
    { name: "RP 2", id: "R2", purpose: "Play" },
    { name: "RP 3", id: "R3", purpose: "Couple" },
    { name: "RP 4", id: "R4", purpose: "Couple" },
    { name: "RP 5", id: "R5", purpose: "Couple" },
    { name: "RP 6", id: "R6", purpose: "Individual" },
    { name: "RP 7", id: "R7", purpose: "Individual" },


  ]);

  useEffect(() => {
    applyResourceFilter();
  }, [selectedPurpose]);

  const applyResourceFilter = () => {
    const filteredResources = selectedPurpose === "All"
      ? allResources
      : allResources.filter(resource => resource.purpose === selectedPurpose);

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

  const resources5 = () => {
    setConfig((prevConfig) => ({
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

  const resources50 = () => {
    const columns = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Resource ${i + 1}`
    }));

    setConfig((prevConfig) => ({
      ...prevConfig,
      columnWidthSpec: "Fixed",
      columnWidth: 100,
      columns,
      headerLevels: 1
    }));
  };

  const daysResources = () => {
    const columns = Array.from({ length: 7 }, (_, i) => {
      const start = DayPilot.Date.today().addDays(i);
      return {
        id: i,
        start,
        name: `${start.toString("MMMM d, yyyy")}`,
        children: allResources
          .filter((resource) => selectedPurpose === "All" || resource.purpose === selectedPurpose)
          .map((resource) => ({
            name: resource.name,
            id: resource.id,
            purpose: resource.purpose
          }))
      };
    });

    setConfig((prevConfig) => ({
      ...prevConfig,
      columnWidthSpec: "100",
      columns,
      headerLevels: 2
    }));
  };

  const resourcesDays = () => {
    const columns = [
      { name: "CC", id: "R1" },
      { name: "RP", id: "R2" },
      { name: "AM", id: "R3" },
      { name: "WC", id: "R4" }
    ];

    columns.forEach((col) => {
      col.children = Array.from({ length: 7 }, (_, i) => {
        const start = DayPilot.Date.today().addDays(i);
        return {
          id: col.id,
          start,
          name: `${start.toString("ddd")}`
        };
      });
    });

    setConfig((prevConfig) => ({
      ...prevConfig,
      columnWidthSpec: "Auto",
      columns,
      headerLevels: 2
    }));
  };

  return (
    <div>
      <div className={"space"}>
        Resources view:
        <label><input name="view" type={"radio"} onClick={resources5} defaultChecked={true} /> 5 columns</label>
        <label><input name="view" type={"radio"} onClick={resources50} /> 50 columns</label>
        <label><input name="view" type={"radio"} onClick={daysResources} /> Days/resources</label>
        <label><input name="view" type={"radio"} onClick={resourcesDays} /> Resources/days</label>
        <label><input name="view" type={"radio"} onClick={applyResourceFilter} /> Groups</label>
        <label><input name="view" type={"radio"} onClick={applyResourceFilter} /> All</label>

        <select onChange={handlePurposeChange} value={selectedPurpose}>
          <option value="All">All</option>
          <option value="Play">Play</option>
          <option value="Couple">Couple</option>
          <option value="Individual">Individual</option>
        </select>
      </div>

      <div className="calendar-container">
        <DayPilotCalendar {...config} ref={calendarRef} />
      </div>
    </div>
  );
};

export default Calendar;
