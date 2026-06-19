window.App = window.App || {};

// Default charter/tasks/events/budget/punch-list/contacts shown the first
// time the app loads in a browser with no saved data yet (e.g. a fresh
// clone, or a visitor on GitHub Pages). Regenerate this file from your
// current local data with the "Export for GitHub" button, then commit it.
window.App.SeedCharter = {
  "title": "Riverside Elementary School Yard Recreation Area Refurbishment",
  "sponsor": "Riverside Unified School District – Office of Facilities & Operations",
  "projectManager": "Jordan Reyes, Construction Project Manager",
  "startDate": "June 18, 2026",
  "targetCompletion": "December 18, 2026",
  "purpose": "The existing playground and recreation area at Riverside Elementary School has exceeded its useful life and no longer meets current safety, accessibility, or capacity standards. Several structures have been flagged in recent safety audits, and the site lacks ADA-compliant routes and equipment. This project will fully refurbish the school yard recreation area to provide a safe, modern, and inclusive space for students, families, and the surrounding community.",
  "objectives": "- Replace aging and non-compliant play equipment with modern, age-appropriate structures.\n- Provide ADA-accessible play features and accessible routes throughout the site.\n- Resurface the basketball court and improve sports field markings.\n- Improve site drainage, safety surfacing, and perimeter fencing.\n- Deliver the project within the approved budget of $352,500 and substantially complete by December 18, 2026.",
  "scope": "In Scope: Demolition of existing play structures; site grading and drainage; poured-in-place rubber and engineered wood fiber safety surfacing; new playground equipment (climbing structure, swings, spinners); basketball court resurfacing; soccer field striping; perimeter fencing; shade structure; landscaping and irrigation; site furnishings.\n\nOut of Scope: Classroom building renovations, parking lot resurfacing, and HVAC upgrades.",
  "stakeholders": "Riverside Unified School District (Owner) - Office of Facilities & Operations\nRiverside Elementary School Administration - Principal Smith\nGeneral Contractor and Subcontractors\nPlayground Equipment Supplier\nParent-Teacher Association (PTA)\nCity Building & Safety Department (Permitting and Inspections)",
  "successCriteria": "The project is considered successful if the recreation area passes final city inspection, meets all ADA accessibility requirements, is delivered within 10% of the approved budget, and is ready for student use by the start of the spring semester.",
  "assumptions": "Assumes normal weather conditions with no major weather-related delays. Major demolition and high-noise work will be scheduled during summer break to minimize disruption to the school schedule. Site access is limited to the designated construction entrance on the north side of the property. Permits and inspections are assumed to be approved within standard city timelines."
};
window.App.SeedTasks = [
  {
    "id": "mqk2wtid6fy8rs",
    "title": "Intro Meeting",
    "dueDate": "2026-06-18",
    "priority": "high",
    "notes": "Meet with Principal Smith at Riverside Elementary",
    "done": false,
    "milestone": true
  },
  {
    "id": "mqk3ccqnn88ufs",
    "title": "Engineer Conference Call",
    "dueDate": "2026-06-22",
    "priority": "medium",
    "notes": "zoom 123 456 789",
    "done": false
  },
  {
    "id": "task-site-visit-01",
    "title": "Site Visit: Pre-Construction Walkthrough",
    "startDate": "2026-06-25",
    "dueDate": "2026-06-25",
    "priority": "medium",
    "notes": "Walk site with GC and architect before mobilization",
    "done": false
  },
  {
    "id": "task-stakeholder-01",
    "title": "Stakeholder Meeting: School Board Budget Approval",
    "startDate": "2026-06-29",
    "dueDate": "2026-06-29",
    "priority": "high",
    "notes": "Present final scope and budget to school board for sign-off",
    "done": false,
    "milestone": true
  },
  {
    "id": "task-permits-01",
    "title": "Permits & Inspections Filing",
    "startDate": "2026-06-30",
    "dueDate": "2026-07-10",
    "priority": "high",
    "notes": "Submit building permit applications to city",
    "done": false
  },
  {
    "id": "task-call-01",
    "title": "Conference Call: Subcontractor Kickoff",
    "startDate": "2026-07-08",
    "dueDate": "2026-07-08",
    "priority": "low",
    "notes": "Review schedule and scope with all subs",
    "done": false
  },
  {
    "id": "task-construction-01",
    "title": "Demolition of Existing Play Structures",
    "startDate": "2026-07-13",
    "dueDate": "2026-07-24",
    "priority": "high",
    "notes": "Remove and haul away old play equipment and asphalt",
    "done": false
  },
  {
    "id": "task-site-visit-02",
    "title": "Site Visit: Demolition Progress Check",
    "startDate": "2026-07-22",
    "dueDate": "2026-07-22",
    "priority": "medium",
    "notes": "Confirm site cleared and graded per plan",
    "done": false
  },
  {
    "id": "task-construction-02",
    "title": "Grading & Drainage Improvements",
    "startDate": "2026-07-27",
    "dueDate": "2026-08-07",
    "priority": "medium",
    "notes": "Regrade for positive drainage away from play areas",
    "done": false
  },
  {
    "id": "task-stakeholder-02",
    "title": "Stakeholder Meeting: Parent/Community Update",
    "startDate": "2026-08-05",
    "dueDate": "2026-08-05",
    "priority": "medium",
    "notes": "PTA meeting to share renderings and timeline",
    "done": false
  },
  {
    "id": "task-construction-03",
    "title": "Perimeter Fencing Installation",
    "startDate": "2026-08-10",
    "dueDate": "2026-08-21",
    "priority": "medium",
    "notes": "Install new fencing along property line",
    "done": false
  },
  {
    "id": "task-site-visit-03",
    "title": "Site Visit: Mid-Project Progress Check",
    "startDate": "2026-08-19",
    "dueDate": "2026-08-19",
    "priority": "medium",
    "notes": "Owner walkthrough of site prep and fencing",
    "done": false
  },
  {
    "id": "task-construction-04",
    "title": "Poured-in-Place Rubber Safety Surfacing Installation",
    "startDate": "2026-08-24",
    "dueDate": "2026-09-18",
    "priority": "high",
    "notes": "Largest line item - install base and rubber surfacing in phases",
    "done": false
  },
  {
    "id": "task-call-02",
    "title": "Conference Call: Playground Equipment Delivery Schedule",
    "startDate": "2026-09-15",
    "dueDate": "2026-09-15",
    "priority": "low",
    "notes": "Confirm delivery dates with equipment manufacturer",
    "done": false
  },
  {
    "id": "task-construction-05",
    "title": "Engineered Wood Fiber Fall Zone Installation",
    "startDate": "2026-09-21",
    "dueDate": "2026-09-30",
    "priority": "medium",
    "notes": "Install fall zone material around secondary play areas",
    "done": false
  },
  {
    "id": "task-installation-01",
    "title": "Modular Climbing Structure & Slide Installation",
    "startDate": "2026-10-01",
    "dueDate": "2026-10-16",
    "priority": "high",
    "notes": "Crane delivery and assembly of main play structure",
    "done": false
  },
  {
    "id": "task-site-visit-04",
    "title": "Site Visit: Equipment Installation Progress Check",
    "startDate": "2026-10-12",
    "dueDate": "2026-10-12",
    "priority": "medium",
    "notes": "Check structural anchoring before final inspection",
    "done": false
  },
  {
    "id": "task-installation-02",
    "title": "Swing Set Installation (ADA-Accessible Bay)",
    "startDate": "2026-10-19",
    "dueDate": "2026-10-27",
    "priority": "medium",
    "notes": "Includes accessible swing seat and transfer platform",
    "done": false
  },
  {
    "id": "task-installation-03",
    "title": "Spring Riders & Spinners Installation",
    "startDate": "2026-10-28",
    "dueDate": "2026-11-03",
    "priority": "low",
    "notes": "",
    "done": false
  },
  {
    "id": "task-construction-06",
    "title": "Basketball Court Resurfacing & Striping",
    "startDate": "2026-11-02",
    "dueDate": "2026-11-13",
    "priority": "medium",
    "notes": "Resurface existing court and repaint lines",
    "done": false
  },
  {
    "id": "task-installation-04",
    "title": "Shade Structure Installation",
    "startDate": "2026-11-09",
    "dueDate": "2026-11-24",
    "priority": "medium",
    "notes": "Fabric shade sail over main play structure",
    "done": false
  },
  {
    "id": "task-stakeholder-03",
    "title": "Stakeholder Meeting: Pre-Opening Readiness Review",
    "startDate": "2026-11-17",
    "dueDate": "2026-11-17",
    "priority": "high",
    "notes": "Review punch list and opening readiness with district",
    "done": false,
    "milestone": true
  },
  {
    "id": "task-construction-07",
    "title": "Landscaping & Irrigation Installation",
    "startDate": "2026-11-16",
    "dueDate": "2026-12-02",
    "priority": "low",
    "notes": "Tree planting, mulch beds, and irrigation tie-in",
    "done": false
  },
  {
    "id": "task-call-03",
    "title": "Conference Call: Final Inspection Scheduling",
    "startDate": "2026-11-30",
    "dueDate": "2026-11-30",
    "priority": "medium",
    "notes": "Coordinate with city inspector",
    "done": false
  },
  {
    "id": "task-installation-05",
    "title": "Furnishings Installation",
    "startDate": "2026-12-01",
    "dueDate": "2026-12-08",
    "priority": "low",
    "notes": "Benches, picnic tables, and trash receptacles",
    "done": false
  },
  {
    "id": "task-site-visit-05",
    "title": "Site Visit: Final Walkthrough & Punch List",
    "startDate": "2026-12-10",
    "dueDate": "2026-12-10",
    "priority": "high",
    "notes": "Owner and GC final walkthrough",
    "done": false
  },
  {
    "id": "task-punch-list",
    "title": "Punch List",
    "startDate": "2026-12-10",
    "dueDate": "2026-12-12",
    "priority": "high",
    "notes": "Resolve all deficiencies identified during final walkthrough before inspection",
    "done": false
  },
  {
    "id": "task-stakeholder-04",
    "title": "Final Inspection & Certificate of Occupancy",
    "startDate": "2026-12-12",
    "dueDate": "2026-12-12",
    "priority": "high",
    "notes": "City inspector sign-off",
    "done": false,
    "milestone": true
  },
  {
    "id": "task-stakeholder-05",
    "title": "Stakeholder Meeting: Ribbon Cutting Planning",
    "startDate": "2026-12-15",
    "dueDate": "2026-12-15",
    "priority": "medium",
    "notes": "Plan opening ceremony with school and district staff",
    "done": false
  },
  {
    "id": "mqk4gggl704o0o",
    "title": "Target Complete",
    "dueDate": "2026-12-18",
    "priority": "high",
    "notes": "",
    "done": false,
    "milestone": true
  }
];
window.App.SeedEvents = [];
window.App.SeedBudgetItems = [
  {
    "id": "seed-budget-1",
    "category": "Site Preparation",
    "item": "Demolition of existing play structures",
    "budgeted": 18000,
    "actual": 18500,
    "notes": ""
  },
  {
    "id": "seed-budget-2",
    "category": "Site Preparation",
    "item": "Grading & drainage improvements",
    "budgeted": 22000,
    "actual": 21000,
    "notes": ""
  },
  {
    "id": "seed-budget-3",
    "category": "Safety Surfacing",
    "item": "Poured-in-place rubber safety surfacing",
    "budgeted": 65000,
    "actual": 31000,
    "notes": "In progress"
  },
  {
    "id": "seed-budget-4",
    "category": "Safety Surfacing",
    "item": "Engineered wood fiber fall zones",
    "budgeted": 14000,
    "actual": 0,
    "notes": "Not started"
  },
  {
    "id": "seed-budget-5",
    "category": "Playground Equipment",
    "item": "Modular climbing structure & slides",
    "budgeted": 58000,
    "actual": 56200,
    "notes": ""
  },
  {
    "id": "seed-budget-6",
    "category": "Playground Equipment",
    "item": "Swing set (ADA-accessible bay included)",
    "budgeted": 21000,
    "actual": 19800,
    "notes": ""
  },
  {
    "id": "seed-budget-7",
    "category": "Playground Equipment",
    "item": "Spring riders & spinners",
    "budgeted": 9500,
    "actual": 0,
    "notes": "Not started"
  },
  {
    "id": "seed-budget-8",
    "category": "Sports Courts",
    "item": "Basketball court resurfacing & striping",
    "budgeted": 26000,
    "actual": 24750,
    "notes": ""
  },
  {
    "id": "seed-budget-9",
    "category": "Sports Courts",
    "item": "New soccer goals & field striping",
    "budgeted": 8200,
    "actual": 7900,
    "notes": ""
  },
  {
    "id": "seed-budget-10",
    "category": "Fencing & Safety",
    "item": "Perimeter fencing replacement",
    "budgeted": 19500,
    "actual": 19500,
    "notes": "Complete"
  },
  {
    "id": "seed-budget-11",
    "category": "Fencing & Safety",
    "item": "Shade structure over play area",
    "budgeted": 32000,
    "actual": 0,
    "notes": "Not started"
  },
  {
    "id": "seed-budget-12",
    "category": "Landscaping",
    "item": "Tree planting & mulch beds",
    "budgeted": 9000,
    "actual": 4200,
    "notes": ""
  },
  {
    "id": "seed-budget-13",
    "category": "Landscaping",
    "item": "Irrigation system updates",
    "budgeted": 7500,
    "actual": 0,
    "notes": "Not started"
  },
  {
    "id": "seed-budget-14",
    "category": "Furnishings & Amenities",
    "item": "Benches, picnic tables & trash receptacles",
    "budgeted": 11000,
    "actual": 10400,
    "notes": ""
  },
  {
    "id": "seed-budget-15",
    "category": "Permits & Fees",
    "item": "Building permits & inspections",
    "budgeted": 4800,
    "actual": 4800,
    "notes": "Complete"
  },
  {
    "id": "seed-budget-16",
    "category": "Contingency",
    "item": "Contingency reserve (~8% of budget)",
    "budgeted": 27000,
    "actual": 0,
    "notes": ""
  }
];
window.App.SeedPunchListItems = [
  {
    "id": "seed-punch-1",
    "location": "Main Play Structure",
    "description": "Touch up scratched paint on slide handrail",
    "assignedTo": "Playground Install Crew",
    "status": "fixed",
    "notes": ""
  },
  {
    "id": "seed-punch-2",
    "location": "Main Play Structure",
    "description": "Tighten loose bolt on north climbing wall",
    "assignedTo": "Playground Install Crew",
    "status": "open",
    "notes": ""
  },
  {
    "id": "seed-punch-3",
    "location": "Basketball Court",
    "description": "Re-stripe free-throw line, paint faded in one spot",
    "assignedTo": "Court Resurfacing Sub",
    "status": "verified",
    "notes": ""
  },
  {
    "id": "seed-punch-4",
    "location": "Soccer Field",
    "description": "Adjust soccer goal net tension on east goal",
    "assignedTo": "Sports Equipment Sub",
    "status": "open",
    "notes": ""
  },
  {
    "id": "seed-punch-5",
    "location": "Perimeter Fencing",
    "description": "Replace bent fence post near west gate",
    "assignedTo": "Fencing Sub",
    "status": "fixed",
    "notes": ""
  },
  {
    "id": "seed-punch-6",
    "location": "Safety Surfacing",
    "description": "Patch small gap in rubber surfacing seam near swings",
    "assignedTo": "Surfacing Sub",
    "status": "open",
    "notes": ""
  },
  {
    "id": "seed-punch-7",
    "location": "Shade Structure",
    "description": "Re-tension shade sail, sagging on south corner",
    "assignedTo": "Shade Structure Installer",
    "status": "open",
    "notes": ""
  },
  {
    "id": "seed-punch-8",
    "location": "Landscaping",
    "description": "Replace two dead shrubs near entrance",
    "assignedTo": "Landscaping Sub",
    "status": "open",
    "notes": ""
  },
  {
    "id": "seed-punch-9",
    "location": "Irrigation",
    "description": "Fix sprinkler head spraying onto sidewalk",
    "assignedTo": "Irrigation Sub",
    "status": "fixed",
    "notes": ""
  },
  {
    "id": "seed-punch-10",
    "location": "Furnishings",
    "description": "Tighten wobbly leg on picnic table #3",
    "assignedTo": "GC Punch Crew",
    "status": "verified",
    "notes": ""
  },
  {
    "id": "seed-punch-11",
    "location": "Entrance Signage",
    "description": "Install missing \"No Skateboarding\" sign",
    "assignedTo": "GC Punch Crew",
    "status": "open",
    "notes": ""
  },
  {
    "id": "seed-punch-12",
    "location": "Drainage",
    "description": "Clear debris from catch basin near basketball court",
    "assignedTo": "Site Sub",
    "status": "fixed",
    "notes": ""
  },
  {
    "id": "seed-punch-13",
    "location": "Swing Set",
    "description": "Lubricate squeaky swing chain, bay 2",
    "assignedTo": "Playground Install Crew",
    "status": "verified",
    "notes": ""
  },
  {
    "id": "seed-punch-14",
    "location": "ADA Accessibility",
    "description": "Confirm accessible route slope meets ADA spec at ramp",
    "assignedTo": "GC / Inspector",
    "status": "open",
    "notes": ""
  }
];
window.App.SeedContacts = [
  {
    "id": "seed-contact-1",
    "name": "Jordan Reyes",
    "role": "Construction Project Manager",
    "company": "Riverside Unified School District",
    "category": "Owner/District",
    "phone": "(555) 201-4488",
    "email": "jreyes@riversideusd.gov",
    "notes": ""
  },
  {
    "id": "seed-contact-2",
    "name": "Angela Smith",
    "role": "Principal",
    "company": "Riverside Elementary School",
    "category": "Owner/District",
    "phone": "(555) 201-7732",
    "email": "asmith@riversideusd.gov",
    "notes": ""
  },
  {
    "id": "seed-contact-3",
    "name": "Michael Chen",
    "role": "Director of Facilities & Operations",
    "company": "Riverside Unified School District",
    "category": "Owner/District",
    "phone": "(555) 201-9015",
    "email": "mchen@riversideusd.gov",
    "notes": "Project sponsor"
  },
  {
    "id": "seed-contact-4",
    "name": "Sarah Patel",
    "role": "Principal / General Contractor",
    "company": "Patel Construction Group",
    "category": "General Contractor",
    "phone": "(555) 488-3310",
    "email": "spatel@patelconstructiongroup.com",
    "notes": ""
  },
  {
    "id": "seed-contact-5",
    "name": "Tom Whitfield",
    "role": "Site Superintendent",
    "company": "Patel Construction Group",
    "category": "General Contractor",
    "phone": "(555) 488-3322",
    "email": "twhitfield@patelconstructiongroup.com",
    "notes": "Primary on-site contact"
  },
  {
    "id": "seed-contact-6",
    "name": "Raj Kumar, PE",
    "role": "Civil Engineer",
    "company": "Kumar Engineering Associates",
    "category": "Design/Engineering",
    "phone": "(555) 309-1147",
    "email": "rkumar@kumarengineering.com",
    "notes": "zoom 123 456 789"
  },
  {
    "id": "seed-contact-7",
    "name": "Lisa Nakamura, RA",
    "role": "Project Architect",
    "company": "Nakamura Design Studio",
    "category": "Design/Engineering",
    "phone": "(555) 309-5560",
    "email": "lnakamura@nakamuradesign.com",
    "notes": ""
  },
  {
    "id": "seed-contact-8",
    "name": "Carlos Mendez",
    "role": "Owner",
    "company": "Mendez Fencing Co.",
    "category": "Subcontractor",
    "phone": "(555) 622-0193",
    "email": "carlos@mendezfencing.com",
    "notes": ""
  },
  {
    "id": "seed-contact-9",
    "name": "Denise Okafor",
    "role": "Project Manager",
    "company": "SafeSurface Solutions",
    "category": "Subcontractor",
    "phone": "(555) 622-7741",
    "email": "denise@safesurfacesolutions.com",
    "notes": "Safety surfacing installer"
  },
  {
    "id": "seed-contact-10",
    "name": "Mike Tran",
    "role": "Owner",
    "company": "ProCourt Resurfacing",
    "category": "Subcontractor",
    "phone": "(555) 622-8854",
    "email": "mtran@procourtresurfacing.com",
    "notes": ""
  },
  {
    "id": "seed-contact-11",
    "name": "Maria Gonzalez",
    "role": "Owner",
    "company": "Greenscape Irrigation & Landscaping",
    "category": "Subcontractor",
    "phone": "(555) 622-4420",
    "email": "maria@greenscapeil.com",
    "notes": ""
  },
  {
    "id": "seed-contact-12",
    "name": "Brian O'Connell",
    "role": "Account Manager",
    "company": "PlayCore Equipment",
    "category": "Supplier",
    "phone": "(555) 740-2256",
    "email": "boconnell@playcoreequip.com",
    "notes": "Playground equipment supplier"
  },
  {
    "id": "seed-contact-13",
    "name": "James Park",
    "role": "Senior Inspector",
    "company": "City of Riverside Building & Safety Dept.",
    "category": "Inspector/Permitting",
    "phone": "(555) 815-3300",
    "email": "jpark@cityofriverside.gov",
    "notes": ""
  },
  {
    "id": "seed-contact-14",
    "name": "Karen Liu",
    "role": "PTA President",
    "company": "Riverside Elementary PTA",
    "category": "Community",
    "phone": "(555) 902-6671",
    "email": "karen.liu@riversidepta.org",
    "notes": ""
  }
];
