

// List of adjectives to use in the codenames
// These adjectives are chosen to evoke a sense of mystery, danger, or intrigue, suitable for a gadget name.
const adjectives = [
  "Silent", "Dark", "Crimson", "Iron", "Shadow", "Swift", "Ghost", "Atomic", "Vengeful", "Invisible",
  "Phantom", "Savage", "Blazing", "Icy", "Radiant", "Thunderous", "Stealthy", "Fierce", "Cunning", "Rapid",
  "Obsidian", "Lone", "Burning", "Frozen", "Electric", "Tactical", "Mystic", "Stormy", "Raging", "Shining",
  "Piercing", "Wicked", "Vigilant", "Fearless", "Daring", "Enraged", "Shadowy", "Brutal", "Covert", "Nimble",
  "Bold", "Ebon", "Steel", "Venomous", "Silver", "Scarlet", "Gilded", "Arctic", "Golden", "Radiated",
  "Hollow", "Dire", "Stellar", "Grim", "Vivid", "Ancient", "Night", "Dusty", "Stormborn", "Ashen",
  "Frosty", "Runic", "Glacial", "Charred", "Molten", "Crazed", "Mad", "Chaotic", "Eternal", "Bleeding",
  "Jagged", "Echoing", "Gale", "Whispering", "Lurking", "Whirling", "Soaring", "Doomed", "Howling", "Crimson",
  "Brooding", "Lurking", "Blinding", "Burnished", "Arcane", "Snapping", "Fractured", "Pale", "Bitter", "Venom",
  "Mirrored", "Blitz", "Bouncing", "Grizzly", "Torn", "Slashing", "Slumbering", "Marked", "Savage", "Deadly"
];

// List of nouns to use in the codenames
const nouns = [
  "Vortex", "Kraken", "Falcon", "Nightingale", "Viper", "Dagger", "Hydra", "Saber", "Cobra", "Mirage",
  "Eagle", "Specter", "Raven", "Tiger", "Panther", "Wolf", "Owl", "Hawk", "Leopard", "Wasp",
  "Fox", "Hornet", "Jaguar", "Basilisk", "Phantom", "Scorpion", "Blade", "Cyclone", "Comet", "Nova",
  "Meteor", "Wraith", "Reaper", "Storm", "Blast", "Sting", "Venom", "Stalker", "Hunter", "Sniper",
  "Fang", "Drake", "Fury", "Talon", "Claw", "Howler", "Shuriken", "Serpent", "Raptor", "Spike",
  "Inferno", "Bolt", "Gale", "Wind", "Frost", "Flame", "Pulse", "Strike", "Ghost", "Sling",
  "Bullet", "Tank", "Archer", "Laser", "Nuke", "Flare", "Axe", "Lancer", "Scepter", "Rogue",
  "Knight", "Sentinel", "Saber", "Vigil", "Scout", "Shadow", "Phoenix", "Titan", "Cannon", "Raider",
  "Nomad", "Havoc", "Crusader", "Hammer", "Dragon", "Cloak", "Shield", "Switchblade", "Stealth", "Tracer",
  "Beacon", "Core", "Glider", "Blazer", "Revolt", "Spark", "Charger", "Shell", "Boomer", "Spire"
];

// // Function to generate a random codename using the adjectives and nouns arrays
// // The function randomly selects one adjective and one noun to create a unique codename.
function generateCodename() {
  // Select a random adjective
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

  // Select a random noun
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  // Return the generated codename in the format "The [adjective] [noun]"
  return `The ${adjective} ${noun}`;
}

// // Function to generate a unique codename for a gadget
export async function generateUniqueCodename(prismaInstance, maxAttempts = 50) {

  // Number of attempts to generate a unique codename
  let attempts = 0;

  // Loop until a unique codename is found or the maximum number of attempts is reached
  while (attempts < maxAttempts) {

    // Generate a codename using the generateCodename function
    const codename = generateCodename();

    // Check if the generated codename already exists in the database
    const exists = await prismaInstance.gadget.findFirst({
      where: { name: codename }
    });

    // If it doesn't exist, return the codename
    if (!exists) return codename;

    // If it exists, increment the attempts counter and try again
    attempts++;
  }
  throw new Error("Failed to generate a unique codename after max attempts");
}