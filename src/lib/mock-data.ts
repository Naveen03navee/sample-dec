export const ridesByDay = [
  { day: "Mon", rides: 1240, revenue: 86400 },
  { day: "Tue", rides: 1380, revenue: 94200 },
  { day: "Wed", rides: 1520, revenue: 102800 },
  { day: "Thu", rides: 1410, revenue: 96100 },
  { day: "Fri", rides: 1820, revenue: 124600 },
  { day: "Sat", rides: 2140, revenue: 148200 },
  { day: "Sun", rides: 1980, revenue: 137400 },
];

export const vehicleMix = [
  { name: "E-Auto", value: 248, color: "var(--chart-1)" },
  { name: "E-Bike", value: 162, color: "var(--chart-2)" },
  { name: "E-Car", value: 94, color: "var(--chart-3)" },
];

export const co2Trend = [
  { m: "Jan", saved: 12 },
  { m: "Feb", saved: 18 },
  { m: "Mar", saved: 24 },
  { m: "Apr", saved: 28 },
  { m: "May", saved: 35 },
  { m: "Jun", saved: 42.8 },
];

export const drivers = [
  { id: "DRV-1042", name: "Ravi Kumar", vehicle: "E-Auto · KA01AB1234", rating: 4.9, rides: 1284, earnings: 86400, status: "active", kyc: "verified" },
  { id: "DRV-1043", name: "Anita Sharma", vehicle: "E-Bike · KA05CD9821", rating: 4.8, rides: 942, earnings: 54300, status: "active", kyc: "verified" },
  { id: "DRV-1044", name: "Mohammed Iqbal", vehicle: "E-Car · KA03EF4410", rating: 4.7, rides: 612, earnings: 124800, status: "active", kyc: "verified" },
  { id: "DRV-1045", name: "Suresh Gowda", vehicle: "E-Auto · KA02GH7712", rating: 4.6, rides: 488, earnings: 38200, status: "pending", kyc: "pending" },
  { id: "DRV-1046", name: "Priya Nair", vehicle: "E-Bike · KA09JK3344", rating: 4.9, rides: 1108, earnings: 61900, status: "active", kyc: "verified" },
  { id: "DRV-1047", name: "Arjun Patel", vehicle: "E-Car · KA01LM2266", rating: 4.4, rides: 304, earnings: 52100, status: "suspended", kyc: "verified" },
  { id: "DRV-1048", name: "Lakshmi Devi", vehicle: "E-Auto · KA04NO5588", rating: 4.8, rides: 821, earnings: 49600, status: "active", kyc: "verified" },
];

export const rides = [
  { id: "RD-89241", customer: "Aarav S.", driver: "Ravi Kumar", from: "Indiranagar", to: "MG Road", fare: 142, distance: 6.2, status: "completed", time: "2 min ago" },
  { id: "RD-89240", customer: "Diya M.", driver: "Anita Sharma", from: "Koramangala", to: "Whitefield", fare: 318, distance: 18.4, status: "in_progress", time: "8 min ago" },
  { id: "RD-89239", customer: "Vivaan R.", driver: "Mohammed Iqbal", from: "Airport", to: "HSR Layout", fare: 684, distance: 34.1, status: "completed", time: "14 min ago" },
  { id: "RD-89238", customer: "Saanvi K.", driver: "Priya Nair", from: "Jayanagar", to: "BTM", fare: 96, distance: 3.8, status: "completed", time: "21 min ago" },
  { id: "RD-89237", customer: "Reyansh G.", driver: "Suresh Gowda", from: "Hebbal", to: "Yelahanka", fare: 124, distance: 5.4, status: "cancelled", time: "26 min ago" },
  { id: "RD-89236", customer: "Aadhya P.", driver: "Lakshmi Devi", from: "JP Nagar", to: "Electronic City", fare: 246, distance: 12.6, status: "completed", time: "34 min ago" },
];

export const chargers = [
  { id: "CHG-204", name: "Indiranagar Hub", type: "DC Fast", ports: 6, available: 3, status: "online" },
  { id: "CHG-205", name: "Koramangala Plaza", type: "AC", ports: 8, available: 5, status: "online" },
  { id: "CHG-206", name: "MG Road Station", type: "DC Fast", ports: 4, available: 0, status: "busy" },
  { id: "CHG-207", name: "Whitefield Park", type: "DC Fast", ports: 10, available: 7, status: "online" },
  { id: "CHG-208", name: "Hebbal Depot", type: "AC", ports: 12, available: 2, status: "online" },
  { id: "CHG-209", name: "Airport T2", type: "DC Fast", ports: 8, available: 0, status: "offline" },
];

export const customers = [
  { id: "CUS-7711", name: "Aarav Sharma", rides: 124, spent: 18420, joined: "Mar 2026", tier: "Gold" },
  { id: "CUS-7712", name: "Diya Mehta", rides: 86, spent: 12940, joined: "Apr 2026", tier: "Silver" },
  { id: "CUS-7713", name: "Vivaan Reddy", rides: 212, spent: 38200, joined: "Jan 2026", tier: "Platinum" },
  { id: "CUS-7714", name: "Saanvi Kapoor", rides: 42, spent: 4820, joined: "May 2026", tier: "Silver" },
  { id: "CUS-7715", name: "Reyansh Gupta", rides: 18, spent: 1640, joined: "Jun 2026", tier: "Bronze" },
];
