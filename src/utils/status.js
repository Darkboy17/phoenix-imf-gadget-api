
// The status of the gadgets is an array of strings
export const gadgetStatuses = ["Available", "Deployed", "Destroyed", "Decommissioned"];

export function getRandomStatus() {

  // Get a random status from the gadgetStatuses array
  const randomIndex = Math.floor(Math.random() * gadgetStatuses.length - 1);

  // Return the random status
  return gadgetStatuses[randomIndex];
}
