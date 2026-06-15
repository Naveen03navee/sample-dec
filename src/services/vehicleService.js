const defaultVehicles = [
  { id: "V-100", name: "Tesla Model Y", status: "Active", kms: "32,100", battery: "89%", lastService: "2026-05-20" },
  { id: "V-214", name: "Kia Niro EV", status: "Active", kms: "28,500", battery: "72%", lastService: "2026-05-11" },
  { id: "V-317", name: "Jaguar I-PACE", status: "Pending", kms: "22,400", battery: "66%", lastService: "2026-04-29" },
  { id: "V-425", name: "BMW iX3", status: "Charging", kms: "7,900", battery: "54%", lastService: "2026-06-01" },
  { id: "V-503", name: "Audi Q4 e-tron", status: "Inspection", kms: "14,800", battery: "98%", lastService: "2026-05-30" },
];

export const vehicleService = {
  STORAGE_KEY: "vehicles",

  getVehicles() {
    if (typeof window === "undefined") {
      return defaultVehicles;
    }

    const stored = window.localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultVehicles;
  },

  saveVehicles(vehicles) {
    window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(vehicles));
  },

  addVehicle(vehicle) {
    const vehicles = this.getVehicles();
    vehicles.unshift(vehicle);
    this.saveVehicles(vehicles);
    return vehicles;
  },
};